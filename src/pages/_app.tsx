import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/layout';

type MenuItems = {
  [key: string]: string;
};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.asPath === '/';
  if (isLoginPage) {
    return <Component {...pageProps} />;
  }

  const menuText = getMenuText(router.asPath);
  return (
    <Layout currentPath={router.asPath} menuText={menuText}>
      <Component {...pageProps} />
    </Layout>
  );
}

function getMenuText(path: string): string {
  const menuItems: MenuItems = {
    '/dashboard': 'Dashboard',
    '/unidade-consumidora': 'Unidades',
    '/geracao-unidade': 'Lançamento de geração mensal',
  };

  return menuItems[path] || '';
}
