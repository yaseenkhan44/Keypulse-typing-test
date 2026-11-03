import React from 'react';

interface KeyboardVisualizerProps {
  activeKey?: string;
  targetKey?: string;
  highlightHomeRow?: boolean;
  className?: string;
}

interface KeyConfig {
  key: string;
  display?: string;
  width?: string;
  finger: 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'thumb';
  isHome?: boolean;
  hasBump?: boolean;
}

export const KeyboardVisualizer: React.FC<KeyboardVisualizerProps> = ({
  activeKey = '',
  targetKey = '',
  highlightHomeRow = false,
  className = '',
}) => {
  // Finger color mapping
  const fingerStyles = {
    lp: 'bg-rose-50 text-rose-900 border-rose-200',
    lr: 'bg-amber-50 text-amber-900 border-amber-200',
    lm: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    li: 'bg-sky-50 text-sky-900 border-sky-200',
    ri: 'bg-blue-50 text-blue-900 border-blue-200',
    rm: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    rr: 'bg-purple-50 text-purple-900 border-purple-200',
    rp: 'bg-pink-50 text-pink-900 border-pink-200',
    thumb: 'bg-slate-50 text-slate-900 border-slate-200',
  };

  const rows: KeyConfig[][] = [
    // Number Row
    [
      { key: '`', finger: 'lp' },
      { key: '1', finger: 'lp' },
      { key: '2', finger: 'lr' },
      { key: '3', finger: 'lm' },
      { key: '4', finger: 'li' },
      { key: '5', finger: 'li' },
      { key: '6', finger: 'ri' },
      { key: '7', finger: 'ri' },
      { key: '8', finger: 'rm' },
      { key: '9', finger: 'rr' },
      { key: '0', finger: 'rp' },
      { key: '-', finger: 'rp' },
      { key: '=', finger: 'rp' },
      { key: 'Backspace', display: 'Bksp', width: 'flex-1', finger: 'rp' },
    ],
    // Top Row
    [
      { key: 'Tab', width: 'w-12 sm:w-14', finger: 'lp' },
      { key: 'q', finger: 'lp' },
      { key: 'w', finger: 'lr' },
      { key: 'e', finger: 'lm' },
      { key: 'r', finger: 'li' },
      { key: 't', finger: 'li' },
      { key: 'y', finger: 'ri' },
      { key: 'u', finger: 'ri' },
      { key: 'i', finger: 'rm' },
      { key: 'o', finger: 'rr' },
      { key: 'p', finger: 'rp' },
      { key: '[', finger: 'rp' },
      { key: ']', finger: 'rp' },
      { key: '\\', finger: 'rp' },
    ],
    // Home Row
    [
      { key: 'Caps', width: 'w-14 sm:w-16', finger: 'lp' },
      { key: 'a', finger: 'lp', isHome: true },
      { key: 's', finger: 'lr', isHome: true },
      { key: 'd', finger: 'lm', isHome: true },
      { key: 'f', finger: 'li', isHome: true, hasBump: true },
      { key: 'g', finger: 'li' },
      { key: 'h', finger: 'ri' },
      { key: 'j', finger: 'ri', isHome: true, hasBump: true },
      { key: 'k', finger: 'rm', isHome: true },
      { key: 'l', finger: 'rr', isHome: true },
      { key: ';', finger: 'rp', isHome: true },
      { key: "'", finger: 'rp' },
      { key: 'Enter', display: 'Enter', width: 'flex-1', finger: 'rp' },
    ],
    // Bottom Row
    [
      { key: 'ShiftLeft', display: 'Shift', width: 'w-16 sm:w-20', finger: 'lp' },
      { key: 'z', finger: 'lp' },
      { key: 'x', finger: 'lr' },
      { key: 'c', finger: 'lm' },
      { key: 'v', finger: 'li' },
      { key: 'b', finger: 'li' },
      { key: 'n', finger: 'ri' },
      { key: 'm', finger: 'ri' },
      { key: ',', finger: 'rm' },
      { key: '.', finger: 'rr' },
      { key: '/', finger: 'rp' },
      { key: 'ShiftRight', display: 'Shift', width: 'flex-1', finger: 'rp' },
    ],
    // Space Row
    [
      { key: 'Control', display: 'Ctrl', width: 'w-12 sm:w-14', finger: 'lp' },
      { key: 'Alt', display: 'Alt', width: 'w-10 sm:w-12', finger: 'lp' },
      { key: ' ', display: 'Spacebar', width: 'flex-1 max-w-sm', finger: 'thumb' },
      { key: 'AltGraph', display: 'Alt', width: 'w-10 sm:w-12', finger: 'rp' },
      { key: 'ControlRight', display: 'Ctrl', width: 'w-12 sm:w-14', finger: 'rp' },
    ],
  ];

  const normalize = (k: string) => k.toLowerCase();
  const currentActive = normalize(activeKey);
  const currentTarget = normalize(targetKey);

  return (
    <div className={`p-4 bg-slate-900 rounded-xl shadow-lg border border-slate-800 ${className}`}>
      {/* Visual Finger Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
        <span className="font-medium text-slate-300">Tactile QWERTY Finger Assignment</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
            Pinky
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            Ring
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
            Middle
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block"></span>
            Index
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span>
            Thumb
          </span>
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="space-y-1.5 select-none font-mono text-xs">
        {rows.map((row, rIdx) => (
          <div key={rIdx} className="flex gap-1 justify-center">
            {row.map((k) => {
              const keyNorm = normalize(k.key);
              const isActive = currentActive === keyNorm || (keyNorm === ' ' && currentActive === 'space');
              const isTarget = currentTarget === keyNorm || (keyNorm === ' ' && currentTarget === 'space');
              const baseColor = fingerStyles[k.finger];

              let stateStyle = 'bg-slate-800/90 text-slate-200 border-slate-700/80';
              if (isActive) {
                stateStyle = 'bg-sky-500 text-white border-sky-400 key-press-active shadow-md ring-2 ring-sky-300';
              } else if (isTarget) {
                stateStyle = 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-sm animate-pulse ring-2 ring-amber-300';
              } else if (highlightHomeRow && k.isHome) {
                stateStyle = 'bg-sky-950/70 text-sky-200 border-sky-700 ring-1 ring-sky-500/50';
              }

              return (
                <div
                  key={k.key}
                  className={`relative flex items-center justify-center rounded transition-all duration-75 border ${
                    k.width || 'w-7 sm:w-9 md:w-10'
                  } h-9 sm:h-10 md:h-11 ${stateStyle}`}
                >
                  <span className="text-[11px] sm:text-xs uppercase font-medium">
                    {k.display || k.key}
                  </span>

                  {/* Physical tactile ridge marker for F and J */}
                  {k.hasBump && (
                    <span className="absolute bottom-1 w-2.5 h-[2px] bg-sky-400 rounded-full"></span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
