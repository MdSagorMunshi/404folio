import { useState, useEffect } from "react";

export const useKonamiCode = () => {
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiCode(prev => {
        const newCode = [...prev, e.code];
        if (newCode.length > konamiSequence.length) {
          newCode.shift();
        }
        return newCode;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
      console.log('🎉 Konami Code activated! Developer mode enabled!');
      setIsActivated(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsActivated(false);
        setKonamiCode([]);
      }, 3000);
    }
  }, [konamiCode]);

  return isActivated;
};
