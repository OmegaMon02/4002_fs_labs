import type { Request, Response } from 'express';
import { employeeService } from '../services/employee.service.js';

export const employeeController = {
  getDepartments(_request: Request, response: Response): void {
    response.json(employeeService.getDepartments());
  },

  createEmployee(request: Request, response: Response): void {
    const result = employeeService.createEmployee(request.body);
    if (!result.success) {
      response.status(400).json({ message: 'Employee could not be created.', errors: result.errors });
      return;
    }

    response.status(201).json(result.employee);
  },
};
