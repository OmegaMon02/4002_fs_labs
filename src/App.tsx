import { useEffect, useState, type ReactElement } from 'react';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { AddEmployeeForm } from './components/AddEmployeeForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Organization } from './components/Organization';
import { departments as initialDepartments } from './data/departments';
import { organizationRoles } from './data/organization';
import type { Department, Employee } from './types';

export function App(): ReactElement {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function updatePath(): void {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  function addEmployee(departmentName: string, employee: Employee): void {
    setDepartments((currentDepartments) => currentDepartments.map((department) => (
      department.name === departmentName
        ? { ...department, employees: [...department.employees, employee] }
        : department
    )));
  }

  return (
    <div className="app-shell">
      <Header
        pageTitle={path === '/organization' ? 'Organization' : 'Employee Directory'}
        intro={path === '/organization' ? 'Pixell River Financial leadership and management' : 'Pixell River Financial staff directory'}
      />
      {path === '/organization' ? (
        <Organization roles={organizationRoles} />
      ) : (
        <>
          <EmployeeDirectory departments={departments} />
          <AddEmployeeForm departments={departments} onAddEmployee={addEmployee} />
        </>
      )}
      <Footer />
    </div>
  );
}