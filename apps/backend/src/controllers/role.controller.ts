import type { Request, Response } from 'express';
import { roleService } from '../services/role.service.js';

export const roleController = {
  async getRoles(_request: Request, response: Response): Promise<void> {
    response.json(await roleService.getRoles());
  },

  async createRole(request: Request, response: Response): Promise<void> {
    const result = await roleService.createRole(request.body);
    if (!result.success) {
      response.status(400).json({ message: 'Role holder could not be created.', errors: result.errors });
      return;
    }

    response.status(201).json(result.data);
  },
};
