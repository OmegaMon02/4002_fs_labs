import type { FormEvent, ReactElement } from 'react';
import { useForm } from '../hooks/useForm';
import { organizationService, type OrganizationField } from '../services/organizationService';
import type { OrganizationRecord } from '../types';

interface AddOrganizationRoleFormProps {
  onRoleCreated: () => void;
}

interface OrganizationFormValues {
  firstName: string;
  lastName: string;
  role: string;
}

const initialValues: OrganizationFormValues = { firstName: '', lastName: '', role: '' };

export function AddOrganizationRoleForm({ onRoleCreated }: AddOrganizationRoleFormProps): ReactElement {
  const form = useForm<OrganizationFormValues, OrganizationRecord, OrganizationField>(
    initialValues,
    ({ firstName, lastName, role }) => organizationService.createPerson(firstName, lastName, role),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    if (form.handleSubmit(event)) {
      onRoleCreated();
    }
  }

  return (
    <section className="add-organization-role" aria-labelledby="add-organization-role-heading">
      <div className="add-organization-role-intro">
        <span className="section-label">Organization update</span>
        <h2 id="add-organization-role-heading">Add a role holder</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          First name
          <input
            type="text"
            value={form.values.firstName}
            onChange={(event) => form.setField('firstName', event.target.value)}
            aria-invalid={Boolean(form.errors.firstName)}
            aria-describedby={form.errors.firstName ? 'organization-first-name-error' : undefined}
          />
          {form.errors.firstName && <span className="form-error" id="organization-first-name-error">{form.errors.firstName}</span>}
        </label>
        <label>
          Last name
          <input
            type="text"
            value={form.values.lastName}
            onChange={(event) => form.setField('lastName', event.target.value)}
            aria-invalid={Boolean(form.errors.lastName)}
            aria-describedby={form.errors.lastName ? 'organization-last-name-error' : undefined}
          />
          {form.errors.lastName && <span className="form-error" id="organization-last-name-error">{form.errors.lastName}</span>}
        </label>
        <label>
          Role
          <input
            type="text"
            value={form.values.role}
            onChange={(event) => form.setField('role', event.target.value)}
            aria-invalid={Boolean(form.errors.role)}
            aria-describedby={form.errors.role ? 'organization-role-error' : undefined}
          />
          {form.errors.role && <span className="form-error" id="organization-role-error">{form.errors.role}</span>}
        </label>
        <button type="submit">Add role holder</button>
      </form>
    </section>
  );
}