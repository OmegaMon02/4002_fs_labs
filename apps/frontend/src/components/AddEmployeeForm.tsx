import { useState, type FormEvent, type ReactElement } from 'react';
import { useFormInput } from '../hooks/useFormInput';
import { employeeService } from '../services/employeeService';
import type { Department, Employee } from '../types';

interface AddEmployeeFormProps {
  departments: Department[];
  onEmployeeAdded: () => Promise<void>;
}

export function AddEmployeeForm({ departments, onEmployeeAdded }: AddEmployeeFormProps): ReactElement {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestError, setRequestError] = useState('');
  const firstName = useFormInput('');
  const lastName = useFormInput('');
  const title = useFormInput('');
  const departmentName = useFormInput('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setIsSubmitting(true);
    setRequestError('');
    const employee: Employee = {
      firstName: firstName.value,
      lastName: lastName.value,
      ...(title.value.trim() ? { title: title.value } : {}),
    };
    try {
      const result = await employeeService.createEmployee(departmentName.value, employee);

      if (!result.success) {
        firstName.validate(() => result.errors.firstName ? [result.errors.firstName] : []);
        departmentName.validate(() => result.errors.department ? [result.errors.department] : []);
        if (result.message) {
          setRequestError(result.message);
        }
        return;
      }

      firstName.reset();
      lastName.reset();
      title.reset();
      departmentName.reset();
      await onEmployeeAdded();
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Could not add the employee.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="add-employee" aria-labelledby="add-employee-heading">
      <div className="add-employee-intro">
        <span className="section-label">Directory update</span>
        <h2 id="add-employee-heading">Add an employee</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        {requestError && <p className="form-error" role="alert">{requestError}</p>}
        <label>
          First name
          <input
            type="text"
            value={firstName.value}
            onChange={(event) => firstName.setValue(event.target.value)}
            aria-invalid={firstName.messages.length > 0}
            aria-describedby={firstName.messages.length > 0 ? 'first-name-error' : undefined}
          />
          {firstName.messages[0] && <span className="form-error" id="first-name-error">{firstName.messages[0]}</span>}
        </label>
        <label>
          Last name
          <input type="text" value={lastName.value} onChange={(event) => lastName.setValue(event.target.value)} />
        </label>
        <label>
          Title <span className="optional">(optional)</span>
          <input type="text" value={title.value} onChange={(event) => title.setValue(event.target.value)} />
        </label>
        <label>
          Department
          <select
            value={departmentName.value}
            onChange={(event) => departmentName.setValue(event.target.value)}
            aria-invalid={departmentName.messages.length > 0}
            aria-describedby={departmentName.messages.length > 0 ? 'department-error' : undefined}
          >
            <option value="">Select a department</option>
            {departments.map((department) => <option key={department.name} value={department.name}>{department.name}</option>)}
          </select>
          {departmentName.messages[0] && <span className="form-error" id="department-error">{departmentName.messages[0]}</span>}
        </label>
        <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add employee'}</button>
      </form>
    </section>
  );
}