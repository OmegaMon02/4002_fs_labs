import type { Request, Response } from 'express';
import { roleService } from '../services/role.service.js';

export const roleController = {
  getRoles(_request: Request, response: Response): void {
    response.json(roleService.getRoles());
  },

  createRole(request: Request, response: Response): void {
    const result = roleService.createRole(request.body);
    if (!result.success) {
      response.status(400).json({ message: 'Role holder could not be created.', errors: result.errors });
      return;
    }

    response.status(201).json(result.data);
  },
};
