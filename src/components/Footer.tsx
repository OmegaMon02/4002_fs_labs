import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return <footer>Copyright Pixell River Financial {new Date().getFullYear()}.</footer>;
}