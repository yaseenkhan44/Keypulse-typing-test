import React from 'react';
import { siteConfig } from '../config/siteConfig';

interface AdPlaceholderProps {
  slotId: string;
  format?: 'leaderboard' | 'rectangle' | 'banner';
  className?: string;
}

/**
 * Google AdSense Compliant Placeholder Component.
 * - Strictly clearly marked with "ADVERTISEMENT"
 * - Styled as a quiet, non-deceptive utility container
 * - Never positioned near interactive inputs, timer controls, or test buttons
 * - Ready for real AdSense script insertion once publisher ID is verified
 */
export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId,
  format = 'leaderboard',
  className = '',
}) => {
  // If publisher has configured a real approved AdSense client ID, this is where real ad tags render.
  const isLiveAdSense = siteConfig.adsense.enabled && !!siteConfig.adsense.publisherId;

  const formatStyles = {
    leaderboard: 'min-h-[90px] max-w-4xl py-4',
    rectangle: 'min-h-[250px] max-w-sm p-4',
    banner: 'min-h-[60px] max-w-5xl py-2',
  }[format];

  if (isLiveAdSense) {
    return (
      <aside aria-label="Advertisement" className={`my-8 mx-auto w-full text-center ${className}`}>
        <span className="block text-[11px] font-medium tracking-wider text-slate-400 uppercase mb-1">
          Advertisement
        </span>
        <div className={`mx-auto bg-slate-50 border border-slate-200 rounded flex items-center justify-center ${formatStyles}`}>
          {/* Real Google AdSense ad unit script will mount here */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={siteConfig.adsense.publisherId}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Advertisement Space"
      className={`my-8 mx-auto w-full max-w-4xl px-4 text-center ${className}`}
    >
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Advertisement
        </span>
      </div>
      <div
        className={`w-full mx-auto rounded-lg border border-dashed border-slate-200 bg-slate-50/70 flex flex-col items-center justify-center text-slate-400 text-xs px-6 ${formatStyles}`}
      >
        <span className="font-medium text-slate-500">Google AdSense Reserved Placement</span>
        <span className="text-[11px] text-slate-400 mt-1 max-w-md">
          Compliant ad slot (Slot ID: {slotId}). Unfilled in development mode to prevent invalid impressions and preserve clean user experience.
        </span>
      </div>
    </aside>
  );
};
