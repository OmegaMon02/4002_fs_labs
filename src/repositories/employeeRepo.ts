import { departments as initialDepartments } from '../data/departments';
import type { Department, Employee } from '../types';

function copyDepartment(department: Department): Department {
  return {
    name: department.name,
    employees: department.employees.map((employee) => ({ ...employee })),
  };
}

let storedDepartments = initialDepartments.map(copyDepartment);

export const employeeRepo = {
  getDepartments(): Department[] {
    return storedDepartments.map(copyDepartment);
  },

  getEmployeesByDepartment(departmentName: string): Employee[] {
    const department = storedDepartments.find((item) => item.name === departmentName);
    return department?.employees.map((employee) => ({ ...employee })) ?? [];
  },

  createEmployee(departmentName: string, employee: Employee): Employee | undefined {
    const department = storedDepartments.find((item) => item.name === departmentName);
    if (!department) {
      return undefined;
    }

    const createdEmployee = { ...employee };
    department.employees.push(createdEmployee);
    return { ...createdEmployee };
  },
};