import { Router } from 'express';
import { roleController } from '../controllers/role.controller.js';

export const roleRoutes = Router();

roleRoutes.get('/', roleController.getRoles);
roleRoutes.post('/', roleController.createRole);
