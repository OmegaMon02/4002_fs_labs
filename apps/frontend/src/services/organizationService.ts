import { organizationRepo } from '../repositories/organizationRepo';
import type { OrganizationRecord } from '../types';

export type OrganizationField = 'firstName' | 'lastName' | 'role';

export type CreateOrganizationResult =
  | { success: true; data: OrganizationRecord }
  | { success: false; errors: Partial<Record<OrganizationField, string>> };

export const organizationService = {
  getOrganization(): OrganizationRecord[] {
    return organizationRepo.getAll();
  },

  createPerson(firstName: string, lastName: string, role: string): CreateOrganizationResult {
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();
    const normalizedRole = role.trim();
    const errors: Partial<Record<OrganizationField, string>> = {};

    if (normalizedFirstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }
    if (!normalizedLastName) {
      errors.lastName = 'Last name is required.';
    }
    if (!normalizedRole) {
      errors.role = 'Role is required.';
    } else {
      const existingRole = organizationRepo.findByRole(normalizedRole);
      if (existingRole && (existingRole.firstName.trim() || existingRole.lastName.trim())) {
        errors.role = 'This role is already occupied.';
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return {
      success: true,
      data: organizationRepo.create({
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        role: normalizedRole,
      }),
    };
  },
};