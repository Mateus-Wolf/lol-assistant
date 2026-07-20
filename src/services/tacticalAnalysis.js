/**
 * Motor de análise tática — baseado em dados reais do Data Dragon + Knowledge Base.
 * Sem dados mock. Preparado para integração de IA via analyzeWithAI().
 */
import { getChampionProfile, detectSynergies, getPowerPhaseLabel } from '../constants/championKnowledge';
import { getChampionBuild, resolveItems, resolveItem } from '../constants/championBuilds';

// ─── Tipo de dano por tags DDragon ────────────────────────────────────────────

function getDamageType(tags = []) {
  const hasMage      = tags.includes('Mage');
  const hasMarksman  = tags.includes('Marksman');
  const hasFighter   = tags.includes('Fighter');
  const hasTank      = tags.includes('Tank');
  const hasAssassin  = tags.includes('Assassin');
  const hasSupport   = tags.includes('Support');

  if (hasMage && (hasFighter || hasAssassin)) return 'mixed';
  if (hasMage || (hasSupport && !hasMarksman && !hasFighter)) return 'ap';
  return 'ad';
}

function hasCCPotential(tags = []) {
  return tags.includes('Tank') || tags.includes('Support');
}

function isFrontline(tags = []) {
  return tags.includes('Tank') || tags.includes('Fighter');
}

// ─── Análise de composição ────────────────────────────────────────────────────

export function analyzeDamageProfile(champs) {
  const valid = champs.filter(Boolean);
  if (valid.length === 0) return { ad:0, ap:0, mixed:0, total:0, dominance:'balanced', adPercent:0, apPercent:0, mixedPercent:0 };

  let ad = 0, ap = 0, mixed = 0;
  for (const c of valid) {
    const t = getDamageType(c.tags || []);
    if (t === 'ad') ad++;
    else if (t === 'ap') ap++;
    else mixed++;
  }

  const total = valid.length;
  const adPct   = (ad + mixed * 0.5) / total;
  const apPct   = (ap + mixed * 0.5) / total;
  const dominance = adPct >= 0.6 ? 'ad' : apPct >= 0.6 ? 'ap' : 'balanced';

  return {
    ad, ap, mixed, total, dominance,
    adPercent:    Math.round((ad    / total) * 100),
    apPercent:    Math.round((ap    / total) * 100),
    mixedPercent: Math.round((mixed / total) * 100),
  };
}

export function analyzeFrontline(champs) {
  const valid = champs.filter(Boolean);
  const count = valid.filter((c) => isFrontline(c.tags || [])).length;
  return {
    count,
    hasFrontline:  count >= 2,
    isSquishyTeam: count <= 1,
    label: count === 0 ? 'Sem frontline' : count === 1 ? 'Frontline fraca' : count === 2 ? 'Frontline razoável' : 'Frontline sólida',
  };
}

export function analyzeCC(champs) {
  const valid  = champs.filter(Boolean);
  const count  = valid.filter((c) => hasCCPotential(c.tags || [])).length;
  return {
    count,
    hasGoodCC: count >= 2,
    label: count === 0 ? 'Sem controle de grupo' : count === 1 ? 'Pouco CC' : count <= 3 ? 'CC moderado' : 'CC pesado',
  };
}

// ─── Análise de matchup (enriquecida com perfil do campeão) ───────────────────

