import { roleRepository } from '../repositories/role.repository.js';
import type { OrganizationRecord } from '../types.js';

export type OrganizationField = 'firstName' | 'lastName' | 'role' | 'departmentName';

export type CreateRoleResult =
  | { success: true; data: OrganizationRecord }
  | { success: false; errors: Partial<Record<OrganizationField, string>> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export const roleService = {
  getRoles(): Promise<OrganizationRecord[]> {
    return roleRepository.getAll();
  },

  async createRole(input: unknown): Promise<CreateRoleResult> {
    if (!isRecord(input)) {
      return { success: false, errors: { firstName: 'Enter valid role holder details.' } };
    }

    const firstName = typeof input.firstName === 'string' ? input.firstName.trim() : '';
    const lastName = typeof input.lastName === 'string' ? input.lastName.trim() : '';
    const role = typeof input.role === 'string' ? input.role.trim() : '';
    const departmentName = typeof input.departmentName === 'string' ? input.departmentName.trim() : '';
    const errors: Partial<Record<OrganizationField, string>> = {};

    if (firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required.';
    }
    if (!role) {
      errors.role = 'Role is required.';
    }
    if (!departmentName) {
      errors.departmentName = 'Select a valid department.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const result = await roleRepository.create({ firstName, lastName, role }, departmentName);
    if (result.success) {
      return result;
    }

    switch (result.reason) {
      case 'departmentNotFound':
        return { success: false, errors: { departmentName: 'Select a valid department.' } };
      case 'roleOccupied':
        return { success: false, errors: { role: 'This role is already occupied.' } };
      case 'employeeAlreadyAssigned':
        return { success: false, errors: { firstName: 'This employee already has a role in this department.' } };
      case 'duplicateEmployee':
        return { success: false, errors: { firstName: 'More than one employee matches these details in this department.' } };
    }
  },
};
