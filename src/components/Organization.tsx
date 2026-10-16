import type { ReactElement } from 'react';
import type { OrganizationRecord } from '../types';

interface OrganizationProps {
  roles: OrganizationRecord[];
}

export function Organization({ roles }: OrganizationProps): ReactElement {
  return (
    <main className="organization" id="organization-container">
      <div className="directory-summary">
        <span>Leadership and management</span>
        <span>{roles.length} roles</span>
      </div>
      <div className="role-list">
        {roles.map((role) => (
          <div className="role-row" key={role.id}>
            <span className="role-name">{role.firstName} {role.lastName}</span>
            <span className="role-title">{role.role}</span>
          </div>
        ))}
      </div>
    </main>
  );
}