export function analyzeMatchup(ally, enemy) {
  if (!ally || !enemy) {
    return { allyAdvantage:'even', description:'Slot vazio', tips:[] };
  }

  const allyProfile  = getChampionProfile(ally);
  const enemyProfile = getChampionProfile(enemy);

  const allyPhase  = getPowerPhaseLabel(allyProfile);
  const enemyPhase = getPowerPhaseLabel(enemyProfile);
  const allyArch   = allyProfile?.archetype  || [];
  const enemyArch  = enemyProfile?.archetype || [];
  const allyRange  = allyProfile?.range  || 'melee';
  const enemyRange = enemyProfile?.range || 'melee';

  const tips = [];
  let allyAdvantage = 'even';
  let description   = '';

  // ── Power spike timing ──────────────────────────────────────────────────
  if (allyPhase === 'early' && enemyPhase === 'late') {
    allyAdvantage = 'advantage';
    description = `${ally.name} tem pico no early — pressione agora antes que ${enemy.name} escale.`;
    tips.push(`${enemy.name} fica mais forte com o tempo. Force confrontos antes do 2º-3º item inimigo.`);
  } else if (allyPhase === 'late' && enemyPhase === 'early') {
    allyAdvantage = 'disadvantage';
    description = `${enemy.name} é forte agora — ${ally.name} escala melhor no late game.`;
    tips.push(`Farm passivo e evite trocas desnecessárias. Você vence depois do 2º-3º item.`);
    tips.push(`Peça ganks ao jungler para equilibrar a pressão inimiga.`);
  } else if (allyPhase === 'early' && enemyPhase === 'early') {
    description = `Ambos são fortes no early — o primeiro erro decide a rota.`;
    tips.push(`Wave management é crucial. Não tome trocas desfavoráveis cedo.`);
  } else if (allyPhase === 'late' && enemyPhase === 'late') {
    description = `Matchup de scaling — a partida se decide no teamfight do late.`;
    tips.push(`Farm eficientemente e não arrisque antes dos itens. A composição decide.`);
  }

  // ── Vantagem de range ───────────────────────────────────────────────────
  if (allyRange === 'ranged' && enemyRange === 'melee') {
    if (allyAdvantage !== 'advantage') allyAdvantage = 'advantage';
    if (!description) description = `${ally.name} tem vantagem de alcance sobre ${enemy.name}.`;
    tips.push(`Use seu alcance para poke seguro. Fique fora do range de gap-closer do inimigo.`);
  } else if (allyRange === 'melee' && enemyRange === 'ranged') {
    if (allyAdvantage !== 'disadvantage') allyAdvantage = 'disadvantage';
    if (!description) description = `${enemy.name} tem vantagem de alcance — farm seguro e espere ganks.`;
    tips.push(`Espere jungle para criar pressão. Aproveite arbustos para reduzir o alcance do inimigo.`);
    tips.push(`Use minions como escudo para chegar mais perto durante as trocas.`);
  }

  // ── Sustain vs burst ─────────────────────────────────────────────────────
  if (allyArch.includes('sustain') && enemyArch.includes('burst')) {
    tips.push(`${ally.name} tem mais sustain — aguente o burst inicial e retrade quando a cura entrar.`);
  } else if (allyArch.includes('burst') && enemyArch.includes('sustain')) {
    tips.push(`${enemy.name} tem sustain alto. Force trocas curtas e nunca trocas longas.`);
    tips.push(`Itens de healing reduction (Chamas da Espada, Perfurador) são essenciais neste matchup.`);
  }

  // ── Poke vs all-in ────────────────────────────────────────────────────────
  if (enemyArch.includes('poke') && !allyArch.includes('poke')) {
    if (!description) description = `${enemy.name} é uma ameaça de poke — cuide da sua HP.`;
    tips.push(`Posição é crucial. Fique atrás das tropas e minimize o poke.`);
    tips.push(`Compre poções extras e considere itens de cura se o poke for muito agressivo.`);
  }

  // ── Dica do perfil do inimigo ────────────────────────────────────────────
  if (enemyProfile?.description && tips.length < 2) {
    tips.push(`Sobre ${enemy.name}: ${enemyProfile.description.split('.')[0]}.`);
  }

  // ── Dica do spike do inimigo ────────────────────────────────────────────
  if (enemyProfile?.spike) {
    tips.push(`Pico de poder de ${enemy.name}: ${enemyProfile.spike} — seja mais cauteloso a partir daí.`);
  }

  // Fallback
  if (!description) {
    description = `${ally.name} vs ${enemy.name} — matchup equilibrado`;
    tips.push(`Fique atento ao power spike de ${enemy.name}: ${enemyProfile?.spike || '2º item'}.`);
  }

  return { allyAdvantage, description, tips: tips.slice(0, 3) };
}

