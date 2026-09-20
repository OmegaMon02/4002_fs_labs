import type { ReactElement } from 'react';
import type { Department } from '../types';

interface DepartmentSectionProps {
  department: Department;
}

export function DepartmentSection({ department }: DepartmentSectionProps): ReactElement {
  return (
    <section className="department" aria-labelledby={`${department.name}-heading`}>
      <div className="department-heading">
        <span className="department-index" aria-hidden="true">{String(department.name.charCodeAt(0)).slice(-2)}</span>
        <h2 id={`${department.name}-heading`}>{department.name}</h2>
      </div>
      <ul>
        {department.employees.map((employee) => (
          <li key={`${employee.firstName}-${employee.lastName}-${employee.title ?? 'staff'}`}>
            {employee.title && <span className="employee-title">{employee.title}</span>}
            <span className="employee-name">{employee.firstName} {employee.lastName}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}