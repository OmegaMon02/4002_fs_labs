import { organizationRoles } from '../data/organization';
import type { OrganizationRecord } from '../types';

let nextRecordId = organizationRoles.length + 1;
let records: OrganizationRecord[] = organizationRoles.map((role, index) => ({
  ...role,
  id: `organization-${index + 1}`,
}));

function copyRecord(record: OrganizationRecord): OrganizationRecord {
  return { ...record };
}

export const organizationRepo = {
  getAll(): OrganizationRecord[] {
    return records.map(copyRecord);
  },

  getById(id: string): OrganizationRecord | undefined {
    const record = records.find((item) => item.id === id);
    return record ? copyRecord(record) : undefined;
  },

  findByRole(roleName: string): OrganizationRecord | undefined {
    const normalizedRole = roleName.trim().toLocaleLowerCase();
    const record = records.find((item) => item.role.trim().toLocaleLowerCase() === normalizedRole);
    return record ? copyRecord(record) : undefined;
  },

  create(record: Omit<OrganizationRecord, 'id'>): OrganizationRecord {
    const createdRecord = { ...record, id: `organization-${nextRecordId}` };
    nextRecordId += 1;
    records.push(createdRecord);
    return copyRecord(createdRecord);
  },

  update(id: string, changes: Partial<Omit<OrganizationRecord, 'id'>>): OrganizationRecord | undefined {
    const index = records.findIndex((item) => item.id === id);
    if (index < 0) {
      return undefined;
    }

    records[index] = { ...records[index], ...changes };
    return copyRecord(records[index]);
  },

  delete(id: string): boolean {
    const index = records.findIndex((item) => item.id === id);
    if (index < 0) {
      return false;
    }

    records.splice(index, 1);
    return true;
  },
};