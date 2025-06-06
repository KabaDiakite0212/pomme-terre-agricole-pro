
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const PWAInstallPrompt = () => {
  const { isInstalled, isOnline, canInstall, showInstallPrompt } = usePWA();
  const [showPrompt, setShowPrompt] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Afficher le prompt uniquement si l'app n'est pas installée et que le prompt est disponible
    if (!isInstalled && canInstall && !dismissed) {
      // Attendre un moment avant d'afficher le prompt pour une meilleure UX
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowPrompt(false);
    }
  }, [isInstalled, canInstall, dismissed]);

  const handleInstall = () => {
    showInstallPrompt();
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDismissed(true);
    // Réinitialiser après 3 jours
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Vérifier si le prompt a été rejeté récemment
  useEffect(() => {
    const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < threeDaysInMs) {
        setDismissed(true);
      } else {
        localStorage.removeItem('pwa-prompt-dismissed');
        setDismissed(false);
      }
    }
  }, []);

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 z-50 md:left-auto md:right-4 md:max-w-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Installer l'application</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="h-auto p-1"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        Installez AgriPro sur votre appareil pour accéder à toutes les fonctionnalités même sans connexion internet.
      </p>
      
      <div className="flex space-x-2">
        <Button onClick={handleInstall} className="flex-1 bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Installer
        </Button>
        <Button variant="outline" onClick={handleDismiss} className="flex-1">
          Plus tard
        </Button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
