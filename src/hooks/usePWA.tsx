
import { useState, useEffect } from 'react';

// Déclaration du type manquant pour navigator.standalone
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PWAState {
  isInstalled: boolean;
  isOnline: boolean;
  canInstall: boolean;
  showInstallPrompt: () => void;
}

export const usePWA = (): PWAState => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Vérifier si l'app est installée
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isFullscreen = window.matchMedia('(display-mode: fullscreen)').matches;
      const isMinimalUi = window.matchMedia('(display-mode: minimal-ui)').matches;
      
      // En plus de ces vérifications, on peut aussi vérifier si l'app est installée via d'autres moyens
      const isFromHomeScreen = window.navigator.standalone === true;
      
      setIsInstalled(isStandalone || isFullscreen || isMinimalUi || isFromHomeScreen);
    };

    checkIfInstalled();

    // Observer les changements de mode d'affichage
    const mediaQuery = window.matchMedia('(display-mode: standalone), (display-mode: fullscreen), (display-mode: minimal-ui)');
    mediaQuery.addEventListener('change', checkIfInstalled);

    // Écouter les changements de connectivité
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Écouter l'installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
      console.log('Application installée avec succès');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', checkIfInstalled);
    };
  }, []);

  const showInstallPrompt = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
          console.log('Installation acceptée');
        } else {
          console.log('Installation refusée');
        }
        
        setDeferredPrompt(null);
        setCanInstall(false);
      } catch (error) {
        console.error('Erreur lors de la demande d\'installation:', error);
      }
    }
  };

  return {
    isInstalled,
    isOnline,
    canInstall,
    showInstallPrompt
  };
};

export default usePWA;
