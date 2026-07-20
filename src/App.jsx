import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDDragonData } from './services/ddragon';
import { Header } from './components/Header';
import { DraftBoard } from './components/DraftBoard';
import { ChampionPicker } from './components/ChampionPicker';
import { TacticalReport } from './components/TacticalReport';

const LANE_INDEXES = {
  TOPO: [0],
  SELVA: [1],
  MEIO: [2],
  BOT: [3, 4]
};

export default function App() {
  const [blue, setBlue] = useState(new Array(5).fill(null));
  const [red, setRed] = useState(new Array(5).fill(null));
  const [active, setActive] = useState({ side: 'blue', idx: 0 });
  const [youIndex, setYouIndex] = useState(0);
  
  const [search, setSearch] = useState('');
  const [laneFilter, setLaneFilter] = useState(null);
  const [roleFilter, setRoleFilter] = useState(null);
  
  const [assistantMode, setAssistantMode] = useState('comp'); // 'comp' | 'lane'
  const [selectedLane, setSelectedLane] = useState('TOPO'); // 'TOPO' | 'SELVA' | 'MEIO' | 'BOT'
  const [view, setView] = useState('draft');

  // React Query for Data Dragon data
  const { data: ddragon, isLoading, error } = useQuery({
    queryKey: ['ddragon-data-v3'],
    queryFn: fetchDDragonData,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24
  });

  const champions = ddragon?.champions || [];
  const version = ddragon?.version || '';
  const iconBase = ddragon?.iconBase || null;
  const items = ddragon?.items || {};
  const isOffline = ddragon?.isOffline ?? false;

  // Track picked champion IDs in other slots
  const getPickedChampIds = (excludeSide, excludeIdx) => {
    const ids = new Set();
    blue.forEach((c, i) => {
      if (c && !(excludeSide === 'blue' && excludeIdx === i)) ids.add(c.id);
    });
    red.forEach((c, i) => {
      if (c && !(excludeSide === 'red' && excludeIdx === i)) ids.add(c.id);
    });
    return ids;
  };

  const pickedSet = getPickedChampIds(active.side, active.idx);
  const activeChamp = active.side === 'blue' ? blue[active.idx] : red[active.idx];

  // Calculate filled count and readiness based on assistantMode
  const filledCountTotal = blue.filter(Boolean).length + red.filter(Boolean).length;
  
  const activeLaneIndexes = LANE_INDEXES[selectedLane] || [0];
  const filledCountLane = activeLaneIndexes.reduce(
    (acc, idx) => acc + (blue[idx] ? 1 : 0) + (red[idx] ? 1 : 0),
    0
  );

  const requiredCount = assistantMode === 'comp'
    ? 10
    : (selectedLane === 'BOT' ? 4 : 2);

  const currentFilledCount = assistantMode === 'comp' ? filledCountTotal : filledCountLane;
  const isReadyToReport = currentFilledCount >= requiredCount;

  const handleSelectSlot = (side, idx) => {
    setActive({ side, idx });
  };

  const handleSelectLane = (lane) => {
    setSelectedLane(lane);
    const indexes = LANE_INDEXES[lane] || [0];
    setActive({ side: 'blue', idx: indexes[0] });
    setYouIndex(indexes[0]);
  };

  const handleChangeAssistantMode = (mode) => {
    setAssistantMode(mode);
    if (mode === 'lane') {
      const indexes = LANE_INDEXES[selectedLane] || [0];
      setActive({ side: 'blue', idx: indexes[0] });
      setYouIndex(indexes[0]);
    } else {
      setActive({ side: 'blue', idx: 0 });
      setYouIndex(0);
    }
  };

  const handleRemoveChamp = (side, idx) => {
    if (side === 'blue') {
      const next = [...blue];
      next[idx] = null;
      setBlue(next);
    } else {
      const next = [...red];
      next[idx] = null;
      setRed(next);
    }
  };

  const handleAssignChampion = (champ) => {
    if (pickedSet.has(champ.id)) return;

    const { side, idx } = active;
    let newBlue = [...blue];
    let newRed = [...red];

    if (side === 'blue') {
      newBlue[idx] = champ;
      setBlue(newBlue);
    } else {
      newRed[idx] = champ;
      setRed(newRed);
    }

    // Auto advance to next slot based on active mode
    const availableIndexes = assistantMode === 'lane' ? activeLaneIndexes : [0, 1, 2, 3, 4];
    const currentSideList = side === 'blue' ? newBlue : newRed;
    const otherSideList = side === 'blue' ? newRed : newBlue;
    const otherSide = side === 'blue' ? 'red' : 'blue';

    const nextSameSideIdx = availableIndexes.find((i) => i > idx && !currentSideList[i]);
    if (nextSameSideIdx !== undefined) {
      setActive({ side, idx: nextSameSideIdx });
    } else {
      const nextOtherSideIdx = availableIndexes.find((i) => !otherSideList[i]);
      if (nextOtherSideIdx !== undefined) {
        setActive({ side: otherSide, idx: nextOtherSideIdx });
      }
    }
  };

  return (
    <div className={`mx-auto px-5 py-7 pb-16 transition-all duration-300 ${
      view === 'report' ? 'max-w-[1440px]' : 'max-w-[1180px]'
    }`}>
      <Header
        version={version}
        isOffline={isOffline}
        assistantMode={assistantMode}
        onChangeAssistantMode={handleChangeAssistantMode}
      />

      {view === 'draft' ? (
        <div className="space-y-5">
          {isLoading ? (
            <div className="text-center py-16 font-mono-code text-xs text-[#a09b8c]">
              Conectando ao Data Dragon...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] items-start gap-5">
              {/* Draft Board */}
              <DraftBoard
                blue={blue}
                red={red}
                active={active}
                youIndex={youIndex}
                iconBase={iconBase}
                assistantMode={assistantMode}
                selectedLane={selectedLane}
                onSelectLane={handleSelectLane}
                onSelectSlot={handleSelectSlot}
                onSetYou={setYouIndex}
                onRemoveChamp={handleRemoveChamp}
              />

              {/* Champion Picker */}
              <ChampionPicker
                champions={champions}
                iconBase={iconBase}
                active={active}
                activeChamp={activeChamp}
                pickedSet={pickedSet}
                search={search}
                laneFilter={laneFilter}
                roleFilter={roleFilter}
                onSearchChange={setSearch}
                onLaneFilterChange={setLaneFilter}
                onRoleFilterChange={setRoleFilter}
                onAssignChampion={handleAssignChampion}
                onRemoveChamp={handleRemoveChamp}
              />
            </div>
          )}

          {/* CTA Row */}
          <div className="flex items-center justify-between gap-4 pt-3 flex-wrap border-t border-[#c8aa6e]/20">
            <span className="font-mono-code text-xs text-[#a09b8c]">
              <b className="text-[#f0e6d2] font-bold">{currentFilledCount}</b>/{requiredCount} campeões selecionados
              {assistantMode === 'lane' && (
                <span className="text-[#00cfbc] font-semibold ml-2">
                  (Modo Lane — {selectedLane === 'BOT' ? 'Bot Lane 2v2' : selectedLane})
                </span>
              )}
            </span>

            <button
              onClick={() => setView('report')}
              disabled={!isReadyToReport}
              className="lol-lockin-btn px-8 py-3.5 rounded text-base uppercase tracking-widest cursor-pointer"
            >
              {assistantMode === 'lane' ? `Leitura Tática: ${selectedLane}` : 'Gerar Leitura Tática'}
            </button>
          </div>
        </div>
      ) : (
        <TacticalReport
          blue={blue}
          red={red}
          youIndex={youIndex}
          version={version}
          iconBase={iconBase}
          items={items}
          assistantMode={assistantMode}
          selectedLane={selectedLane}
          onBack={() => setView('draft')}
        />
      )}
    </div>
  );
}
