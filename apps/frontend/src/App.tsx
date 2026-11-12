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
  const [departments, setDepartments] = useState<Department[]>([]);
  const [organizationRoles, setOrganizationRoles] = useState<OrganizationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let isMounted = true;

    Promise.all([employeeService.getDepartments(), organizationService.getOrganization()])
      .then(([loadedDepartments, loadedRoles]) => {
        if (isMounted) {
          setDepartments(loadedDepartments);
          setOrganizationRoles(loadedRoles);
          setLoadError('');
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setLoadError(error instanceof Error ? error.message : 'Could not load data from the server.');
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    function updatePath(): void {
      setPath(window.location.pathname);
    }

    window.addEventListener('popstate', updatePath);
    return () => window.removeEventListener('popstate', updatePath);
  }, []);

  async function refreshDepartments(): Promise<void> {
    try {
      setDepartments(await employeeService.getDepartments());
      setLoadError('');
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not refresh employee data.');
    }
  }

  async function refreshOrganizationAndDepartments(): Promise<void> {
    const [loadedDepartments, loadedRoles] = await Promise.all([
      employeeService.getDepartments(),
      organizationService.getOrganization(),
    ]);
    setDepartments(loadedDepartments);
    setOrganizationRoles(loadedRoles);
    setLoadError('');
  }

  async function retryLoading(): Promise<void> {
    setIsLoading(true);
    setLoadError('');
    try {
      const [loadedDepartments, loadedRoles] = await Promise.all([
        employeeService.getDepartments(),
        organizationService.getOrganization(),
      ]);
      setDepartments(loadedDepartments);
      setOrganizationRoles(loadedRoles);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Could not load data from the server.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Header
        pageTitle={path === '/organization' ? 'Organization' : 'Employee Directory'}
        intro={path === '/organization' ? 'Pixell River Financial leadership and management' : 'Pixell River Financial staff directory'}
      />
      {isLoading ? (
        <main className="directory" role="status">Loading data from the server...</main>
      ) : loadError ? (
        <main className="directory" role="alert">
          <p className="form-error">{loadError}</p>
          <button type="button" onClick={() => void retryLoading()}>Try again</button>
        </main>
      ) : path === '/organization' ? (
        <>
          <Organization roles={organizationRoles} />
          <AddOrganizationRoleForm
            departments={departments}
            onRoleCreated={refreshOrganizationAndDepartments}
          />
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