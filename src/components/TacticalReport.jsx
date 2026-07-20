import React, { useMemo } from 'react';
import { ArrowLeft, Shield, Swords, Zap, ChevronRight, AlertTriangle, CheckCircle, Info, XCircle, TrendingUp, Sparkles, Target } from 'lucide-react';
import { ROLES } from '../constants/lanes';
import { generateTacticalReport } from '../services/tacticalAnalysis';
import { getItemIconUrl } from '../services/ddragon';

// ─── Utilitários ──────────────────────────────────────────────────────────────

function SourceBadge({ source }) {
  const isLive = source === 'Data Dragon' || source === 'Community Dragon';
  return (
    <span className={`font-mono-code text-[9.5px] border px-2 py-0.5 rounded tracking-widest ${
      isLive ? 'text-[#0bc6e3] border-[#0bc6e3]/40 bg-[#0bc6e3]/10' : 'text-[#e0a94e] border-[#e0a94e]/40 bg-[#e0a94e]/10'
    }`}>{source}</span>
  );
}

function DamageBar({ adPct, apPct, mixedPct }) {
  return (
    <div className="space-y-1.5">
      <div className="flex h-3 rounded overflow-hidden gap-0.5">
        {adPct > 0 && <div style={{ width:`${adPct}%` }} className="bg-[#e89944] transition-all duration-700" title={`${adPct}% Dano Físico`} />}
        {mixedPct > 0 && <div style={{ width:`${mixedPct}%` }} className="bg-[#c8a96e] transition-all duration-700" title={`${mixedPct}% Dano Misto`} />}
        {apPct > 0 && <div style={{ width:`${apPct}%` }} className="bg-[#5f9fd4] transition-all duration-700" title={`${apPct}% Dano Mágico`} />}
      </div>
      <div className="flex gap-3 font-mono-code text-[9px] text-[#a09b8c]">
        {adPct > 0    && <span><span className="text-[#e89944]">■</span> {adPct}% Físico</span>}
        {mixedPct > 0 && <span><span className="text-[#c8a96e]">■</span> {mixedPct}% Misto</span>}
        {apPct > 0    && <span><span className="text-[#5f9fd4]">■</span> {apPct}% Mágico</span>}
      </div>
    </div>
  );
}

function StrategyNote({ note }) {
  const cfg = {
    warning: { icon:AlertTriangle, color:'#e0a94e', bg:'bg-[#e0a94e]/10', border:'border-[#e0a94e]/25' },
    danger:  { icon:XCircle,       color:'#e84057', bg:'bg-[#e84057]/10', border:'border-[#e84057]/25' },
    success: { icon:CheckCircle,   color:'#00cfbc', bg:'bg-[#00cfbc]/10', border:'border-[#00cfbc]/25' },
    info:    { icon:Info,          color:'#5f9fd4', bg:'bg-[#5f9fd4]/10', border:'border-[#5f9fd4]/25' },
  }[note.type] || { icon:Info, color:'#5f9fd4', bg:'bg-[#5f9fd4]/10', border:'border-[#5f9fd4]/25' };
  const Icon = cfg.icon;
  return (
    <div className={`rounded p-3 border ${cfg.bg} ${cfg.border} flex gap-3`}>
      <Icon size={15} color={cfg.color} className="shrink-0 mt-0.5" />
      <div>
        <p className="font-rajdhani font-bold text-sm text-[#f0e6d2] leading-tight">{note.title}</p>
        <p className="font-mono-code text-[11px] text-[#a09b8c] mt-0.5 leading-relaxed">{note.text}</p>
      </div>
    </div>
  );
}

function ItemCard({ item, version }) {
  const iconUrl = version && item ? getItemIconUrl(version, item.image) : null;
  return (
    <div className="flex items-center gap-2.5 bg-[#010a13] border border-[#c8aa6e]/25 rounded px-3 py-2 hover:border-[#c8aa6e]/60 transition-colors duration-200 group">
      {iconUrl ? (
        <img src={iconUrl} alt={item.name} loading="lazy" decoding="async"
          className="w-9 h-9 rounded object-cover border border-[#c8aa6e]/30 group-hover:border-[#c8aa6e] shrink-0 transition-colors duration-200" />
      ) : (
        <div className="w-9 h-9 rounded bg-[#1a1a2e] border border-[#c8aa6e]/20 shrink-0" />
      )}
      <div className="min-w-0">
        <p className="font-rajdhani font-bold text-[13px] text-[#f0e6d2] leading-tight truncate">{item.name}</p>
        {item.plaintext && <p className="font-mono-code text-[10px] text-[#a09b8c] leading-tight truncate">{item.plaintext}</p>}
        {item.gold?.total > 0 && <p className="font-mono-code text-[10px] text-[#e0a94e]">{item.gold.total.toLocaleString('pt-BR')} ouro</p>}
      </div>
    </div>
  );
}

