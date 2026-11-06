import type { Department, Employee } from '../types';
import { jsonRequest, request } from './api';

export const employeeRepo = {
  getDepartments(): Promise<Department[]> {
    return request<Department[]>('/api/employees/departments');
  },

  createEmployee(departmentName: string, employee: Employee): Promise<Employee> {
    return request<Employee>('/api/employees', jsonRequest('POST', { departmentName, employee }));
  },
};