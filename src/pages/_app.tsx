import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/layout';
import { DataProvider } from '@/context/ApiDataContext';

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
    <DataProvider>
      <Layout currentPath={router.asPath} menuText={menuText}>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
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
