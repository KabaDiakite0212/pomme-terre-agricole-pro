
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import PWAInstallPrompt from './PWAInstallPrompt';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Vérifier si l'application est en mode plein écran
  useEffect(() => {
    const checkFullScreen = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      setIsFullScreen(isStandalone || isFullscreen);
    };
    
    checkFullScreen();
    const mediaQuery = window.matchMedia('(display-mode: standalone), (display-mode: fullscreen)');
    mediaQuery.addEventListener('change', checkFullScreen);
    
    return () => mediaQuery.removeEventListener('change', checkFullScreen);
  }, []);

  return (
    <div className={`min-h-screen w-screen max-w-full bg-gradient-to-br from-green-50 to-amber-50 flex overflow-hidden ${isFullScreen ? 'h-screen' : ''}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 overflow-auto w-full h-full">
          {children}
        </main>
      </div>
      <PWAInstallPrompt />
    </div>
  );
};

export default Layout;
