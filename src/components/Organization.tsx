import type { ReactElement } from 'react';
import type { Role } from '../types';

interface OrganizationProps {
  roles: Role[];
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
          <div className="role-row" key={`${role.firstName}-${role.lastName}`}>
            <span className="role-name">{role.firstName} {role.lastName}</span>
            <span className="role-title">{role.role}</span>
          </div>
        ))}
      </div>
    </main>
  );
}