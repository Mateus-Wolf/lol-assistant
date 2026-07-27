/**
 * Motor de análise tática — baseado em dados reais do Data Dragon + Knowledge Base.
 * Sem dados mock. Preparado para integração de IA via analyzeWithAI().
 */
import { getChampionProfile, detectSynergies, getPowerPhaseLabel } from '../constants/championKnowledge';
import { getChampionBuild, resolveItems, resolveItem } from '../constants/championBuilds';

// ─── Tipo de dano por tags DDragon ────────────────────────────────────────────
// Retorna um de 5 tipos: 'ap' | 'ad' | 'mixed' | 'tank' | 'support'
// Ordem de prioridade:
//   1. mixed  → Mago + Guerreiro/Assassino (dano real híbrido)
//   2. ap     → Mago puro ou Suporte com Mago
//   3. support→ Suporte puro (sem Mago, sem Atirador, sem Guerreiro)
//   4. tank   → Tanque puro (sem Mago, sem Guerreiro)
//   5. ad     → Atirador, Guerreiro, Assassino e demais

function getDamageType(tags = []) {
  const hasMage     = tags.includes('Mage');
  const hasMarksman = tags.includes('Marksman');
  const hasFighter  = tags.includes('Fighter');
  const hasTank     = tags.includes('Tank');
  const hasAssassin = tags.includes('Assassin');
  const hasSupport  = tags.includes('Support');

  // Híbrido AP + físico (ex: Akali, Gwen, Mordekaiser)
  if (hasMage && (hasFighter || hasAssassin)) return 'mixed';
  // Mago puro ou Suporte que também é Mago (ex: Zyra, Morgana, Lux sup)
  if (hasMage) return 'ap';
  // Suporte puro sem dano físico relevante (ex: Thresh, Leona, Nautilus, Soraka)
  if (hasSupport && !hasMarksman && !hasFighter && !hasAssassin) return 'support';
  // Tanque puro sem origem de dano físico (ex: Malphite, Amumu, Shen pure-tank)
  if (hasTank && !hasFighter && !hasMarksman && !hasAssassin) return 'tank';
  // Demais: Atirador, Guerreiro, Assassino
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
    // 'tank' e 'support' são neutros no perfil de dano — não inflam AD%
    if (t === 'ad')     ad++;
    else if (t === 'ap') ap++;
    else if (t === 'mixed') mixed++;
    // 'tank' e 'support': não contabilizados (não distorcem o perfil)
  }

  const total = valid.length;
  // Usar apenas os que realmente causam dano como base para os percentuais
  const dmgTotal = ad + ap + mixed;
  if (dmgTotal === 0) {
    return { ad:0, ap:0, mixed:0, total, dominance:'balanced', adPercent:0, apPercent:0, mixedPercent:0 };
  }

  const adPct = (ad + mixed * 0.5) / dmgTotal;
  const apPct = (ap + mixed * 0.5) / dmgTotal;
  const dominance = adPct >= 0.6 ? 'ad' : apPct >= 0.6 ? 'ap' : 'balanced';

  return {
    ad, ap, mixed, total, dominance,
    adPercent:    Math.round((ad    / dmgTotal) * 100),
    apPercent:    Math.round((ap    / dmgTotal) * 100),
    mixedPercent: Math.round((mixed / dmgTotal) * 100),
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
    tips.push(`Não deixe ${enemy.name} chegar ao 2º-3º item. Force trocas e crie vantagem de ouro cedo.`);
    tips.push(`Controle a wave: freeze perto da sua torre quando inimigo recuar para negar farm e escala.`);
  } else if (allyPhase === 'late' && enemyPhase === 'early') {
    allyAdvantage = 'disadvantage';
    description = `${enemy.name} é forte agora — ${ally.name} escala melhor no late game.`;
    tips.push(`Farm passivo e evite trocas desnecessárias. Com 2-3 itens você inverte o matchup.`);
    tips.push(`Peça ganks ao jungler nos momentos em que ${enemy.name} for overextender na wave.`);
  } else if (allyPhase === 'early' && enemyPhase === 'early') {
    description = `Ambos são fortes no early — o primeiro erro decide a rota.`;
    tips.push(`Wave management é crucial. Jogue com a wave a seu favor antes de engajar.`);
    tips.push(`Respeite os CDs chave do inimigo — o momento logo após ele errar uma habilidade é a janela de troca.`);
  } else if (allyPhase === 'late' && enemyPhase === 'late') {
    description = `Matchup de scaling — ambos precisam de itens para explodir. Farm é prioridade máxima.`;
    tips.push(`Não arrisque mortes gratuitas. Cada morte nega itens críticos e atrasa seu pico de poder.`);
  }

  // ── Vantagem de range ───────────────────────────────────────────────────
  if (allyRange === 'ranged' && enemyRange === 'melee') {
    if (allyAdvantage !== 'advantage') allyAdvantage = 'advantage';
    if (!description) description = `${ally.name} tem vantagem de alcance — poke seguro e niegue o farm de ${enemy.name}.`;
    tips.push(`Use alcance para harass toda vez que ${enemy.name} se aproximar de um minion. Ele perde HP ou perde farm.`);
    tips.push(`Posicione-se no lado oposto ao gap-closer do inimigo. Se ele errar o dash, é sua janela de troca.`);
  } else if (allyRange === 'melee' && enemyRange === 'ranged') {
    if (allyAdvantage !== 'disadvantage') allyAdvantage = 'disadvantage';
    if (!description) description = `${enemy.name} tem vantagem de alcance — gerencie a wave e espere oportunidades.`;
    tips.push(`Use os minions como escudo contra skillshots. Avance pelo lado oposto ao range dele.`);
    tips.push(`Arbustos anulam parte da vantagem de alcance — controle o warding e jogue pelos bushes.`);
  }

  // ── Sustain vs burst ─────────────────────────────────────────────────────
  if (allyArch.includes('sustain') && enemyArch.includes('burst')) {
    tips.push(`Seu sustain supera o burst — aguente o combo inicial, cura e retrade quando o inimigo ficar em cooldown.`);
  } else if (allyArch.includes('burst') && enemyArch.includes('sustain')) {
    tips.push(`${enemy.name} tem sustain alto — force trocas curtas e explosivas, nunca trocas de DPS prolongadas.`);
    tips.push(`Compre healing reduction cedo (Chamas da Espada / Perfurador do Morticínio) para cortar a cura inimiga.`);
  }

  // ── Poke vs all-in ────────────────────────────────────────────────────────
  if (enemyArch.includes('poke') && !allyArch.includes('poke')) {
    if (!description) description = `${enemy.name} vai desgastar sua HP de longe — posicionamento é tudo aqui.`;
    tips.push(`Fique atrás dos minions para bloquear skillshots de poke. Não avance sem proteção de minions.`);
    tips.push(`Leve poções extras ou Second Wind como runa. No longo prazo, ganks resolvem mais que tentar duelar.`);
  }

  // ── Assassino vs imóvel ───────────────────────────────────────────────────
  if (enemyArch.includes('burst') && allyArch.includes('hypercarry')) {
    tips.push(`${enemy.name} vai caçar você. Jogue perto da frontline aliada e nunca fique sozinho no mapa.`);
  }

  // ── Dive vs squishy ───────────────────────────────────────────────────────
  if (enemyArch.includes('all-in') && !allyArch.includes('all-in') && !allyArch.includes('sustain')) {
    tips.push(`${enemy.name} joga para o all-in — respeite os sinais de engajamento e posicione-se com saída de fuga.`);
  }

  // ── Split push inimigo ────────────────────────────────────────────────────
  if (enemyArch.includes('split') && !allyArch.includes('split')) {
    tips.push(`${enemy.name} tende a splitpush — comunique a posição dele para o time e reúna para objetivos quando ele pressionar.`);
  }

  // ── Descrição da dica do inimigo (sempre útil) ───────────────────────────
  if (enemyProfile?.description) {
    const firstSentence = enemyProfile.description.split('.')[0];
    tips.push(`Dica sobre ${enemy.name}: ${firstSentence}.`);
  }

  // ── Power spike do inimigo ────────────────────────────────────────────────
  if (enemyProfile?.spike) {
    tips.push(`Pico de poder de ${enemy.name}: ${enemyProfile.spike}. Seja mais cauteloso a partir desse momento.`);
  }

  // Fallback de description
  if (!description) {
    description = `${ally.name} vs ${enemy.name} — matchup equilibrado. Quem errar primeiro perde a rota.`;
  }

  return { allyAdvantage, description, tips: tips.slice(0, 4) };
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

  // Tags de itens a buscar por tipo de dano
  const CORE_TAGS_BY_TYPE = {
    ap:      ['SpellDamage'],
    mixed:   ['SpellDamage'],
    ad:      ['Damage', 'CriticalStrike'],
    tank:    ['Health', 'Armor', 'SpellBlock'],
    support: ['Health', 'ManaRegen', 'SpellDamage'],
  };

  // Custo mínimo por tipo (tanks e supports têm itens mais baratos)
  const MIN_GOLD_BY_TYPE = {
    ap: 2000, mixed: 2000, ad: 2000, tank: 1200, support: 1000,
  };

  const coreTags = CORE_TAGS_BY_TYPE[damageType] || ['Damage'];
  const minGold  = MIN_GOLD_BY_TYPE[damageType] || 1500;

  // Defesa situacional baseada no dano inimigo
  const defTags = enemyDamage.dominance === 'ap'
    ? ['SpellBlock', 'Health']
    : ['Armor', 'Health'];

  const EXCLUDED_TAGS = new Set(['Jungle', 'Trinket', 'Consumable', 'Lane']);

  const findByTag = (tags, limit, minCost = minGold) =>
    Object.values(allItems)
      .filter(item =>
        item.tags.some(t => tags.includes(t)) &&
        (item.gold?.total || 0) >= minCost &&
        !item.tags.some(t => EXCLUDED_TAGS.has(t))
      )
      .sort((a, b) => (b.gold?.total || 0) - (a.gold?.total || 0))
      .slice(0, limit);

  return {
    core:             findByTag(coreTags, 3),
    boots:            findByTag(['Boots'], 1, 300)[0] || null,
    situational:      findByTag(defTags, 2, 1000),
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