// ─── Power Spikes por campeão ─────────────────────────────────────────────────

/**
 * Gera o relatório de power spikes para todos os campeões de um time.
 * @param {Array} champs - Array de campeões do time com roles
 * @returns {Array} Array de { role, champ, profile, phase, ratingBars }
 */
export function generatePowerSpikes(champs) {
  const roles = ['TOPO', 'SELVA', 'MEIO', 'ATIRAD.', 'SUPORTE'];
  return champs.map((champ, i) => {
    if (!champ) return { role: roles[i], champ: null, profile: null };
    const profile = getChampionProfile(champ);
    return {
      role:   roles[i],
      champ,
      profile,
      phase:  getPowerPhaseLabel(profile),
    };
  });
}

// ─── Builds de itens por campeão ────────────────────────────────────────────

/**
 * Gera as recomendações de itens para um campeão em determinado slot.
 * Usa o banco de dados de builds (championBuilds.js) quando disponível.
 * Retorna categorias separadas: core, boots, situacional vs AD/AP.
 *
 * @param {object|null} you - Campeão do jogador
 * @param {number} youIndex - Slot do jogador (0=top, 1=jg, 2=mid, 3=bot, 4=sup)
 * @param {object} enemyDamage - Resultado de analyzeDamageProfile(red)
 * @param {number} enemyCCCount - Resultado de analyzeCC(red).count
 * @param {object} allItems - Mapa de itens do DDragon
 * @returns {{ core, boots, situational, hasSpecificBuild }}
 */
export function getChampionItemRecommendations(you, youIndex, enemyDamage, enemyCCCount, allItems) {
  if (!you || !allItems || Object.keys(allItems).length === 0) {
    return { core: [], boots: null, situational: [], hasSpecificBuild: false };
  }

  const build = getChampionBuild(you.id, youIndex);

  if (build) {
    // ── Build específico do campeão ──────────────────────────────────────
    const core = resolveItems(allItems, build.core).slice(0, 4);

    // Boots: usa versão vs CC se inimigo tem 3+ fontes de CC
    const bootsKey = enemyCCCount >= 3 && build.bootsVsCC ? build.bootsVsCC : build.boots;
    const boots    = bootsKey ? resolveItem(allItems, bootsKey) : null;

    // Itens situacionais baseados no tipo de dano inimigo
    let situationalKeys = [];
    if (enemyDamage.dominance === 'ad') {
      situationalKeys = build.vsAD || [];
    } else if (enemyDamage.dominance === 'ap') {
      situationalKeys = build.vsAP || [];
    } else {
      // Time balanceado: mostra 1 de cada categoria
      situationalKeys = [...(build.vsAD || []).slice(0, 1), ...(build.vsAP || []).slice(0, 1)];
    }
    const situational = resolveItems(allItems, situationalKeys);

    return { core, boots, situational, hasSpecificBuild: true };
  }

  // ── Fallback por tag (campeão não cadastrado) ────────────────────────
  const damageType = getDamageType(you.tags || []);
  const coreTags   = damageType === 'ap' ? ['SpellDamage'] : ['Damage', 'CriticalStrike'];
  const defTags    = enemyDamage.dominance === 'ap' ? ['SpellBlock'] : ['Armor'];

  const findByTag = (tags, limit) => Object.values(allItems)
    .filter(item =>
      item.tags.some(t => tags.includes(t)) &&
      (item.gold?.total || 0) >= 1500 &&
      !(item.tags || []).includes('Jungle') &&
      !(item.tags || []).includes('Trinket')
    )
    .sort((a, b) => (b.gold?.total || 0) - (a.gold?.total || 0))
    .slice(0, limit);

  return {
    core:            findByTag(coreTags, 3),
    boots:           findByTag(['Boots'], 1)[0] || null,
    situational:     findByTag(defTags, 2),
    hasSpecificBuild: false,
  };
}

