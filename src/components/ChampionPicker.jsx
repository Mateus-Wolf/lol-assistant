import React from 'react';
import { Search, X } from 'lucide-react';
import { ROLES, getChampLanes } from '../constants/lanes';

export function ChampionPicker({
  champions,
  iconBase,
  active,
  activeChamp,
  pickedSet,
  search,
  laneFilter,
  roleFilter,
  onSearchChange,
  onLaneFilterChange,
  onRoleFilterChange,
  onAssignChampion,
  onRemoveChamp
}) {
  const sideName = active.side === 'blue' ? 'Azul' : 'Vermelho';
  const roleName = ROLES[active.idx];

  const laneOptions = ["TOPO", "SELVA", "MEIO", "ATIRAD.", "SUPORTE"];
  const classOptions = [
    { tag: "Fighter", label: "Lutador" },
    { tag: "Tank", label: "Tanque" },
    { tag: "Mage", label: "Mago" },
    { tag: "Assassin", label: "Assassino" },
    { tag: "Marksman", label: "Atirador" },
    { tag: "Support", label: "Suporte" }
  ];

  const q = search.trim().toLowerCase();
  const filteredChamps = champions.filter((c) => {
    const matchesSearch = !q || c.name.toLowerCase().includes(q);
    const matchesRole = !roleFilter || (c.tags || []).includes(roleFilter);
    const matchesLane = !laneFilter || getChampLanes(c).includes(laneFilter);
    return matchesSearch && matchesRole && matchesLane;
  });

  const filterKey = `${search}-${laneFilter}-${roleFilter}`;

  return (
    <div className="picker hextech-panel rounded-md p-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-mono-code text-[11px] tracking-wider text-[#a09b8c] uppercase font-semibold">
            Selecionar campeão
          </span>
          <span className="font-rajdhani font-bold text-sm text-[#f0e6d2]">
            ({sideName} · {roleName})
          </span>
          {activeChamp && (
            <button
              onClick={() => onRemoveChamp(active.side, active.idx)}
              className="font-mono-code text-[10px] text-[#e84057] border border-[#5c1d24] bg-[#e84057]/10 hover:bg-[#e84057]/25 px-2 py-0.5 rounded cursor-pointer transition-all duration-200 hover:scale-105"
            >
              Remover {activeChamp.name}
            </button>
          )}
        </div>

        {/* Campo de Busca */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09b8c]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar campeão por nome..."
            className="w-full bg-[#010a13] border border-[#c8aa6e]/30 focus:border-[#c8aa6e] focus:shadow-[0_0_12px_rgba(11,198,227,0.3)] text-[#f0e6d2] placeholder-[#5b5a56] text-sm rounded pl-8 pr-8 py-1.5 focus:outline-none transition-all duration-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] font-sans"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a09b8c] hover:text-[#f0e6d2] cursor-pointer transition-colors duration-150"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Seção de Filtros */}
      <div className="flex flex-col gap-2.5 mb-3.5 bg-[#010a13]/60 p-3 rounded border border-[#c8aa6e]/15">
        {/* Filtro por Lane */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-code text-[10px] text-[#c8aa6e] uppercase tracking-widest w-[54px] shrink-0 font-bold">
            Lane:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap flex-1">
            <button
              onClick={() => onLaneFilterChange(null)}
              className={`font-mono-code text-[10px] tracking-wider px-2.5 py-1 rounded border transition-all duration-150 cursor-pointer uppercase ${
                laneFilter === null
                  ? 'text-[#f0e6d2] border-[#c8aa6e] bg-gradient-to-b from-[#101e38] to-[#0a1428] font-bold shadow-[0_0_8px_rgba(200,170,110,0.3)] animate-chip-pop'
                  : 'text-[#a09b8c] border-[#c8aa6e]/20 hover:text-[#f0e6d2] hover:border-[#c8aa6e]/50 hover:scale-102'
              }`}
            >
              TODAS
            </button>
            {laneOptions.map((lane) => (
              <button
                key={lane}
                onClick={() => onLaneFilterChange(laneFilter === lane ? null : lane)}
                className={`font-mono-code text-[10px] tracking-wider px-2.5 py-1 rounded border transition-all duration-150 cursor-pointer uppercase ${
                  laneFilter === lane
                    ? 'text-[#f0e6d2] border-[#c8aa6e] bg-gradient-to-b from-[#101e38] to-[#0a1428] font-bold shadow-[0_0_8px_rgba(200,170,110,0.3)] animate-chip-pop'
                    : 'text-[#a09b8c] border-[#c8aa6e]/20 hover:text-[#f0e6d2] hover:border-[#c8aa6e]/50 hover:scale-102'
                }`}
              >
                {lane}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por Classe */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono-code text-[10px] text-[#c8aa6e] uppercase tracking-widest w-[54px] shrink-0 font-bold">
            Classe:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap flex-1">
            <button
              onClick={() => onRoleFilterChange(null)}
              className={`font-mono-code text-[10px] tracking-wider px-2.5 py-1 rounded border transition-all duration-150 cursor-pointer uppercase ${
                roleFilter === null
                  ? 'text-[#f0e6d2] border-[#c8aa6e] bg-gradient-to-b from-[#101e38] to-[#0a1428] font-bold shadow-[0_0_8px_rgba(200,170,110,0.3)] animate-chip-pop'
                  : 'text-[#a09b8c] border-[#c8aa6e]/20 hover:text-[#f0e6d2] hover:border-[#c8aa6e]/50 hover:scale-102'
              }`}
            >
              TODAS
            </button>
            {classOptions.map(({ tag, label }) => (
              <button
                key={tag}
                onClick={() => onRoleFilterChange(roleFilter === tag ? null : tag)}
                className={`font-mono-code text-[10px] tracking-wider px-2.5 py-1 rounded border transition-all duration-150 cursor-pointer uppercase ${
                  roleFilter === tag
                    ? 'text-[#f0e6d2] border-[#c8aa6e] bg-gradient-to-b from-[#101e38] to-[#0a1428] font-bold shadow-[0_0_8px_rgba(200,170,110,0.3)] animate-chip-pop'
                    : 'text-[#a09b8c] border-[#c8aa6e]/20 hover:text-[#f0e6d2] hover:border-[#c8aa6e]/50 hover:scale-102'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Champion Grid */}
      <div key={filterKey} className="grid grid-cols-[repeat(auto-fill,minmax(78px,1fr))] gap-2 overflow-y-auto max-h-[340px] pr-1 flex-1 transition-all duration-300">
        {filteredChamps.length === 0 ? (
          <div className="col-span-full text-center text-[#a09b8c] text-xs py-10 font-mono-code animate-champ-pop">
            Nenhum campeão encontrado para os filtros selecionados.
          </div>
        ) : (
          filteredChamps.map((c, index) => {
            const isPicked = pickedSet.has(c.id);
            const iconUrl = iconBase ? `${iconBase}${c.id}.png` : null;

            return (
              <div
                key={c.id}
                onClick={() => !isPicked && onAssignChampion(c)}
                title={isPicked ? `${c.name} já foi selecionado em outro slot` : c.name}
                style={{ animationDelay: `${Math.min(index * 12, 180)}ms` }}
                className={`flex flex-col items-center gap-1.5 p-1.5 rounded border transition-all duration-200 relative group animate-champ-pop ${
                  isPicked
                    ? 'opacity-30 grayscale cursor-not-allowed border-transparent'
                    : 'border-transparent hover:bg-[#101e38] hover:border-[#c8aa6e]/60 cursor-pointer hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.6)] active:scale-95'
                }`}
              >
                <div className="w-[48px] h-[48px] rounded border border-[#c8aa6e]/30 group-hover:border-[#c8aa6e] overflow-hidden bg-[#010a13] relative shadow-inner transition-colors duration-200">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={c.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold text-[#a09b8c]">
                      ?
                    </div>
                  )}
                </div>
                
                <span className="font-rajdhani font-semibold text-[11px] text-center text-[#a09b8c] group-hover:text-[#f0e6d2] leading-tight truncate max-w-full transition-colors duration-200">
                  {c.name}
                </span>

                {isPicked && (
                  <span className="absolute top-4 left-1/2 -translate-x-1/2 font-mono-code text-[7.5px] font-bold text-[#e84057] bg-[#010a13]/95 border border-[#5c1d24] px-1 py-0.5 rounded tracking-widest pointer-events-none whitespace-nowrap shadow-lg">
                    INDISPONÍVEL
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
