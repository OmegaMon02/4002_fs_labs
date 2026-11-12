import { prisma } from '../db/prisma.js';
import type { OrganizationRecord } from '../types.js';

export type CreateRoleHolderResult =
  | { success: true; data: OrganizationRecord }
  | { success: false; reason: 'departmentNotFound' | 'roleOccupied' | 'employeeAlreadyAssigned' | 'duplicateEmployee' };

export const roleRepository = {
  async getAll(): Promise<OrganizationRecord[]> {
    const roles = await prisma.role.findMany({
      where: { employees: { some: {} } },
      orderBy: { title: 'asc' },
      include: {
        employees: {
          orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
          select: { id: true, firstName: true, lastName: true },
        },
      },
    });

    return roles.flatMap((role) => role.employees.map((employee) => ({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      role: role.title,
    })));
  },

  async create(
    record: Omit<OrganizationRecord, 'id'>,
    departmentName: string,
  ): Promise<CreateRoleHolderResult> {
    return prisma.$transaction(async (transaction) => {
      const department = await transaction.department.findUnique({
        where: { name: departmentName },
        select: { id: true },
      });

      if (!department) {
        return { success: false, reason: 'departmentNotFound' };
      }

      const existingRole = await transaction.role.findFirst({
        where: { title: { equals: record.role, mode: 'insensitive' } },
        include: { employees: { select: { id: true } } },
      });

      if (existingRole?.employees.length) {
        return { success: false, reason: 'roleOccupied' };
      }

      const matchingEmployees = await transaction.employee.findMany({
        where: {
          departmentId: department.id,
          firstName: { equals: record.firstName, mode: 'insensitive' },
          lastName: { equals: record.lastName, mode: 'insensitive' },
        },
        select: { id: true, roleId: true },
      });

      if (matchingEmployees.length > 1) {
        return { success: false, reason: 'duplicateEmployee' };
      }

      if (matchingEmployees[0]?.roleId) {
        return { success: false, reason: 'employeeAlreadyAssigned' };
      }

      const role = existingRole ?? await transaction.role.create({ data: { title: record.role } });
      const employee = matchingEmployees[0]
        ? await transaction.employee.update({
          where: { id: matchingEmployees[0].id },
          data: { roleId: role.id },
        })
        : await transaction.employee.create({
          data: {
            firstName: record.firstName,
            lastName: record.lastName,
            departmentId: department.id,
            roleId: role.id,
          },
        });

      return {
        success: true,
        data: {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          role: role.title,
        },
      };
    });
  },
};
