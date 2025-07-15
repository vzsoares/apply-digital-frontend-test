import { ReactNode } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="box min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}