// ─── Notas estratégicas ──────────────────────────────────────────────────────

function buildStrategyNotes({ allyDamage, enemyDamage, allyFrontline, enemyFrontline, allyCC, enemyCC, you, opponent }) {
  const notes = [];

  // 1. Dano Aliado e Inimigo
  if (allyDamage.dominance === 'ad') {
    notes.push({ category: 'attention', type:'warning', title:'Time Aliado Full AD',
      text:`Seu time é ${allyDamage.adPercent}% dano físico. O inimigo pode construir armadura cedo. Priorize penetração de armadura (Perfurador, Lembrança do Lorde Dominik, Cimitarra Negra).` });
  } else if (allyDamage.dominance === 'ap') {
    notes.push({ category: 'attention', type:'warning', title:'Time Aliado Full AP',
      text:`Seu time é ${allyDamage.apPercent}% dano mágico. Inimigos que construírem Resistência Mágica cedo reduzirão seu impacto. Priorize Cajado do Vazio / Criptoflora.` });
  } else if (allyDamage.total > 0) {
    notes.push({ category: 'positive', type:'success', title:'Composição de Dano Balanceada',
      text:'Seu time possui mix equilibrado de dano físico e mágico — isso dificulta para o time inimigo itemizar defesas eficientes.' });
  }

  if (enemyDamage.dominance === 'ad' && enemyDamage.total >= 3) {
    notes.push({ category: 'attention', type:'warning', title:'Inimigos Predominantemente AD',
      text:`Time inimigo possui ${enemyDamage.adPercent}% de dano físico. Itens de Armadura (Coração Congelado, Presa da Serpente, Armadura de Espinhos) terão alto valor.` });
  } else if (enemyDamage.dominance === 'ap' && enemyDamage.total >= 3) {
    notes.push({ category: 'attention', type:'warning', title:'Inimigos Predominantemente AP',
      text:`Time inimigo possui ${enemyDamage.apPercent}% de dano mágico. Resistência Mágica (Semblante Espiritual, Força da Natureza, Passos de Mercúrio) trará grande sobrevivência.` });
  }

  // 2. Frontline Aliada e Inimiga
  if (allyFrontline.isSquishyTeam && allyFrontline.count === 0 && allyDamage.total > 0) {
    notes.push({ category: 'negative', type:'danger', title:'Sem Frontline Aliada',
      text:'Seu time não possui tanques ou lutadores. Evite lutas diretas em espaço aberto onde o inimigo possa iniciar em cima dos seus carries.' });
  } else if (allyFrontline.isSquishyTeam && allyFrontline.count === 1) {
    notes.push({ category: 'negative', type:'danger', title:'Frontline Aliada Fraca',
      text:'Seu time possui apenas 1 campeão para absorver dano. Cuidado ao responder a iniciações agressivas em grupo.' });
  } else if (allyFrontline.count >= 3) {
    notes.push({ category: 'positive', type:'success', title:'Frontline Aliada Sólida',
      text:'Você possui excelente linha de frente para absorver dano e proteger os alvos principais em lutas de equipe.' });
  }

  if (enemyFrontline.isSquishyTeam && enemyFrontline.count === 0 && enemyDamage.total >= 3) {
    notes.push({ category: 'positive', type:'success', title:'Time Inimigo Sem Frontline',
      text:'O time adversário é composto apenas por alvos frágeis. Campeões de burst e assassinos aliados podem criar eliminações rápidas.' });
  }

  // 3. Controle de Grupo (CC) Aliado e Inimigo
  if (allyCC.count === 0 && allyDamage.total >= 3) {
    notes.push({ category: 'negative', type:'danger', title:'Ausência de Controle de Grupo',
      text:'Seu time quase não tem CC duro para parar alvos móveis ou cancelar habilidades importantes. Coordenação de foco é essencial.' });
  } else if (allyCC.count >= 3) {
    notes.push({ category: 'positive', type:'success', title:'CC Pesado Aliado',
      text:`Seu time tem ${allyCC.count} fontes de controle de grupo — encadeie seus combos de CC para dominar as lutas de equipe.` });
  }

  if (enemyCC.count >= 3) {
    notes.push({ category: 'attention', type:'warning', title:'CC Pesado Inimigo',
      text:`O time inimigo tem ${enemyCC.count} fontes de controle de grupo. Considere Passos de Mercúrio, Suportes de Purificação ou o feitiço Purificar.` });
  }

  // 4. Dicas de Rota e Campeão do Jogador
  if (you && opponent) {
    const yourProf = getChampionProfile(you);
    const oppProf  = getChampionProfile(opponent);
    if (yourProf?.description) {
      notes.push({ category: 'attention', type:'info', title:`Dica para ${you.name}`,
        text: yourProf.description });
    }
    if (oppProf?.spike) {
      notes.push({ category: 'attention', type:'warning', title:`Atenção: Pico de ${opponent.name}`,
        text:`Pico de poder inimigo: ${oppProf.spike}. Fique atento à janela de força do seu oponente direto.` });
    }
  }

  return notes;
}

