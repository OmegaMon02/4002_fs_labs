import type { ReactElement } from 'react';
import { departments } from '../data/departments';
import { DepartmentSection } from './DepartmentSection';

export function EmployeeDirectory(): ReactElement {
  const employeeCount = departments.reduce((total, department) => total + department.employees.length, 0);

  return (
    <main className="directory" id="directory-container">
      <div className="directory-summary">
        <span>Directory overview</span>
        <span>{departments.length} departments / {employeeCount} employees</span>
      </div>
      <div className="department-grid">
        {departments.map((department) => <DepartmentSection key={department.name} department={department} />)}
      </div>
    </main>
  );
}