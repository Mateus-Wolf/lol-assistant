import React from 'react';
import { ROLES } from '../constants/lanes';

export function SlotRow({
  side,
  idx,
  champ,
  isActive,
  isYou,
  iconBase,
  onSelectSlot,
  onSetYou,
  onRemoveChamp
}) {
  const roleName = ROLES[idx];
  const iconUrl = champ && iconBase ? `${iconBase}${champ.id}.png` : null;

  return (
    <div
      onClick={() => onSelectSlot(side, idx)}
      className={`flex items-center gap-3 px-3.5 py-2.5 border-b border-[#c8aa6e]/15 last:border-b-0 cursor-pointer transition-all duration-200 relative ${
        isActive
          ? 'bg-[#101e38] shadow-[inset_4px_0_0_#c8aa6e,0_0_15px_rgba(200,170,110,0.15)] border-y border-y-[#c8aa6e]/40 z-10'
          : 'hover:bg-[#0a1428]/80'
      }`}
    >
      {/* Role tag */}
      <div className="font-mono-code text-[10px] text-[#a09b8c] w-[50px] shrink-0 tracking-widest font-semibold uppercase">
        {roleName}
      </div>

      {/* Champion portrait icon */}
      <div
        key={champ ? champ.id : 'empty'}
        className={`relative w-9 h-9 rounded border shrink-0 flex items-center justify-center transition-all duration-300 ${
          champ
            ? 'border-[#c8aa6e]/60 bg-[#091428] shadow-[0_2px_8px_rgba(0,0,0,0.6)] animate-slot-assign'
            : 'border-[#c8aa6e]/20 bg-[#010a13] text-[#5b5a56] transition-transform duration-200'
        }`}
      >
        {champ ? (
          iconUrl ? (
            <img
              src={iconUrl}
              alt={champ.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full rounded object-cover transition-opacity duration-300 animate-fadeIn"
            />
          ) : (
            <span className="font-rajdhani font-bold text-xs text-[#f0e6d2]">
              {champ.name.substring(0, 2)}
            </span>
          )
        ) : (
          <span className="text-sm font-light text-[#5b5a56]">+</span>
        )}
      </div>

      {/* Champion Name */}
      <div
        className={`font-rajdhani font-semibold text-sm flex-1 truncate tracking-wide transition-all duration-200 ${
          champ ? 'text-[#f0e6d2] translate-x-0 opacity-100' : 'text-[#5b5a56] italic font-normal'
        }`}
      >
        {champ ? champ.name : 'Vazio'}
      </div>

      {/* "VOCÊ" tag */}
      {side === 'blue' && (
        isYou ? (
          <span className="font-mono-code text-[9px] tracking-wider text-[#010a13] bg-gradient-to-b from-[#f0e6d2] to-[#c8aa6e] px-2 py-0.5 rounded font-extrabold shadow-[0_0_8px_rgba(200,170,110,0.3)] shrink-0 border border-[#f0e6d2] animate-chip-pop">
            VOCÊ
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetYou(idx);
            }}
            className="font-mono-code text-[9px] text-[#a09b8c] border border-[#c8aa6e]/30 rounded px-2 py-0.5 bg-transparent hover:text-[#f0e6d2] hover:border-[#c8aa6e] hover:bg-[#c8aa6e]/10 cursor-pointer shrink-0 transition-all duration-200 hover:scale-105"
          >
            marcar você
          </button>
        )
      )}

      {/* Remove button */}
      {champ && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveChamp(side, idx);
          }}
          title="Excluir campeão do slot"
          className="text-[#a09b8c] hover:text-[#e84057] hover:bg-[#e84057]/20 text-base font-bold w-5 h-5 flex items-center justify-center rounded cursor-pointer transition-all duration-200 shrink-0 ml-1 border border-transparent hover:border-[#e84057]/40 hover:scale-110 active:scale-95"
        >
          ×
        </button>
      )}
    </div>
  );
}
