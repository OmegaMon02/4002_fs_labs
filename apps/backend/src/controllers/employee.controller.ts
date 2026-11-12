import type { Request, Response } from 'express';
import { employeeService } from '../services/employee.service.js';

export const employeeController = {
  async getDepartments(_request: Request, response: Response): Promise<void> {
    response.json(await employeeService.getDepartments());
  },

  async createEmployee(request: Request, response: Response): Promise<void> {
    const result = await employeeService.createEmployee(request.body);
    if (!result.success) {
      response.status(400).json({ message: 'Employee could not be created.', errors: result.errors });
      return;
    }

    response.status(201).json(result.employee);
  },
};
