import type { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SidebarCart } from '../components/SidebarCart';
import { useCart } from '../context/CartContext';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const { isCartOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <SidebarCart isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};
