import { ReactNode } from 'react';
import { Menu } from '../menu/menu';
import { HeaderTitle } from '../header-title/headerTitle';

interface LayoutProps {
  currentPath: string;
  children: ReactNode;
  menuText: string;
}

export const Layout = ({ children, currentPath, menuText }: LayoutProps) => {
  return (
    <div className="flex">
      <header className="bg-white min-h-screen pt-8 ps-10 pe-10">
        <Menu currentPath={currentPath} />
      </header>
      <main className="min-h-screen min-w-full">
        <HeaderTitle title={menuText} />
        <div className="pt-12 pl-12">{children}</div>
      </main>
    </div>
  );
};
