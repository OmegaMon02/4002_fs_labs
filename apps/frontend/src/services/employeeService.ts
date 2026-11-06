import { employeeRepo } from '../repositories/employeeRepo';
import { ApiError } from '../repositories/api';
import type { Department, Employee } from '../types';

export type EmployeeField = 'firstName' | 'department';

export type CreateEmployeeResult =
  | { success: true; employee: Employee }
  | { success: false; errors: Partial<Record<EmployeeField, string>>; message?: string };

export const employeeService = {
  getDepartments(): Promise<Department[]> {
    return employeeRepo.getDepartments();
  },

  async createEmployee(departmentName: string, employee: Employee): Promise<CreateEmployeeResult> {
    try {
      const createdEmployee = await employeeRepo.createEmployee(departmentName, employee);
      return { success: true, employee: createdEmployee };
    } catch (error) {
      if (error instanceof ApiError) {
        const errors: Partial<Record<EmployeeField, string>> = {};
        if (error.errors.firstName) {
          errors.firstName = error.errors.firstName;
        }
        if (error.errors.department) {
          errors.department = error.errors.department;
        }
        return { success: false, errors, ...(Object.keys(errors).length === 0 ? { message: error.message } : {}) };
      }
      throw error;
    }
  },
};