import { useState, useEffect } from 'react';
import { Download, Smartphone, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallAppButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    const dismissed = localStorage.getItem('pwa-banner-dismissed');
    if (!dismissed) {
      setTimeout(() => setShowBanner(true), 3000);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("To install LifeZinc, open your browser menu and choose 'Install app' or 'Add to Home Screen'.");
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  if (isInstalled || !showBanner) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          maxWidth: 400,
          width: 'calc(100% - 32px)',
          background: '#ffffff',
          borderRadius: 16,
          boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
          border: '1px solid #d3ebe7',
          padding: 16,
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <button
          onClick={dismissBanner}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7c7a',
            padding: 4,
          }}
        >
          <X className="w-5 h-5" />
        </button>

        <div style={{ display: 'flex', alignItems: 'start', gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #1AB0A8 0%, #76E5D3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: '#2c514e',
                marginBottom: 4,
              }}
            >
              Install LifeZinc App
            </h3>
            <p style={{ fontSize: 13, color: '#6b7c7a', lineHeight: 1.5 }}>
              Get the full experience with offline access, faster performance, and quick access from your home screen.
            </p>
          </div>
        </div>

        <button
          onClick={handleInstallClick}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: 999,
            background: 'linear-gradient(135deg, #1AB0A8 0%, #76E5D3 100%)',
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(26,176,168,0.3)',
          }}
        >
          <Download className="w-4 h-4" />
          Install App
        </button>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translate(-50%, 100px);
              opacity: 0;
            }
            to {
              transform: translate(-50%, 0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
