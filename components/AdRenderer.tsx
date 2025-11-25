import React, { useEffect, useRef } from 'react';
import { useSettings } from '../hooks/useSettings';
import { AdPosition } from '../types';

interface AdRendererProps {
  position: AdPosition;
}

const AdRenderer: React.FC<AdRendererProps> = ({ position }) => {
  const { settings } = useSettings();
  const adContainerRef = useRef<HTMLDivElement>(null);
  
  const { adsense, customAds } = settings.monetization;

  const adToRender = customAds.find(ad => ad.position === position && ad.enabled);

  useEffect(() => {
    const container = adContainerRef.current;
    if (container && (adToRender || (adsense.enabled && adToRender?.code.includes('adsbygoogle')))) {
      // Scripts in dangerouslySetInnerHTML don't execute by default.
      // This logic finds them and re-creates them so they run.
      // This is necessary for most ad networks, including AdSense, in SPAs.
      const scripts = Array.from(container.getElementsByTagName('script'));
      // FIX: Explicitly type `oldScript` to prevent it from being inferred as `unknown` or `any` in stricter TypeScript environments.
      scripts.forEach((oldScript: HTMLScriptElement) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      // Specifically for AdSense, after inserting an ad block,
      // this line tells AdSense to check the page and display the ad.
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    }
  }, [adToRender, adsense.enabled]);

  if (!adToRender) {
    return null;
  }

  return (
    <div className="ad-container my-4 flex justify-center bg-gray-800 p-2 rounded">
      <div 
        ref={adContainerRef}
        dangerouslySetInnerHTML={{ __html: adToRender.code }} 
      />
    </div>
  );
};

export default AdRenderer;