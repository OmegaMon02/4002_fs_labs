import { useState, type ReactElement } from 'react';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { AddEmployeeForm } from './components/AddEmployeeForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { departments as initialDepartments } from './data/departments';
import type { Department, Employee } from './types';

export function App(): ReactElement {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  function addEmployee(departmentName: string, employee: Employee): void {
    setDepartments((currentDepartments) => currentDepartments.map((department) => (
      department.name === departmentName
        ? { ...department, employees: [...department.employees, employee] }
        : department
    )));
  }

  return (
    <div className="app-shell">
      <Header />
      <EmployeeDirectory departments={departments} />
      <AddEmployeeForm departments={departments} onAddEmployee={addEmployee} />
      <Footer />
    </div>
  );
}