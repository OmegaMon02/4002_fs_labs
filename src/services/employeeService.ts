import { employeeRepo } from '../repositories/employeeRepo';
import type { Department, Employee } from '../types';

export type EmployeeField = 'firstName' | 'department';

export type CreateEmployeeResult =
  | { success: true; employee: Employee }
  | { success: false; errors: Partial<Record<EmployeeField, string>> };

export const employeeService = {
  getDepartments(): Department[] {
    return employeeRepo.getDepartments();
  },

  createEmployee(departmentName: string, employee: Employee): CreateEmployeeResult {
    const errors: Partial<Record<EmployeeField, string>> = {};

    if (employee.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    if (!employeeRepo.getDepartments().some((department) => department.name === departmentName)) {
      errors.department = 'Select a valid department.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const normalizedEmployee = {
      ...employee,
      firstName: employee.firstName.trim(),
      lastName: employee.lastName.trim(),
      ...(employee.title?.trim() ? { title: employee.title.trim() } : {}),
    };
    const createdEmployee = employeeRepo.createEmployee(departmentName, normalizedEmployee);

    if (!createdEmployee) {
      return { success: false, errors: { department: 'Select a valid department.' } };
    }

    return { success: true, employee: createdEmployee };
  },
};