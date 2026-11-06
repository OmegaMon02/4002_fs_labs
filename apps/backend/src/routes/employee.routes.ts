import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller.js';

export const employeeRoutes = Router();

employeeRoutes.get('/departments', employeeController.getDepartments);
employeeRoutes.post('/', employeeController.createEmployee);