function MatchupBadge({ advantage }) {
  if (advantage === 'advantage')
    return <span className="text-[10px] font-mono-code font-bold text-[#00cfbc] bg-[#00cfbc]/15 border border-[#00cfbc]/30 px-1.5 py-0.5 rounded shrink-0">VANTAGEM</span>;
  if (advantage === 'disadvantage')
    return <span className="text-[10px] font-mono-code font-bold text-[#e84057] bg-[#e84057]/15 border border-[#e84057]/30 px-1.5 py-0.5 rounded shrink-0">DESVANTAGEM</span>;
  return <span className="text-[10px] font-mono-code font-bold text-[#a09b8c] bg-[#a09b8c]/10 border border-[#a09b8c]/20 px-1.5 py-0.5 rounded shrink-0">EQUILIBRADO</span>;
}

function PowerRatingBar({ value, color }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className={`w-4 h-1.5 rounded-sm transition-all duration-300 ${i <= value ? color : 'bg-[#1e2328]'}`} />
      ))}
    </div>
  );
}

function PowerSpikePill({ phase }) {
  const cfg = {
    early: { label:'EARLY',   color:'text-[#e84057] bg-[#e84057]/15 border-[#e84057]/30' },
    mid:   { label:'MID',     color:'text-[#e0a94e] bg-[#e0a94e]/15 border-[#e0a94e]/30' },
    late:  { label:'LATE',    color:'text-[#00cfbc] bg-[#00cfbc]/15 border-[#00cfbc]/30' },
  }[phase] || { label:'MID', color:'text-[#e0a94e] bg-[#e0a94e]/15 border-[#e0a94e]/30' };
  return (
    <span className={`font-mono-code text-[9px] font-bold border px-1.5 py-0.5 rounded tracking-widest ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}

function SynergyBadge({ strength }) {
  const cfg = {
    S: 'text-[#f0e6d2] bg-[#c8aa6e]/30 border-[#c8aa6e]/60',
    A: 'text-[#00cfbc] bg-[#00cfbc]/15 border-[#00cfbc]/40',
    B: 'text-[#5f9fd4] bg-[#5f9fd4]/10 border-[#5f9fd4]/30',
  }[strength] || 'text-[#a09b8c] bg-[#a09b8c]/10 border-[#a09b8c]/20';
  return (
    <span className={`font-mono-code text-[10px] font-bold border px-1.5 py-0.5 rounded shrink-0 ${cfg}`}>
      {strength}
    </span>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────────

export function TacticalReport({
  blue,
  red,
  youIndex,
  version,
  iconBase,
  items,
  assistantMode = 'comp',
  selectedLane = 'TOPO',
  onBack
}) {
  const report = useMemo(
    () => generateTacticalReport(blue, red, youIndex, items || {}),
    [blue, red, youIndex, items]
  );

  const hasItems  = Object.keys(items || {}).length > 0;

  // Filter matchups and power spikes based on assistant mode
  const targetRoles = assistantMode === 'lane'
    ? (selectedLane === 'BOT' ? ['ATIRAD.', 'SUPORTE'] : [selectedLane])
    : null;

  const filteredMatchups = targetRoles
    ? report.matchups.filter(m => targetRoles.includes(m.role))
    : report.matchups;

  const filteredPowerSpikes = targetRoles
    ? report.powerSpikes.filter(p => targetRoles.includes(p.role))
    : report.powerSpikes;

  return (
    <div className="space-y-5">
      {/* Voltar e Status */}
      <div className="flex items-center justify-between gap-4 border-b border-[#c8aa6e]/20 pb-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hextech-button-gold font-mono-code text-xs px-4 py-2 rounded cursor-pointer flex items-center gap-2">
            <ArrowLeft size={14} /> Voltar ao draft
          </button>
          {assistantMode === 'lane' && (
            <span className="font-mono-code text-xs text-[#00cfbc] bg-[#00cfbc]/10 border border-[#00cfbc]/30 px-3 py-1.5 rounded flex items-center gap-1.5 font-bold">
              <Target size={13} />
              Análise Focada: {selectedLane === 'BOT' ? 'Bot Lane (2v2)' : selectedLane}
            </span>
          )}
        </div>
        
        <div className="font-mono-code text-[10px] text-[#a09b8c] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00cfbc] inline-block animate-pulse" />
          Análise baseada em dados reais · Patch {version || '—'}
        </div>
      </div>

      {/* Grid de 2 Colunas: Análise à Esquerda / Dados Táticos e Builds à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ── COLUNA DA ESQUERDA: ANÁLISES TÁTICAS ──────────────────────────────── */}
        <div className="lg:col-span-7 xl:col-span-7 space-y-5">

          {/* ── Alertas Estratégicos ───────────────────────────────────────────── */}
          {report.strategyNotes.length > 0 && (() => {
            const positiveNotes = report.strategyNotes.filter(n => n.category === 'positive' || n.type === 'success');
            const attentionNotes = report.strategyNotes.filter(n => n.category === 'attention' || n.type === 'warning' || n.type === 'info');
            const negativeNotes = report.strategyNotes.filter(n => n.category === 'negative' || n.type === 'danger');

            return (
              <div className="hextech-panel rounded-md p-5 space-y-4">
                <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-1 flex items-center gap-3">
                  Alertas Estratégicos <SourceBadge source="Data Dragon" />
                </h3>

                {/* ── Pontos Positivos ── */}
                {positiveNotes.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono-code text-[11px] font-bold text-[#00cfbc] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#00cfbc]/20 pb-1">
                      <CheckCircle size={14} /> Pontos Positivos ({positiveNotes.length})
                    </div>
                    <div className="space-y-2">
                      {positiveNotes.map((note, i) => <StrategyNote key={i} note={note} />)}
                    </div>
                  </div>
                )}

                {/* ── Pontos de Atenção ── */}
                {attentionNotes.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono-code text-[11px] font-bold text-[#e0a94e] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#e0a94e]/20 pb-1">
                      <AlertTriangle size={14} /> Pontos de Atenção ({attentionNotes.length})
                    </div>
                    <div className="space-y-2">
                      {attentionNotes.map((note, i) => <StrategyNote key={i} note={note} />)}
                    </div>
                  </div>
                )}

                {/* ── Pontos Negativos ── */}
                {negativeNotes.length > 0 && (
                  <div className="space-y-2">
                    <div className="font-mono-code text-[11px] font-bold text-[#e84057] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#e84057]/20 pb-1">
                      <XCircle size={14} /> Pontos Negativos ({negativeNotes.length})
                    </div>
                    <div className="space-y-2">
                      {negativeNotes.map((note, i) => <StrategyNote key={i} note={note} />)}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ── Matchups de Rota ─────────────────────────────────────────────────── */}
          <div className="hextech-panel rounded-md p-5">
            <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-4 flex items-center gap-3">
              {assistantMode === 'lane' ? `Matchup da Rota (${selectedLane})` : 'Matchups de Rota'}
              <SourceBadge source="Data Dragon" />
            </h3>
            <div className="space-y-3">
              {filteredMatchups.map(({ role, ally, enemy, analysis }) => {
                const allyUrl  = ally  && iconBase ? `${iconBase}${ally.id}.png`  : null;
                const enemyUrl = enemy && iconBase ? `${iconBase}${enemy.id}.png` : null;
                const isYourLane = ROLES.indexOf(role) === youIndex;
                return (
                  <div key={role} className={`rounded border transition-all duration-200 p-3 ${isYourLane ? 'border-[#c8aa6e]/50 bg-[#c8aa6e]/5' : 'border-[#c8aa6e]/10'}`}>
                    <div className="flex items-start gap-3 flex-wrap">
                      <div className="font-mono-code text-[10px] text-[#a09b8c] w-[56px] shrink-0 uppercase tracking-wider pt-1">
                        {role}
                        {isYourLane && <span className="block text-[#c8aa6e] text-[8px]">VOCÊ</span>}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 pt-1">
                        {allyUrl ? (
                          <img src={allyUrl} alt={ally?.name} loading="lazy" decoding="async" className="w-9 h-9 rounded border border-[#00cfbc]/40 object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded bg-[#010a13] border border-[#c8aa6e]/20 flex items-center justify-center text-[#a09b8c] text-xs">?</div>
                        )}
                        <Swords size={12} className="text-[#5b5a56]" />
                        {enemyUrl ? (
                          <img src={enemyUrl} alt={enemy?.name} loading="lazy" decoding="async" className="w-9 h-9 rounded border border-[#e84057]/40 object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded bg-[#010a13] border border-[#c8aa6e]/20 flex items-center justify-center text-[#a09b8c] text-xs">?</div>
                        )}
                      </div>

                      <div className="flex-1 min-w-[180px]">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono-code text-[11px] text-[#cdbe91]">
                            <b className="text-[#f0e6d2]">{ally?.name || 'Vazio'}</b>
                            <span className="text-[#5b5a56] mx-1">vs</span>
                            <b className="text-[#f0e6d2]">{enemy?.name || 'Vazio'}</b>
                          </span>
                          {ally && enemy && <MatchupBadge advantage={analysis.allyAdvantage} />}
                        </div>
                        <p className="font-mono-code text-[10px] text-[#a09b8c] leading-relaxed mb-1">{analysis.description}</p>
                        {analysis.tips.map((tip, ti) => (
                          <p key={ti} className="font-mono-code text-[10px] text-[#c8aa6e]/70 leading-relaxed">
                            <ChevronRight size={9} className="inline mr-0.5" />{tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Itens Recomendados ─────────────────────────────────────────────── */}
          {report.you && (
            <div className="hextech-panel rounded-md p-5">
              <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-1 flex items-center gap-3 flex-wrap">
                Build Recomendada — {report.you.name}
                <SourceBadge source={hasItems ? 'Data Dragon' : 'offline'} />
              </h3>

              {/* Badge de fonte */}
              <p className="font-mono-code text-[10px] text-[#a09b8c] mb-4">
                {report.itemRecommendations?.hasSpecificBuild
                  ? `Build específica para ${report.you.name} · ajustada para o time inimigo`
                  : `Build genérica por classe — ${report.you.name} não está no banco de dados`}
              </p>

              {!hasItems ? (
                <p className="font-mono-code text-[11px] text-[#a09b8c]">
                  Itens indisponíveis (modo offline). Conecte-se à internet para ver os itens do patch atual.
                </p>
              ) : (
                <div className="space-y-4">
                  {/* ── Core Build ── */}
                  {(report.itemRecommendations?.core || []).length > 0 && (
                    <div>
                      <div className="font-mono-code text-[10px] text-[#c8aa6e] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#c8aa6e] rounded-full" />
                        Core Build — Itens principais
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {report.itemRecommendations.core.map((item) => (
                          <ItemCard key={item.id} item={item} version={version} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── Boots ── */}
                  {report.itemRecommendations?.boots && (
                    <div>
                      <div className="font-mono-code text-[10px] text-[#5f9fd4] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#5f9fd4] rounded-full" />
                        Botas
                        {report.enemyCC?.count >= 3 && (
                          <span className="text-[#5b5a56] normal-case tracking-normal">— vs CC pesado inimigo</span>
                        )}
                      </div>
                      <div>
                        <ItemCard item={report.itemRecommendations.boots} version={version} />
                      </div>
                    </div>
                  )}

                  {/* ── Situacionais ── */}
                  {(report.itemRecommendations?.situational || []).length > 0 && (
                    <div>
                      <div className="font-mono-code text-[10px] uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          report.enemyDamage?.dominance === 'ad' ? 'bg-[#e89944]' :
                          report.enemyDamage?.dominance === 'ap' ? 'bg-[#5f9fd4]' :
                          'bg-[#a09b8c]'
                        }`} />
                        <span className={
                          report.enemyDamage?.dominance === 'ad' ? 'text-[#e89944]' :
                          report.enemyDamage?.dominance === 'ap' ? 'text-[#5f9fd4]' :
                          'text-[#a09b8c]'
                        }>
                          Itens Situacionais
                        </span>
                        <span className="text-[#5b5a56] normal-case tracking-normal">
                          — vs {
                            report.enemyDamage?.dominance === 'ad' ? 'time físico' :
                            report.enemyDamage?.dominance === 'ap' ? 'time mágico' :
                            'time balanceado'
                          }
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {report.itemRecommendations.situational.map((item) => (
                          <ItemCard key={item.id} item={item} version={version} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="font-mono-code text-[10px] text-[#a09b8c] flex items-center gap-2 mt-4 pt-3 border-t border-dashed border-[#c8aa6e]/20">
                <span className="w-2 h-2 border border-[#0bc6e3] bg-[#0bc6e3] shrink-0" />
                Data Dragon · Itens reais do patch {version || '—'}
              </div>
            </div>
          )}

          {/* ── Sinergias ────────────────────────────────────────────────────────── */}
          {(report.allySynergies.length > 0 || report.enemySynergies.length > 0) && (
            <div className="hextech-panel rounded-md p-5">
              <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-4 flex items-center gap-3">
                <Sparkles size={18} className="text-[#c8aa6e]" />
                Sinergias Detectadas
                <SourceBadge source="Data Dragon" />
              </h3>

              {report.allySynergies.length > 0 && (
                <div className="mb-4">
                  <div className="font-mono-code text-[10px] text-[#00cfbc] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#00cfbc] rounded-full" /> Seu Time
                  </div>
                  <div className="space-y-2">
                    {report.allySynergies.map((syn, i) => (
                      <div key={i} className="flex items-start gap-3 bg-[#00cfbc]/5 border border-[#00cfbc]/20 rounded p-3">
                        <SynergyBadge strength={syn.strength} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="font-rajdhani font-bold text-sm text-[#f0e6d2]">{syn.name}</span>
                            <span className="font-mono-code text-[9px] text-[#00cfbc] bg-[#00cfbc]/10 border border-[#00cfbc]/20 px-1.5 py-0.5 rounded">
                              {syn.champions.join(' + ')}
                            </span>
                          </div>
                          <p className="font-mono-code text-[10px] text-[#a09b8c] leading-relaxed">{syn.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {report.enemySynergies.length > 0 && (
                <div>
                  <div className="font-mono-code text-[10px] text-[#e84057] uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#e84057] rounded-full" /> Time Inimigo — Cuidado
                  </div>
                  <div className="space-y-2">
                    {report.enemySynergies.map((syn, i) => (
                      <div key={i} className="flex items-start gap-3 bg-[#e84057]/5 border border-[#e84057]/20 rounded p-3">
                        <SynergyBadge strength={syn.strength} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                            <span className="font-rajdhani font-bold text-sm text-[#f0e6d2]">{syn.name}</span>
                            <span className="font-mono-code text-[9px] text-[#e84057] bg-[#e84057]/10 border border-[#e84057]/20 px-1.5 py-0.5 rounded">
                              {syn.champions.join(' + ')}
                            </span>
                          </div>
                          <p className="font-mono-code text-[10px] text-[#a09b8c] leading-relaxed">{syn.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>


        {/* ── COLUNA DA DIREITA: DADOS TÁTICOS E BUILDS ──────────────────────────── */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-5">

          {/* ── Perfil de Dano ──────────────────────────────────────────────────── */}
          <div className="hextech-panel rounded-md p-5">
            <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-4 flex items-center gap-3">
              Perfil de Dano <SourceBadge source="Data Dragon" />
            </h3>
            <div className="space-y-5">
              <div className="bg-[#010a13]/50 p-3 rounded border border-[#00cfbc]/20">
                <div className="font-mono-code text-[10px] text-[#00cfbc] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#00cfbc] rounded-full" /> Seu Time (Azul)
                </div>
                <DamageBar adPct={report.allyDamage.adPercent} apPct={report.allyDamage.apPercent} mixedPct={report.allyDamage.mixedPercent} />
                <div className="mt-2.5 space-y-1 font-mono-code text-[11px] text-[#a09b8c]">
                  <div className="flex items-center gap-2"><Shield size={11} className="text-[#00cfbc]" /> Frontline: <span className="text-[#f0e6d2]">{report.allyFrontline.label}</span></div>
                  <div className="flex items-center gap-2"><Zap size={11} className="text-[#e0a94e]" /> CC: <span className="text-[#f0e6d2]">{report.allyCC.label}</span></div>
                </div>
              </div>

              <div className="bg-[#010a13]/50 p-3 rounded border border-[#e84057]/20">
                <div className="font-mono-code text-[10px] text-[#e84057] uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#e84057] rounded-full" /> Time Inimigo (Vermelho)
                </div>
                <DamageBar adPct={report.enemyDamage.adPercent} apPct={report.enemyDamage.apPercent} mixedPct={report.enemyDamage.mixedPercent} />
                <div className="mt-2.5 space-y-1 font-mono-code text-[11px] text-[#a09b8c]">
                  <div className="flex items-center gap-2"><Shield size={11} className="text-[#e84057]" /> Frontline: <span className="text-[#f0e6d2]">{report.enemyFrontline.label}</span></div>
                  <div className="flex items-center gap-2"><Zap size={11} className="text-[#e0a94e]" /> CC: <span className="text-[#f0e6d2]">{report.enemyCC.label}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Power Spikes ─────────────────────────────────────────────────────── */}
          <div className="hextech-panel rounded-md p-5">
            <h3 className="font-rajdhani font-bold text-xl uppercase tracking-wider text-[#f0e6d2] mb-4 flex items-center gap-3">
              <TrendingUp size={18} className="text-[#e0a94e]" />
              {assistantMode === 'lane' ? `Power Spikes — Rota ${selectedLane}` : 'Power Spikes — Seu Time'}
              <SourceBadge source="Data Dragon" />
            </h3>

            <div className="space-y-3">
              {filteredPowerSpikes.map(({ role, champ, profile, phase }) => {
                if (!champ || !profile) {
                  return (
                    <div key={role} className="flex items-center gap-3 py-2 border-b border-[#c8aa6e]/10 last:border-0 opacity-40">
                      <div className="font-mono-code text-[10px] text-[#a09b8c] w-[60px] shrink-0 uppercase tracking-wider">{role}</div>
                      <span className="font-mono-code text-[11px] text-[#5b5a56] italic">Slot vazio</span>
                    </div>
                  );
                }
                const champUrl = iconBase ? `${iconBase}${champ.id}.png` : null;
                const roleIdx  = ROLES.indexOf(role);
                const isYou    = roleIdx === youIndex;
                return (
                  <div key={role} className={`rounded border p-3 transition-all duration-200 ${isYou ? 'border-[#c8aa6e]/40 bg-[#c8aa6e]/5' : 'border-[#c8aa6e]/10'}`}>
                    <div className="flex items-start gap-3 flex-wrap">
                      {/* Role + ícone */}
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="font-mono-code text-[10px] text-[#a09b8c] w-[56px] uppercase tracking-wider">
                          {role}
                          {isYou && <span className="block text-[#c8aa6e] text-[8px]">VOCÊ</span>}
                        </div>
                        {champUrl ? (
                          <img src={champUrl} alt={champ.name} loading="lazy" decoding="async"
                            className="w-9 h-9 rounded border border-[#c8aa6e]/40 object-cover" />
                        ) : (
                          <div className="w-9 h-9 rounded bg-[#010a13] border border-[#c8aa6e]/20" />
                        )}
                      </div>

                      {/* Dados do power spike */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="font-rajdhani font-bold text-sm text-[#f0e6d2]">{champ.name}</span>
                          <PowerSpikePill phase={phase} />
                          <span className="font-mono-code text-[10px] text-[#c8aa6e]">🕐 {profile.spike}</span>
                        </div>

                        {/* Barras Early / Mid / Late */}
                        <div className="grid grid-cols-3 gap-2 mb-1.5">
                          <div>
                            <div className="font-mono-code text-[9px] text-[#a09b8c] mb-0.5">EARLY</div>
                            <PowerRatingBar value={profile.early} color="bg-[#e84057]" />
                          </div>
                          <div>
                            <div className="font-mono-code text-[9px] text-[#a09b8c] mb-0.5">MID</div>
                            <PowerRatingBar value={profile.mid} color="bg-[#e0a94e]" />
                          </div>
                          <div>
                            <div className="font-mono-code text-[9px] text-[#a09b8c] mb-0.5">LATE</div>
                            <PowerRatingBar value={profile.late} color="bg-[#00cfbc]" />
                          </div>
                        </div>

                        <p className="font-mono-code text-[10px] text-[#a09b8c] leading-relaxed">
                          {profile.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Análise de IA — Preparada ──────────────────────────────────────── */}
          <div className="hextech-panel rounded-md p-5 border border-dashed border-[#c8aa6e]/15 opacity-60">
            <h3 className="font-rajdhani font-bold text-lg uppercase tracking-wider text-[#5b5a56] mb-1 flex items-center gap-3">
              Análise de IA
              <span className="font-mono-code text-[9.5px] text-[#5b5a56] border border-[#5b5a56]/30 bg-[#5b5a56]/10 px-2 py-0.5 rounded tracking-widest">Em breve</span>
            </h3>
            <p className="font-mono-code text-[11px] text-[#5b5a56] leading-relaxed">
              Análise textual avançada via IA (Gemini / OpenAI) — configure <code className="text-[#a09b8c]">VITE_AI_ENDPOINT</code> no <code className="text-[#a09b8c]">.env</code> para ativar.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
