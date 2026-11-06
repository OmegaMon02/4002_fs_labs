import type { OrganizationRecord } from '../types';
import { jsonRequest, request } from './api';

export const organizationRepo = {
  getAll(): Promise<OrganizationRecord[]> {
    return request<OrganizationRecord[]>('/api/roles');
  },

  create(record: Omit<OrganizationRecord, 'id'>): Promise<OrganizationRecord> {
    return request<OrganizationRecord>('/api/roles', jsonRequest('POST', record));
  },
};