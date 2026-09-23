import { useState, type FormEvent, type ReactElement } from 'react';
import type { Department, Employee } from '../types';

interface AddEmployeeFormProps {
  departments: Department[];
  onAddEmployee: (departmentName: string, employee: Employee) => void;
}

interface FormErrors {
  firstName?: string;
  department?: string;
}

export function AddEmployeeForm({ departments, onAddEmployee }: AddEmployeeFormProps): ReactElement {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [title, setTitle] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setErrors({});

    const nextErrors: FormErrors = {};
    if (firstName.trim().length < 3) {
      nextErrors.firstName = 'First name must be at least 3 characters.';
    }
    if (!departmentName) {
      nextErrors.department = 'Select a department.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAddEmployee(departmentName, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      ...(title.trim() ? { title: title.trim() } : {}),
    });
    setFirstName('');
    setLastName('');
    setTitle('');
    setDepartmentName('');
  }

  return (
    <section className="add-employee" aria-labelledby="add-employee-heading">
      <div className="add-employee-intro">
        <span className="section-label">Directory update</span>
        <h2 id="add-employee-heading">Add an employee</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          First name
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? 'first-name-error' : undefined}
          />
          {errors.firstName && <span className="form-error" id="first-name-error">{errors.firstName}</span>}
        </label>
        <label>
          Last name
          <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
        </label>
        <label>
          Title <span className="optional">(optional)</span>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          Department
          <select
            value={departmentName}
            onChange={(event) => setDepartmentName(event.target.value)}
            aria-invalid={Boolean(errors.department)}
            aria-describedby={errors.department ? 'department-error' : undefined}
          >
            <option value="">Select a department</option>
            {departments.map((department) => <option key={department.name} value={department.name}>{department.name}</option>)}
          </select>
          {errors.department && <span className="form-error" id="department-error">{errors.department}</span>}
        </label>
        <button type="submit">Add employee</button>
      </form>
    </section>
  );
}