import { useState, type FormEvent, type ReactElement } from 'react';
import { useForm } from '../hooks/useForm';
import { organizationService, type OrganizationField } from '../services/organizationService';
import type { Department, OrganizationRecord } from '../types';

interface AddOrganizationRoleFormProps {
  departments: Department[];
  onRoleCreated: () => Promise<void>;
}

interface OrganizationFormValues {
  firstName: string;
  lastName: string;
  role: string;
  departmentName: string;
}

const initialValues: OrganizationFormValues = { firstName: '', lastName: '', role: '', departmentName: '' };

export function AddOrganizationRoleForm({ departments, onRoleCreated }: AddOrganizationRoleFormProps): ReactElement {
  const [requestError, setRequestError] = useState('');
  const form = useForm<OrganizationFormValues, OrganizationRecord, OrganizationField>(
    initialValues,
    ({ firstName, lastName, role, departmentName }) =>
      organizationService.createPerson(firstName, lastName, role, departmentName),
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    setRequestError('');
    const createdRole = await form.handleSubmit(event);
    if (createdRole) {
      try {
        await onRoleCreated();
      } catch (error) {
        setRequestError(error instanceof Error ? error.message : 'Could not refresh organization data.');
      }
    }
  }

  return (
    <section className="add-organization-role" aria-labelledby="add-organization-role-heading">
      <div className="add-organization-role-intro">
        <span className="section-label">Organization update</span>
        <h2 id="add-organization-role-heading">Add a role holder</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {requestError && <p className="form-error" role="alert">{requestError}</p>}
        {form.submitError && <p className="form-error" role="alert">{form.submitError}</p>}
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
        <label>
          Department
          <select
            value={form.values.departmentName}
            onChange={(event) => form.setField('departmentName', event.target.value)}
            aria-invalid={Boolean(form.errors.departmentName)}
            aria-describedby={form.errors.departmentName ? 'organization-department-error' : undefined}
          >
            <option value="">Select a department</option>
            {departments.map((department) => (
              <option key={department.name} value={department.name}>{department.name}</option>
            ))}
          </select>
          {form.errors.departmentName && (
            <span className="form-error" id="organization-department-error">{form.errors.departmentName}</span>
          )}
        </label>
        <button type="submit" disabled={form.isSubmitting}>{form.isSubmitting ? 'Adding...' : 'Add role holder'}</button>
      </form>
    </section>
  );
}