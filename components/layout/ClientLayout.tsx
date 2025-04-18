'use client';

import { useThemeStore } from '@/store/useThemeStore';
import Header from './Header';
import CategoryMenu from './CategoryMenu';
import ScrollToTop from '../ui/ScrollToTop';
import Footer from './Footer';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  return (
    <div data-theme={theme} className="min-h-screen">
      <Header />

      <CategoryMenu />

      {children}

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ClientLayout;