// ─── Relatório completo ──────────────────────────────────────────────────────

export function generateTacticalReport(blue, red, youIndex, allItems) {
  const you      = blue[youIndex] || null;
  const opponent = red[youIndex]  || null;

  const allyDamage    = analyzeDamageProfile(blue);
  const enemyDamage   = analyzeDamageProfile(red);
  const allyFrontline = analyzeFrontline(blue);
  const enemyFrontline= analyzeFrontline(red);
  const allyCC        = analyzeCC(blue);
  const enemyCC       = analyzeCC(red);

  const matchups = blue.map((ally, i) => ({
    role:     ['TOPO','SELVA','MEIO','ATIRAD.','SUPORTE'][i],
    ally,
    enemy:    red[i],
    analysis: analyzeMatchup(ally, red[i]),
  }));

  const powerSpikes = generatePowerSpikes(blue);

  // Sinergias do time aliado E inimigo
  const allySynergies  = detectSynergies(blue);
  const enemySynergies = detectSynergies(red);

  // Recomendações de itens específicas do campeão
  const itemRecommendations = getChampionItemRecommendations(you, youIndex, enemyDamage, enemyCC.count, allItems);

  const strategyNotes = buildStrategyNotes({ allyDamage, enemyDamage, allyFrontline, enemyFrontline, allyCC, enemyCC, you, opponent });

  return {
    you, opponent,
    allyDamage, enemyDamage,
    allyFrontline, enemyFrontline,
    allyCC, enemyCC,
    matchups,
    powerSpikes,
    allySynergies,
    enemySynergies,
    itemRecommendations,
    strategyNotes,
  };
}

// ─── Stub para integração de IA ──────────────────────────────────────────────

export async function analyzeWithAI(report, options = {}) {
  const endpointUrl = options.endpointUrl || import.meta.env?.VITE_AI_ENDPOINT || null;
  if (!endpointUrl) return null;

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options.apiKey ? { Authorization: `Bearer ${options.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: options.model || 'gemini-2.0-flash',
        report: {
          blue:        report.matchups.map((m) => m.ally?.name  || null),
          red:         report.matchups.map((m) => m.enemy?.name || null),
          youPlaying:  report.you?.name || null,
          allyDamage:  report.allyDamage,
          enemyDamage: report.enemyDamage,
          allyCC:      report.allyCC,
          enemyCC:     report.enemyCC,
        },
      }),
    });
    if (!response.ok) throw new Error(`AI endpoint retornou ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn('Análise de IA indisponível:', err.message);
    return null;
  }
}
