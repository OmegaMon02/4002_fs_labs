import { departments as initialDepartments } from '../data/departments.js';
import type { Department, Employee } from '../types.js';

function copyDepartment(department: Department): Department {
  return {
    name: department.name,
    employees: department.employees.map((employee) => ({ ...employee })),
  };
}

const departments = initialDepartments.map(copyDepartment);

export const employeeRepository = {
  getDepartments(): Department[] {
    return departments.map(copyDepartment);
  },

  createEmployee(departmentName: string, employee: Employee): Employee | undefined {
    const department = departments.find((item) => item.name === departmentName);
    if (!department) {
      return undefined;
    }

    department.employees.push({ ...employee });
    return { ...employee };
  },
};
