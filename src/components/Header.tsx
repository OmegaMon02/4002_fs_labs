import type { ReactElement } from 'react';
import logoUrl from '../assets/logo.svg';

interface HeaderProps {
  pageTitle: string;
  intro: string;
}

export function Header({ pageTitle, intro }: HeaderProps): ReactElement {
  const currentPath = window.location.pathname;

  return (
    <header className="site-header">
      <img src={logoUrl} alt="Pixell River Financial logo" className="brand-mark" />
      <nav className="site-nav" aria-label="Main navigation">
        <a className={currentPath === '/employees' || currentPath === '/' ? 'active' : ''} href="/employees">Employees</a>
        <a className={currentPath === '/organization' ? 'active' : ''} href="/organization">Organization</a>
      </nav>
      <h1>{pageTitle}</h1>
      <p className="header-intro">{intro}</p>
    </header>
  );
}