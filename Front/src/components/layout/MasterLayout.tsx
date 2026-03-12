import React, { useState, useEffect } from 'react';
import NavigationMenu from './NavigationMenu';
import LoadingScreen from './LoadingScreen';

interface MasterLayoutProps {
  children: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="relative min-h-screen bg-krayaa-dark text-krayaa-cream font-body">
      <header className="absolute top-0 w-full z-40 px-6 py-6 flex justify-between items-center">
        <div className="cursor-pointer">
           <img src="/krayaa-logo.png" alt="Krayaaa Logo" className="h-10" />
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="space-y-2 focus:outline-none group"
        >
          <span className="block w-8 h-0.5 bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors"></span>
          <span className="block w-8 h-0.5 bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors"></span>
          <span className="block w-8 h-0.5 bg-krayaa-gold group-hover:bg-krayaa-cream transition-colors"></span>
        </button>
      </header>

      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="pt-24 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MasterLayout;