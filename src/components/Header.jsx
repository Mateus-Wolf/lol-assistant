import React from 'react';
import { Users, Target } from 'lucide-react';

export function Header({
  version,
  isOffline,
  assistantMode = 'comp',
  onChangeAssistantMode
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[#c8aa6e]/30 pb-4 relative">
      {/* Decorative top metallic line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c8aa6e]/40 to-transparent" />

      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 bg-[#c8aa6e] rotate-45 shadow-[0_0_6px_#c8aa6e]" />
          <p className="font-mono-code text-[10.5px] tracking-[0.22em] text-[#c8aa6e] uppercase m-0 font-semibold">
            Scouting Report · Pré-partida
          </p>
        </div>
        <h1 className="font-rajdhani font-extrabold text-3xl sm:text-4xl tracking-wider text-[#f0e6d2] uppercase m-0 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {assistantMode === 'comp' ? 'Assistente de Composição' : 'Assistente de Lane'}
        </h1>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {/* Assistant Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#091428]/90 border border-[#c8aa6e]/30 p-1 rounded backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => onChangeAssistantMode('comp')}
            title="Análise completa da composição 5v5"
            className={`font-mono-code text-[11px] px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5 transition-all ${
              assistantMode === 'comp'
                ? 'text-[#f0e6d2] bg-gradient-to-b from-[#101e38] to-[#0a1428] border border-[#c8aa6e] shadow-[0_0_10px_rgba(200,170,110,0.25)] font-bold'
                : 'text-[#a09b8c] hover:text-[#f0e6d2]'
            }`}
          >
            <Users size={13} className={assistantMode === 'comp' ? 'text-[#c8aa6e]' : ''} />
            Assistente de Comp
          </button>

          <button
            onClick={() => onChangeAssistantMode('lane')}
            title="Análise focada em uma rota (1v1 / 2v2 Bot)"
            className={`font-mono-code text-[11px] px-3 py-1.5 rounded cursor-pointer flex items-center gap-1.5 transition-all ${
              assistantMode === 'lane'
                ? 'text-[#f0e6d2] bg-gradient-to-b from-[#101e38] to-[#0a1428] border border-[#c8aa6e] shadow-[0_0_10px_rgba(200,170,110,0.25)] font-bold'
                : 'text-[#a09b8c] hover:text-[#f0e6d2]'
            }`}
          >
            <Target size={13} className={assistantMode === 'lane' ? 'text-[#00cfbc]' : ''} />
            Assistente de Lane
          </button>
        </div>

        {/* Patch Tag */}
        <div className="font-mono-code text-xs text-[#cdbe91] border border-[#c8aa6e]/30 bg-[#091428]/90 rounded px-3 py-1.5 flex items-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
          <span
            className={`w-2 h-2 rotate-45 ${
              isOffline
                ? 'bg-[#a09b8c]'
                : 'bg-[#0bc6e3] shadow-[0_0_8px_#0bc6e3]'
            }`}
          />
          <span className="tracking-wide">
            {isOffline ? 'OFFLINE · LISTA LOCAL' : `PATCH ${version}`}
          </span>
        </div>
      </div>
    </header>
  );
}
