import { useState, useEffect } from "react";

const RandomGlitch = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsGlitching(true);
        
        // Apply random glitch effects
        const effects = [
          () => {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            setTimeout(() => {
              document.body.style.filter = 'none';
            }, 200);
          },
          () => {
            const elements = document.querySelectorAll('*');
            const randomElement = elements[Math.floor(Math.random() * elements.length)] as HTMLElement;
            if (randomElement && randomElement.style) {
              randomElement.style.transform = `translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px)`;
              setTimeout(() => {
                randomElement.style.transform = 'none';
              }, 300);
            }
          },
          () => {
            document.body.style.textShadow = '2px 2px 0 red, -2px -2px 0 cyan';
            setTimeout(() => {
              document.body.style.textShadow = 'none';
            }, 150);
          },
          () => {
            const text = document.querySelectorAll('p, h1, h2, h3, span');
            text.forEach(el => {
              if (Math.random() > 0.7) {
                const original = el.textContent || '';
                el.textContent = original.split('').map(() => 
                  String.fromCharCode(Math.floor(Math.random() * 94) + 33)
                ).join('');
                setTimeout(() => {
                  el.textContent = original;
                }, 100);
              }
            });
          }
        ];

        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        randomEffect();
        
        setTimeout(() => {
          setIsGlitching(false);
        }, 500);
      }
    }, 10000);

    // Glitch on hover over images
    const handleImageHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG') {
        target.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(200%)`;
        setTimeout(() => {
          target.style.filter = 'none';
        }, 500);
      }
    };

    document.addEventListener('mouseover', handleImageHover);

    return () => {
      clearInterval(glitchInterval);
      document.removeEventListener('mouseover', handleImageHover);
    };
  }, []);

  // Add CSS glitch animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 2px); }
        40% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        80% { transform: translate(2px, -2px); }
        100% { transform: translate(0); }
      }
      
      .glitching {
        animation: glitch 0.3s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default RandomGlitch;