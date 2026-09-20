import type { ReactElement } from 'react';
import { EmployeeDirectory } from './components/EmployeeDirectory';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export function App(): ReactElement {
  return (
    <div className="app-shell">
      <Header />
      <EmployeeDirectory />
      <Footer />
    </div>
  );
}