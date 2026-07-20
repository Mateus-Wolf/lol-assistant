import React from 'react';
import { SlotRow } from './SlotRow';
import { Shield, Swords, Compass } from 'lucide-react';

const LANES_OPTIONS = [
  { id: 'TOPO', label: 'TOPO', roleIndexes: [0] },
  { id: 'SELVA', label: 'SELVA', roleIndexes: [1] },
  { id: 'MEIO', label: 'MEIO', roleIndexes: [2] },
  { id: 'BOT', label: 'BOT LANE (2v2)', roleIndexes: [3, 4] },
];

export function DraftBoard({
  blue,
  red,
  active,
  youIndex,
  iconBase,
  assistantMode = 'comp',
  selectedLane = 'TOPO',
  onSelectLane,
  onSelectSlot,
  onSetYou,
  onRemoveChamp
}) {
  // Determine which slot indexes to render based on mode
  const activeRoleIndexes = assistantMode === 'lane'
    ? (LANES_OPTIONS.find(l => l.id === selectedLane)?.roleIndexes || [0])
    : [0, 1, 2, 3, 4];

  return (
    <div className="board grid gap-4">
      {/* Selector de Rota no Modo Lane */}
      {assistantMode === 'lane' && (
        <div className="hextech-panel rounded p-3 space-y-2 border border-[#00cfbc]/30 bg-[#091428]/90">
          <div className="flex items-center gap-2 font-mono-code text-[11px] text-[#00cfbc] uppercase tracking-wider font-semibold">
            <Compass size={14} /> Selecione a Rota em Análise:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            {LANES_OPTIONS.map((lane) => (
              <button
                key={lane.id}
                onClick={() => onSelectLane(lane.id)}
                className={`font-mono-code text-[11px] py-1.5 px-2 rounded cursor-pointer transition-all border text-center ${
                  selectedLane === lane.id
                    ? 'text-[#f0e6d2] bg-gradient-to-b from-[#0bc6e3]/20 to-[#091428] border-[#0bc6e3] shadow-[0_0_8px_rgba(11,198,227,0.3)] font-bold'
                    : 'text-[#a09b8c] bg-[#010a13]/60 border-[#c8aa6e]/20 hover:text-[#f0e6d2] hover:border-[#c8aa6e]/40'
                }`}
              >
                {lane.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lado Azul (Aliados) */}
      <div className="hextech-panel rounded overflow-hidden">
        <div className="font-rajdhani font-bold text-sm tracking-widest uppercase px-4 py-2.5 text-[#00cfbc] bg-gradient-to-r from-[#00cfbc]/20 via-[#063747]/40 to-transparent border-b border-[#00cfbc]/30 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#00cfbc] rotate-45 shadow-[0_0_8px_#00cfbc]" />
            <span>Lado Azul · Aliados</span>
          </div>
        </div>
        <div>
          {activeRoleIndexes.map((idx) => (
            <SlotRow
              key={`blue-${idx}`}
              side="blue"
              idx={idx}
              champ={blue[idx]}
              isActive={active.side === 'blue' && active.idx === idx}
              isYou={youIndex === idx}
              iconBase={iconBase}
              onSelectSlot={onSelectSlot}
              onSetYou={onSetYou}
              onRemoveChamp={onRemoveChamp}
            />
          ))}
        </div>
      </div>

      {/* Lado Vermelho (Inimigos) */}
      <div className="hextech-panel rounded overflow-hidden">
        <div className="font-rajdhani font-bold text-sm tracking-widest uppercase px-4 py-2.5 text-[#e84057] bg-gradient-to-r from-[#e84057]/20 via-[#5c1d24]/40 to-transparent border-b border-[#e84057]/30 flex items-center justify-between shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#e84057] rotate-45 shadow-[0_0_8px_#e84057]" />
            <span>Lado Vermelho · Inimigos</span>
          </div>
        </div>
        <div>
          {activeRoleIndexes.map((idx) => (
            <SlotRow
              key={`red-${idx}`}
              side="red"
              idx={idx}
              champ={red[idx]}
              isActive={active.side === 'red' && active.idx === idx}
              isYou={false}
              iconBase={iconBase}
              onSelectSlot={onSelectSlot}
              onSetYou={onSetYou}
              onRemoveChamp={onRemoveChamp}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
