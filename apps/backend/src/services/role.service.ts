import { roleRepository } from '../repositories/role.repository.js';
import type { OrganizationRecord } from '../types.js';

export type OrganizationField = 'firstName' | 'lastName' | 'role';

export type CreateRoleResult =
  | { success: true; data: OrganizationRecord }
  | { success: false; errors: Partial<Record<OrganizationField, string>> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export const roleService = {
  getRoles(): OrganizationRecord[] {
    return roleRepository.getAll();
  },

  createRole(input: unknown): CreateRoleResult {
    if (!isRecord(input)) {
      return { success: false, errors: { firstName: 'Enter valid role holder details.' } };
    }

    const firstName = typeof input.firstName === 'string' ? input.firstName.trim() : '';
    const lastName = typeof input.lastName === 'string' ? input.lastName.trim() : '';
    const role = typeof input.role === 'string' ? input.role.trim() : '';
    const errors: Partial<Record<OrganizationField, string>> = {};

    if (firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required.';
    }
    if (!role) {
      errors.role = 'Role is required.';
    } else {
      const existingRole = roleRepository.findByRole(role);
      if (existingRole && (existingRole.firstName.trim() || existingRole.lastName.trim())) {
        errors.role = 'This role is already occupied.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return {
      success: true,
      data: roleRepository.create({ firstName, lastName, role }),
    };
  },
};
