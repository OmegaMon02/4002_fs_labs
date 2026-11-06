import { useEffect, useState, type ReactElement } from 'react';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { AddEmployeeForm } from './components/AddEmployeeForm';
import { AddOrganizationRoleForm } from './components/AddOrganizationRoleForm';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Organization } from './components/Organization';
import { employeeService } from './services/employeeService';
import { organizationService } from './services/organizationService';
import type { Department, OrganizationRecord } from './types';

export function App(): ReactElement {
  const [departments, setDepartments] = useState<Department[]>(() => employeeService.getDepartments());
  const [organizationRoles, setOrganizationRoles] = useState<OrganizationRecord[]>(() => organizationService.getOrganization());
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    function updatePath(): void {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  function refreshDepartments(): void {
    setDepartments(employeeService.getDepartments());
  }

  function refreshOrganization(): void {
    setOrganizationRoles(organizationService.getOrganization());
  }

  return (
    <div className="app-shell">
      <Header
        pageTitle={path === '/organization' ? 'Organization' : 'Employee Directory'}
        intro={path === '/organization' ? 'Pixell River Financial leadership and management' : 'Pixell River Financial staff directory'}
      />
      {path === '/organization' ? (
        <>
          <Organization roles={organizationRoles} />
          <AddOrganizationRoleForm onRoleCreated={refreshOrganization} />
        </>
      ) : (
        <>
          <EmployeeDirectory departments={departments} />
          <AddEmployeeForm departments={departments} onEmployeeAdded={refreshDepartments} />
        </>
      )}
      <Footer />
    </div>
  );
}