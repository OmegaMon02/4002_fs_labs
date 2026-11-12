import { prisma } from '../db/prisma.js';
import type { Department, Employee } from '../types.js';

export const employeeRepository = {
  async getDepartments(): Promise<Department[]> {
    const departments = await prisma.department.findMany({
    orderBy: { name: 'asc' },
    include: {
      employees: {
        orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }],
        include: { role: { select: { title: true } } },
      },
    },
    });

    return departments.map((department) => ({
    name: department.name,
    employees: department.employees.map((employee) => ({
      firstName: employee.firstName,
      lastName: employee.lastName,
      ...(employee.role ? { title: employee.role.title } : {}),
    })),
    }));
  },

  async departmentExists(departmentName: string): Promise<boolean> {
    const department = await prisma.department.findUnique({
    where: { name: departmentName },
    select: { id: true },
    });
    return department !== null;
  },

  async createEmployee(departmentName: string, employee: Employee): Promise<Employee | undefined> {
    return prisma.$transaction(async (transaction) => {
    const department = await transaction.department.findUnique({
      where: { name: departmentName },
      select: { id: true },
    });

    if (!department) {
      return undefined;
    }

    const role = employee.title
      ? await transaction.role.findFirst({
        where: { title: { equals: employee.title, mode: 'insensitive' } },
        select: { id: true, title: true },
      }) ?? await transaction.role.create({ data: { title: employee.title } })
      : undefined;

    await transaction.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        departmentId: department.id,
        ...(role ? { roleId: role.id } : {}),
      },
    });

    return {
      firstName: employee.firstName,
      lastName: employee.lastName,
      ...(role ? { title: role.title } : {}),
    };
    });
  },
};
