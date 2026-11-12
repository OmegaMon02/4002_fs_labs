import { employeeRepository } from '../repositories/employee.repository.js';
import type { Department, Employee } from '../types.js';

export type EmployeeField = 'firstName' | 'department';

export type CreateEmployeeResult =
  | { success: true; employee: Employee }
  | { success: false; errors: Partial<Record<EmployeeField, string>> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isEmployeeInput(value: unknown): value is Employee {
  return isRecord(value)
    && typeof value.firstName === 'string'
    && typeof value.lastName === 'string'
    && (value.title === undefined || typeof value.title === 'string');
}

export const employeeService = {
  getDepartments(): Promise<Department[]> {
    return employeeRepository.getDepartments();
  },

  async createEmployee(input: unknown): Promise<CreateEmployeeResult> {
    if (!isRecord(input)) {
      return { success: false, errors: { firstName: 'Enter valid employee details.' } };
    }

    const employee = input.employee;
    const departmentName = typeof input.departmentName === 'string' ? input.departmentName : '';
    const errors: Partial<Record<EmployeeField, string>> = {};

    if (!isEmployeeInput(employee)) {
      errors.firstName = 'Enter valid employee details.';
      return { success: false, errors };
    }

    if (employee.firstName.trim().length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
    }

    if (!departmentName || !(await employeeRepository.departmentExists(departmentName))) {
      errors.department = 'Select a valid department.';
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    const normalizedEmployee: Employee = {
      firstName: employee.firstName.trim(),
      lastName: employee.lastName.trim(),
      ...(typeof employee.title === 'string' && employee.title.trim()
        ? { title: employee.title.trim() }
        : {}),
    };
    const createdEmployee = await employeeRepository.createEmployee(departmentName, normalizedEmployee);

    if (!createdEmployee) {
      return { success: false, errors: { department: 'Select a valid department.' } };
    }

    return { success: true, employee: createdEmployee };
  },
};
