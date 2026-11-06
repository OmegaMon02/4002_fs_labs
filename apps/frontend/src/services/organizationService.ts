import { organizationRepo } from '../repositories/organizationRepo';
import { ApiError } from '../repositories/api';
import type { OrganizationRecord } from '../types';

export type OrganizationField = 'firstName' | 'lastName' | 'role';

export type CreateOrganizationResult =
  | { success: true; data: OrganizationRecord }
  | { success: false; errors: Partial<Record<OrganizationField, string>>; message?: string };

export const organizationService = {
  getOrganization(): Promise<OrganizationRecord[]> {
    return organizationRepo.getAll();
  },

  async createPerson(firstName: string, lastName: string, role: string): Promise<CreateOrganizationResult> {
    try {
      const data = await organizationRepo.create({
        firstName,
        lastName,
        role,
      });
      return { success: true, data };
    } catch (error) {
      if (error instanceof ApiError) {
        const errors: Partial<Record<OrganizationField, string>> = {};
        if (error.errors.firstName) {
          errors.firstName = error.errors.firstName;
        }
        if (error.errors.lastName) {
          errors.lastName = error.errors.lastName;
        }
        if (error.errors.role) {
          errors.role = error.errors.role;
        }
        return { success: false, errors, ...(Object.keys(errors).length === 0 ? { message: error.message } : {}) };
      }
      throw error;
    }
  },
};