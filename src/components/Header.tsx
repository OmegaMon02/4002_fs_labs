import type { ReactElement } from 'react';
import logoUrl from '../assets/logo.svg';

export function Header(): ReactElement {
  return (
    <header className="site-header">
      <img src={logoUrl} alt="Pixell River Financial logo" className="brand-mark" />
      <h1>Employee Directory</h1>
      <p className="header-intro">Pixell River Financial staff directory</p>
    </header>
  );
}