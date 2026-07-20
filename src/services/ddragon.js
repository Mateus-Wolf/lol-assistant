import { FALLBACK_CHAMPS } from '../constants/lanes';

// ─── Data Dragon Endpoints ──────────────────────────────────────────────────
const DD_BASE = 'https://ddragon.leagueoflegends.com';

// ─── Community Dragon Endpoints ─────────────────────────────────────────────
const CDN_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1';
const CDN_ICON_BASE = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Retorna a URL do ícone do campeão via Data Dragon.
 * @param {string} version - Patch atual (ex: "15.14.1")
 * @param {string} champId - ID do campeão (ex: "Ahri")
 */
export function getDDragonIconUrl(version, champId) {
  return `${DD_BASE}/cdn/${version}/img/champion/${champId}.png`;
}

/**
 * Retorna a URL do ícone de item via Data Dragon.
 * @param {string} version - Patch atual
 * @param {string} itemImageFull - Nome do arquivo do item (ex: "3031.png")
 */
export function getItemIconUrl(version, itemImageFull) {
  return `${DD_BASE}/cdn/${version}/img/item/${itemImageFull}`;
}

// ─── Fetchers ────────────────────────────────────────────────────────────────

/**
 * Busca a versão atual do patch no Data Dragon.
 */
async function fetchVersion() {
  const res = await fetch(`${DD_BASE}/api/versions.json`);
  if (!res.ok) throw new Error('Falha ao buscar versões do Data Dragon');
  const versions = await res.json();
  return versions[0];
}

/**
 * Busca todos os campeões do Data Dragon em PT-BR.
 * Retorna um array com { id, name, tags }.
 */
async function fetchDDragonChampions(version) {
  const res = await fetch(`${DD_BASE}/cdn/${version}/data/pt_BR/champion.json`);
  if (!res.ok) throw new Error('Falha ao buscar campeões do Data Dragon');
  const data = await res.json();
  return Object.values(data.data).map((c) => ({
    id: c.id,
    name: c.name,
    tags: c.tags,
  }));
}

/**
 * Busca todos os itens do patch atual em PT-BR via Data Dragon.
 * Retorna um mapa { [itemId]: { id, name, plaintext, image, gold, tags, stats } }
 * Filtrando apenas itens compráveis e que existem no mapa SR (map 11).
 */
export async function fetchItems(version) {
  const res = await fetch(`${DD_BASE}/cdn/${version}/data/pt_BR/item.json`);
  if (!res.ok) throw new Error('Falha ao buscar itens do Data Dragon');
  const data = await res.json();

  const items = {};
  for (const [id, item] of Object.entries(data.data)) {
    const isInSR          = item.maps?.['11'] === true;
    const isPurchasable   = item.gold?.purchasable === true;
    const isNotHidden     = !item.hideFromAll;
    const hasName         = item.name && item.name.trim().length > 0;
    // Excluir itens de selva, trinkets, consumíveis e componentes muito baratos (<500g)
    const isNotJungle     = !(item.tags || []).includes('Jungle');
    const isNotTrinket    = !(item.tags || []).includes('Trinket');
    const isNotConsumable = !(item.tags || []).includes('Consumable');
    const hasMinPrice     = (item.gold?.total || 0) >= 500;

    if (isInSR && isPurchasable && isNotHidden && hasName && isNotJungle && isNotTrinket && isNotConsumable && hasMinPrice) {
      items[id] = {
        id,
        name:      item.name,
        plaintext: item.plaintext || '',
        image:     item.image?.full || `${id}.png`,
        gold:      item.gold,
        tags:      item.tags || [],
        stats:     item.stats || {},
        depth:     item.depth || 1,
        into:      item.into  || null,
        from:      item.from  || [],
      };
    }
  }
  return items;
}

/**
 * Busca o champion-summary do Community Dragon (PT-BR).
 * Retorna um array com { id, name, alias, roles[] } onde roles está em lowercase inglês.
 */
async function fetchCommunityDragonSummary() {
  const res = await fetch(`${CDN_BASE}/champion-summary.json`);
  if (!res.ok) throw new Error('Falha ao buscar Community Dragon champion summary');
  const data = await res.json();
  // Filtrar entrada especial id=-1
  return data.filter((c) => c.id > 0);
}

// ─── Merge DDragon + Community Dragon ────────────────────────────────────────

/**
 * Combina os dados do Data Dragon com o Community Dragon.
 * DDragon tem: id (alias), name (PT-BR), tags (inglês)
 * CDN tem: alias (= DDragon id), roles (inglês lowercase), title em PT-BR
 *
 * Resultado final: { id, name, tags, roles, title }
 */
function mergeChampionData(ddChampions, cdnSummary) {
  // Criar mapa alias → CDN entry
  const cdnByAlias = {};
  for (const c of cdnSummary) {
    cdnByAlias[c.alias] = c;
  }

  return ddChampions.map((dd) => {
    const cdn = cdnByAlias[dd.id] || null;
    return {
      id: dd.id,
      name: dd.name,
      tags: dd.tags, // ex: ["Mage", "Assassin"] — DDragon PT-BR (tags em inglês mesmo)
      roles: cdn?.roles || [], // ex: ["mage", "assassin"] — CDN lowercase
      // cdnId pode ser útil futuramente para buscar detalhes
      cdnId: cdn?.id || null,
    };
  });
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

/**
 * Busca todos os dados estáticos necessários para a aplicação.
 * Combina Data Dragon + Community Dragon.
 * Retorna:
 *   - version: string do patch
 *   - champions: array de campeões com { id, name, tags, roles, cdnId }
 *   - items: mapa de itens { [id]: itemObject }
 *   - iconBase: URL base para ícones de campeão no DDragon
 *   - isOffline: boolean
 */
export async function fetchDDragonData() {
  try {
    const version = await fetchVersion();

    // Buscar DDragon + CDN + Itens em paralelo
    const [ddChampions, cdnSummary, items] = await Promise.all([
      fetchDDragonChampions(version),
      fetchCommunityDragonSummary(),
      fetchItems(version),
    ]);

    const champions = mergeChampionData(ddChampions, cdnSummary)
      .sort((a, b) => a.name.localeCompare(b.name));

    return {
      version,
      champions,
      items,
      iconBase: `${DD_BASE}/cdn/${version}/img/champion/`,
      itemIconBase: `${DD_BASE}/cdn/${version}/img/item/`,
      isOffline: false,
    };
  } catch (error) {
    console.warn('Erro ao carregar DDragon/CDN, usando fallback:', error);
    return {
      version: 'offline',
      champions: FALLBACK_CHAMPS,
      items: {},
      iconBase: null,
      itemIconBase: null,
      isOffline: true,
    };
  }
}
