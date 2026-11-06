import { organizationRoles } from '../data/organization.js';
import type { OrganizationRecord } from '../types.js';

let nextRecordId = organizationRoles.length + 1;
const records: OrganizationRecord[] = organizationRoles.map((role, index) => ({
  ...role,
  id: `organization-${index + 1}`,
}));

export const roleRepository = {
  getAll(): OrganizationRecord[] {
    return records.map((record) => ({ ...record }));
  },

  findByRole(roleName: string): OrganizationRecord | undefined {
    const normalizedRole = roleName.trim().toLocaleLowerCase();
    const record = records.find((item) => item.role.trim().toLocaleLowerCase() === normalizedRole);
    return record ? { ...record } : undefined;
  },

  create(record: Omit<OrganizationRecord, 'id'>): OrganizationRecord {
    const createdRecord = { ...record, id: `organization-${nextRecordId}` };
    nextRecordId += 1;
    records.push(createdRecord);
    return { ...createdRecord };
  },
};
