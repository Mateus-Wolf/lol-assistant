/**
 * Banco de dados de builds por campeão.
 *
 * Cada entrada usa "item keys" mapeados para name fragments que serão buscados
 * no catálogo real do DDragon (PT-BR + fallback EN).
 *
 * Estrutura por campeão:
 *   core        → itens obrigatórios na maioria das games
 *   boots       → bota padrão (+ alternativa vs CC pesado)
 *   vsAD        → itens situacionais contra times físicos
 *   vsAP        → itens situacionais contra times mágicos
 *
 * O sistema busca no DDragon o PRIMEIRO nome que encontrar para cada key.
 * Se um item foi removido/renomeado, é silenciosamente ignorado.
 */

// ─── Mapa de item-key → name fragments (PT-BR primeiro, EN como fallback) ────

export const ITEM_SEARCH = {
  // Míticos de dano
  eclipse:            ['Eclipse'],
  divine_sunderer:    ['Divisor Sagrado', 'Divine Sunderer', 'Sunderer'],
  trinity_force:      ['Força Trindade', 'Trinity Force', 'Trinity'],
  stridebreaker:      ['Marcha do Destruidor', 'Stridebreaker'],
  hullbreaker:        ['Fio de Hecatombo', 'Hullbreaker'],
  galeforce:          ['Força do Vendaval', 'Galeforce'],
  kraken_slayer:      ['Algoz do Kraken', 'Kraken Slayer', 'Kraken'],
  immortal_shieldbow: ['Arco do Escudo Imortal', 'Shieldbow', 'Immortal'],
  infinity_edge:      ['Lâmina do Infinito', 'Infinity Edge', 'Infinity'],
  lethality_mythic:   ['Guilhotina', 'Duskblade', 'Crepúsculo'],
  // Míticos mágicos
  luden:              ['Eco de Ludens', 'Cálice de Ludens', 'Pulso de Ludens', "Luden"],
  liandrys:           ['Tormento de Liandry', "Liandry"],
  crown:              ['Coroa do Mago Destruído', 'Coroa Quebrada', 'Crown of the Shattered Queen', 'Crown'],
  rocketbelt:         ['Cinto de Foguete Hextech', 'Hextech Rocketbelt', 'Rocketbelt'],
  riftmaker:          ['Criador de Brechas', 'Riftmaker'],
  everfrost:          ['Gelo Eterno', 'Everfrost'],
  // Míticos de suporte
  shurelyas:          ["Clamor de Shurelia", "Shurelia"],
  locket:             ['Medalhão do Escudo de Ferro', 'Locket'],
  moonstone:          ['Renovador Pedra da Lua', 'Moonstone'],
  imperial_mandate:   ['Mandato Imperial', 'Imperial Mandate'],
  // Míticos de tanque
  sunfire:            ['Égide de Sunfire', 'Sunfire Aegis', 'Sunfire'],
  frostfire:          ['Puño de Frostfire', 'Frostfire Gauntlet', 'Frostfire'],
  turbo_chemtank:     ['Quimitanque Turbo', 'Turbo Chemtank', 'Chemtank'],
  heartsteel:         ['Coração de Aço', 'Heartsteel'],
  radiant_virtue:     ['Virtude Radiante', 'Radiant Virtue'],

  // Lendários de dano AD
  titanic_hydra:      ['Hidra Titânica', 'Titanic Hydra', 'Titanic'],
  ravenous_hydra:     ['Hidra Voraz', 'Ravenous Hydra', 'Ravenous'],
  serylda:            ['Profanador', "Serylda"],
  black_cleaver:      ['Cimitarra Negra', 'Black Cleaver', 'Cleaver'],
  deaths_dance:       ['Dança da Morte', "Death's Dance", 'Death Dance'],
  mortal_reminder:    ['Manto Mortal', 'Mortal Reminder', 'Manto'],
  lord_dominik:       ['Desígnios de Lorde Dominique', "Lord Dominik", 'Dominik'],
  edge_of_night:      ['Gume da Noite', 'Edge of Night', 'Gume'],
  serpents_fang:      ['Presa da Serpente', "Serpent's Fang", 'Serpent'],
  sheen:              ['Brilhência', 'Sheen'],
  phantom_dancer:     ['Dançarino Fantasma', 'Phantom Dancer'],
  sterak:             ["Manopla de Sterak", "Sterak"],
  maw:                ['Mandíbula de Malmortius', 'Maw of Malmortius', 'Malmortius'],
  wit_end:            ['Fio de Aço', "Wit's End"],
  botrk:              ['Lâmina do Rei Arruinado', 'Blade of Ruined King', 'Ruined King'],
  guinsoo:            ['Lâmina do Espectro', "Guinsoo"],
  rageblade:          ['Lâmina Furiosa', 'Rageblade'],
  spear_shojin:       ['Lança de Shojin', 'Spear of Shojin', 'Shojin'],
  blade_of_night:     ['Gume da Noite', 'Edge of Night'],
  // Lendários mágicos
  rabadon:            ["Chapéu de Rabadon", "Rabadon"],
  void_staff:         ['Cajado do Vazio', 'Void Staff'],
  zhonya:             ['Ampulheta de Zhonya', 'Zhonya'],
  shadowflame:        ['Chamas Sombrias', 'Shadowflame'],
  horizon_focus:      ['Foco do Horizonte', 'Horizon Focus'],
  cosmic_drive:       ['Impulso Cósmico', 'Cosmic Drive'],
  lich_bane:          ['Bane do Lich', "Lich Bane"],
  nashor_tooth:       ['Dente de Nashor', "Nashor's Tooth"],
  malignance:         ['Malignância', 'Malignance'],
  stormsurge:         ['Tempestade Súbita', 'Stormsurge'],
  // Lendários de suporte
  ardent_censer:      ['Incensário Ardente', 'Ardent Censer'],
  staff_ages:         ['Cajado das Eras', 'Staff of Ages'],
  redemption:         ['Redenção', 'Redemption'],
  chemtech_putrifier: ['Purificador Quimitecnológico', 'Chemtech Putrifier'],
  mikael:             ["Crucifixo de Mikael", "Mikael"],
  // Defensivos
  warmog:             ['Armadura de Warmog', 'Warmog'],
  anathemas:          ['Correntes de Anátema', "Anathema"],
  frozen_heart:       ['Coração Congelado', 'Frozen Heart'],
  thornmail:          ['Cota de Espinhos', 'Thornmail'],
  randuins:           ["Augúrio de Randuin", "Randuin"],
  gargoyle:           ['Estátua de Gárgula', 'Gargoyle Stoneplate', 'Gárgula'],
  force_of_nature:    ['Força da Natureza', 'Force of Nature'],
  banshee:            ['Névoa de Banshee', "Banshee"],
  spirit_visage:      ['Visagem do Espírito', 'Spirit Visage'],
  abyssal_mask:       ['Máscara Abissal', 'Abyssal Mask', 'Abyssal'],
  // Boots
  steelcaps:          ['Treinos de Placa', 'Sapatões Blindados', 'Plated Steelcaps', 'Steelcaps'],
  merc_treads:        ['Passos de Mercúrio', 'Mercury Treads', 'Mercury'],
  sorc_shoes:         ['Chuteiras do Mago', 'Sorcerer Shoes', "Sorcerer's"],
  ionian_boots:       ['Chuteiras Ionianas', 'Ionian Boots'],
  swiftness:          ['Chuteiras da Rapidez', 'Boots of Swiftness', 'Swiftness'],
  berserker:          ['Sapatões de Berserker', "Berserker's Greaves", 'Berserker'],
};

// ─── Builds por campeão ────────────────────────────────────────────────────────
// core: itens principais (na ordem de compra recomendada)
// boots / bootsVsCC: bota padrão e alternativa contra CC pesado
// vsAD: situacional contra time físico
// vsAP: situacional contra time mágico

export const CHAMPION_BUILDS = {
  // ╔════════════════════════════════╗
  // ║        TOP LANERS              ║
  // ╚════════════════════════════════╝
  Aatrox:       { top: { core:['eclipse','titanic_hydra','serylda','deaths_dance'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['banshee','spirit_visage'] }},
  Camille:      { top: { core:['trinity_force','serylda','deaths_dance','sterak'],             boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['frozen_heart','gargoyle'],             vsAP:['maw','banshee'] }},
  Darius:       { top: { core:['divine_sunderer','black_cleaver','sterak','deaths_dance'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','gargoyle'],                vsAP:['spirit_visage','force_of_nature'] }},
  Fiora:        { top: { core:['trinity_force','deaths_dance','serylda','sterak'],             boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','black_cleaver'],     vsAP:['maw','spirit_visage'] }},
  Gangplank:    { top: { core:['trinity_force','spear_shojin','serylda','phantom_dancer'],     boots:'ionian_boots', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','lord_dominik'],   vsAP:['maw','banshee'] }},
  Garen:        { top: { core:['stridebreaker','sterak','warmog','gargoyle'],                  boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','force_of_nature'] }},
  Gnar:         { top: { core:['trinity_force','black_cleaver','frozen_heart','randuins'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','gargoyle'],                vsAP:['abyssal_mask','force_of_nature'] }},
  Gwen:         { top: { core:['riftmaker','nashor_tooth','rabadon','void_staff'],             boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya','spirit_visage'],             vsAP:['banshee','spirit_visage'] }},
  Irelia:       { top: { core:['divine_sunderer','trinity_force','deaths_dance','sterak'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','lord_dominik'],      vsAP:['maw','spirit_visage'] }},
  Illaoi:       { top: { core:['divine_sunderer','sterak','anathemas','gargoyle'],             boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','abyssal_mask'] }},
  Jax:          { top: { core:['trinity_force','spear_shojin','wit_end','sterak'],             boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['frozen_heart','gargoyle'],             vsAP:['maw','spirit_visage'] }},
  Jayce:        { top: { core:['trinity_force','serylda','deaths_dance','edge_of_night'],      boots:'ionian_boots', bootsVsCC:'merc_treads', vsAD:['mortal_reminder'],                  vsAP:['maw','banshee'] }},
  KSante:       { top: { core:['heartsteel','frozen_heart','anathemas','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','force_of_nature'] }},
  Malphite:     { top: { core:['sunfire','frozen_heart','randuins','thornmail'],               boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['gargoyle','anathemas'],                vsAP:['spirit_visage','abyssal_mask'] }},
  Mordekaiser:  { top: { core:['riftmaker','rocketbelt','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya','thornmail'],                 vsAP:['banshee','spirit_visage'] }},
  Nasus:        { top: { core:['divine_sunderer','frozen_heart','warmog','gargoyle'],          boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['spirit_visage','force_of_nature'] }},
  Olaf:         { top: { core:['divine_sunderer','black_cleaver','deaths_dance','sterak'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Ornn:         { top: { core:['heartsteel','frostfire','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Renekton:     { top: { core:['divine_sunderer','black_cleaver','sterak','deaths_dance'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['maw','spirit_visage'] }},
  Riven:        { top: { core:['eclipse','serylda','deaths_dance','sterak'],                   boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','lord_dominik'],      vsAP:['maw','banshee'] }},
  Sett:         { top: { core:['stridebreaker','sterak','anathemas','gargoyle'],               boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','force_of_nature'] }},
  Shen:         { top: { core:['sunfire','frozen_heart','anathemas','gargoyle'],               boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['spirit_visage','abyssal_mask'] }},
  Sion:         { top: { core:['heartsteel','sunfire','anathemas','gargoyle'],                 boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','force_of_nature'] }},
  Teemo:        { top: { core:['liandrys','nashor_tooth','rabadon','void_staff'],              boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya','thornmail'],                 vsAP:['banshee','spirit_visage'] }},
  Tryndamere:   { top: { core:['galeforce','phantom_dancer','infinity_edge','mortal_reminder'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Urgot:        { top: { core:['divine_sunderer','serylda','black_cleaver','sterak'],          boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Volibear:     { top: { core:['sunfire','titanic_hydra','warmog','gargoyle'],                 boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','abyssal_mask'] }},
  Yorick:       { top: { core:['hullbreaker','serylda','black_cleaver','mortal_reminder'],     boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','maw'] }},
  Vayne:        { top: { core:['galeforce','botrk','mortal_reminder','wit_end'],               boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},

  // ╔════════════════════════════════╗
  // ║        JUNGLERS                ║
  // ╚════════════════════════════════╝
  Amumu:        { jungle: { core:['sunfire','frozen_heart','anathemas','warmog'],              boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Belveth:      { jungle: { core:['botrk','wit_end','guinsoo','mortal_reminder'],              boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','spirit_visage'] }},
  Briar:        { jungle: { core:['eclipse','titanic_hydra','deaths_dance','sterak'],          boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Diana:        { jungle: { core:['liandrys','nashor_tooth','rabadon','void_staff'],           boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee','spirit_visage'] }},
  Ekko:         { jungle: { core:['riftmaker','cosmic_drive','rabadon','void_staff'],          boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya','abyssal_mask'],              vsAP:['banshee'] }},
  Elise:        { jungle: { core:['luden','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Evelynn:      { jungle: { core:['luden','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Graves:       { jungle: { core:['eclipse','serylda','deaths_dance','mortal_reminder'],       boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['lord_dominik'],                        vsAP:['maw','banshee'] }},
  Hecarim:      { jungle: { core:['divine_sunderer','black_cleaver','deaths_dance','sterak'],  boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['maw','spirit_visage'] }},
  JarvanIV:     { jungle: { core:['divine_sunderer','black_cleaver','frozen_heart','gargoyle'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Kayn:         { jungle: { core:['divine_sunderer','serylda','deaths_dance','sterak'],        boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Khazix:       { jungle: { core:['lethality_mythic','edge_of_night','serylda','mortal_reminder'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                    vsAP:['maw'] }},
  LeeSin:       { jungle: { core:['divine_sunderer','black_cleaver','deaths_dance','sterak'],  boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Lillia:       { jungle: { core:['liandrys','rocketbelt','rabadon','void_staff'],             boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  MasterYi:     { jungle: { core:['kraken_slayer','botrk','guinsoo','mortal_reminder'],        boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Nocturne:     { jungle: { core:['stridebreaker','serylda','deaths_dance','sterak'],          boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder'],                     vsAP:['maw','banshee'] }},
  Rengar:       { jungle: { core:['eclipse','edge_of_night','serylda','mortal_reminder'],      boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Sejuani:      { jungle: { core:['sunfire','frozen_heart','anathemas','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Viego:        { jungle: { core:['divine_sunderer','black_cleaver','deaths_dance','sterak'],  boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Vi:           { jungle: { core:['divine_sunderer','black_cleaver','sterak','gargoyle'],      boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['abyssal_mask','spirit_visage'] }},
  Warwick:      { jungle: { core:['divine_sunderer','titanic_hydra','sterak','gargoyle'],      boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','force_of_nature'] }},
  XinZhao:      { jungle: { core:['divine_sunderer','black_cleaver','sterak','deaths_dance'],  boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['mortal_reminder','thornmail'],         vsAP:['maw','spirit_visage'] }},
  Zac:          { jungle: { core:['sunfire','frozen_heart','anathemas','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},

  // ╔════════════════════════════════╗
  // ║        MID LANERS              ║
  // ╚════════════════════════════════╝
  Ahri:         { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Akali:        { mid: { core:['riftmaker','nashor_tooth','rabadon','void_staff'],             boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Anivia:       { mid: { core:['liandrys','crown','rabadon','void_staff'],                     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Annie:        { mid: { core:['liandrys','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  AurelionSol:  { mid: { core:['liandrys','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Azir:         { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Cassiopeia:   { mid: { core:['liandrys','rocketbelt','rabadon','void_staff'],                boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee','spirit_visage'] }},
  Fizz:         { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Galio:        { mid: { core:['sunfire','anathemas','abyssal_mask','gargoyle'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart','thornmail'],           vsAP:['spirit_visage','force_of_nature'] }},
  Hwei:         { mid: { core:['liandrys','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Kassadin:     { mid: { core:['everfrost','riftmaker','rabadon','void_staff'],                boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Katarina:     { mid: { core:['riftmaker','nashor_tooth','rabadon','void_staff'],             boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  LeBlanc:      { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Lux:          { mid: { core:['crown','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Naafiri:      { mid: { core:['eclipse','serylda','edge_of_night','mortal_reminder'],         boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Orianna:      { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Qiyana:       { mid: { core:['lethality_mythic','edge_of_night','serylda','mortal_reminder'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Ryze:         { mid: { core:['liandrys','cosmic_drive','rabadon','void_staff'],              boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Syndra:       { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  TwistedFate:  { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Viktor:       { mid: { core:['liandrys','shadowflame','rabadon','void_staff'],               boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},
  Vladimir:     { mid: { core:['riftmaker','cosmic_drive','rabadon','void_staff'],             boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee','spirit_visage'] }},
  Yasuo:        { mid: { core:['immortal_shieldbow','infinity_edge','mortal_reminder','phantom_dancer'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],              vsAP:['maw','banshee'] }},
  Yone:         { mid: { core:['immortal_shieldbow','infinity_edge','mortal_reminder','serylda'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                     vsAP:['maw','banshee'] }},
  Zed:          { mid: { core:['eclipse','serylda','edge_of_night','mortal_reminder'],         boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Zoe:          { mid: { core:['luden','shadowflame','rabadon','void_staff'],                  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya'],                             vsAP:['banshee'] }},

  // ╔════════════════════════════════╗
  // ║        ATIRADORES (BOT)        ║
  // ╚════════════════════════════════╝
  Aphelios:     { bot: { core:['galeforce','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Ashe:         { bot: { core:['kraken_slayer','botrk','mortal_reminder','phantom_dancer'],    boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Caitlyn:      { bot: { core:['galeforce','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Draven:       { bot: { core:['galeforce','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Ezreal:       { bot: { core:['trinity_force','serylda','deaths_dance','mortal_reminder'],    boots:'ionian_boots', bootsVsCC:'merc_treads', vsAD:['lord_dominik'],                     vsAP:['maw','banshee'] }},
  Jhin:         { bot: { core:['galeforce','mortal_reminder','infinity_edge','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  Jinx:         { bot: { core:['kraken_slayer','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],          vsAP:['maw','banshee'] }},
  Kaisa:        { bot: { core:['immortal_shieldbow','nashor_tooth','rabadon','void_staff'],    boots:'berserker', bootsVsCC:'merc_treads', vsAD:['sterak'],                              vsAP:['banshee'] }},
  Kalista:      { bot: { core:['kraken_slayer','botrk','mortal_reminder','phantom_dancer'],    boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},
  KogMaw:       { bot: { core:['kraken_slayer','guinsoo','rabadon','void_staff'],              boots:'berserker', bootsVsCC:'merc_treads', vsAD:['sterak'],                              vsAP:['banshee'] }},
  Lucian:       { bot: { core:['divine_sunderer','serpents_fang','mortal_reminder','edge_of_night'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                  vsAP:['maw'] }},
  MissFortune:  { bot: { core:['kraken_slayer','mortal_reminder','infinity_edge','lord_dominik'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                     vsAP:['maw'] }},
  Nilah:        { bot: { core:['immortal_shieldbow','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],              vsAP:['maw'] }},
  Samira:       { bot: { core:['immortal_shieldbow','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],     vsAP:['maw','banshee'] }},
  Senna:        { bot: { core:['immortal_shieldbow','mortal_reminder','serpents_fang','rabadon'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                     vsAP:['banshee'] }},
  Sivir:        { bot: { core:['kraken_slayer','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                   vsAP:['maw'] }},
  Tristana:     { bot: { core:['galeforce','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Twitch:       { bot: { core:['kraken_slayer','guinsoo','rabadon','mortal_reminder'],         boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['banshee'] }},
  Varus:        { bot: { core:['kraken_slayer','mortal_reminder','lord_dominik','infinity_edge'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                     vsAP:['maw'] }},
  Vayne:        { bot: { core:['galeforce','botrk','mortal_reminder','wit_end'],               boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Xayah:        { bot: { core:['galeforce','infinity_edge','mortal_reminder','phantom_dancer'],boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance','sterak'],              vsAP:['maw','banshee'] }},
  Zeri:         { bot: { core:['kraken_slayer','botrk','mortal_reminder','wit_end'],           boots:'berserker', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                        vsAP:['maw'] }},

  // ╔════════════════════════════════╗
  // ║        SUPORTES                ║
  // ╚════════════════════════════════╝
  Alistar:      { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Bard:         { support: { core:['moonstone','staff_ages','redemption','ardent_censer'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart','thornmail'],           vsAP:['force_of_nature'] }},
  Blitzcrank:   { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Braum:        { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Janna:        { support: { core:['moonstone','shurelyas','ardent_censer','redemption'],      boots:'swiftness', bootsVsCC:'merc_treads', vsAD:['frozen_heart','thornmail'],            vsAP:['spirit_visage'] }},
  Karma:        { support: { core:['shurelyas','imperial_mandate','locket','redemption'],      boots:'ionian_boots', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                    vsAP:['banshee'] }},
  Leona:        { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Lulu:         { support: { core:['moonstone','ardent_censer','staff_ages','redemption'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                       vsAP:['spirit_visage'] }},
  Milio:        { support: { core:['moonstone','ardent_censer','staff_ages','redemption'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                       vsAP:['spirit_visage'] }},
  Morgana:      { support: { core:['imperial_mandate','chemtech_putrifier','locket','zhonya'], boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart','thornmail'],           vsAP:['banshee'] }},
  Nami:         { support: { core:['moonstone','ardent_censer','staff_ages','redemption'],     boots:'swiftness', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                        vsAP:['spirit_visage'] }},
  Nautilus:     { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Pyke:         { support: { core:['lethality_mythic','edge_of_night','serylda','mortal_reminder'],boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['deaths_dance'],                   vsAP:['maw'] }},
  Rakan:        { support: { core:['shurelyas','locket','ardent_censer','redemption'],         boots:'swiftness', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                        vsAP:['spirit_visage'] }},
  Renata:       { support: { core:['imperial_mandate','chemtech_putrifier','locket','zhonya'], boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],           vsAP:['banshee'] }},
  Seraphine:    { support: { core:['moonstone','staff_ages','ardent_censer','redemption'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                       vsAP:['banshee'] }},
  Sona:         { support: { core:['moonstone','ardent_censer','staff_ages','redemption'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart','thornmail'],           vsAP:['spirit_visage'] }},
  Soraka:       { support: { core:['moonstone','staff_ages','redemption','mikael'],            boots:'swiftness', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                        vsAP:['spirit_visage'] }},
  Tahm:         { support: { core:['locket','anathemas','abyssal_mask','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','frozen_heart'],            vsAP:['spirit_visage','force_of_nature'] }},
  Taric:        { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Thresh:       { support: { core:['locket','anathemas','frozen_heart','gargoyle'],            boots:'steelcaps', bootsVsCC:'merc_treads', vsAD:['thornmail','randuins'],                vsAP:['abyssal_mask','spirit_visage'] }},
  Yuumi:        { support: { core:['moonstone','staff_ages','ardent_censer','redemption'],     boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                       vsAP:['spirit_visage'] }},
  Zilean:       { support: { core:['moonstone','staff_ages','redemption','ardent_censer'],     boots:'ionian_boots', bootsVsCC:'merc_treads', vsAD:['frozen_heart'],                    vsAP:['spirit_visage'] }},
  Zyra:         { support: { core:['imperial_mandate','liandrys','shadowflame','void_staff'],  boots:'sorc_shoes', bootsVsCC:'merc_treads', vsAD:['zhonya','thornmail'],                 vsAP:['banshee'] }},
};

// ─── Roles que cada campeão geralmente ocupa ──────────────────────────────────
// (para buscar o build correto quando o role não é fornecido explicitamente)
const CHAMPION_PRIMARY_ROLES = {
  // Top
  Aatrox:'top',    Camille:'top',   Darius:'top',  Fiora:'top',    Gangplank:'top',
  Garen:'top',     Gnar:'top',      Gwen:'top',     Illaoi:'top',   Irelia:'top',
  Jax:'top',       Jayce:'top',     KSante:'top',   Malphite:'top', Mordekaiser:'top',
  Nasus:'top',     Olaf:'top',      Ornn:'top',     Renekton:'top', Riven:'top',
  Sett:'top',      Shen:'top',      Sion:'top',     Teemo:'top',    Tryndamere:'top',
  Urgot:'top',     Volibear:'top',  Yorick:'top',
  // Jungle
  Amumu:'jungle',  Belveth:'jungle', Briar:'jungle', Diana:'jungle',  Ekko:'jungle',
  Elise:'jungle',  Evelynn:'jungle', Graves:'jungle', Hecarim:'jungle',JarvanIV:'jungle',
  Kayn:'jungle',   Khazix:'jungle', LeeSin:'jungle', Lillia:'jungle', MasterYi:'jungle',
  Nocturne:'jungle',Rengar:'jungle', Sejuani:'jungle',Viego:'jungle',  Vi:'jungle',
  Warwick:'jungle',XinZhao:'jungle',Zac:'jungle',
  // Mid
  Ahri:'mid',      Akali:'mid',     Anivia:'mid',   Annie:'mid',     AurelionSol:'mid',
  Azir:'mid',      Cassiopeia:'mid',Fizz:'mid',     Galio:'mid',     Hwei:'mid',
  Kassadin:'mid',  Katarina:'mid',  LeBlanc:'mid',  Lux:'mid',       Naafiri:'mid',
  Orianna:'mid',   Qiyana:'mid',    Ryze:'mid',     Syndra:'mid',    TwistedFate:'mid',
  Viktor:'mid',    Vladimir:'mid',  Yasuo:'mid',    Yone:'mid',      Zed:'mid',
  Zoe:'mid',
  // Bot
  Aphelios:'bot',  Ashe:'bot',      Caitlyn:'bot',  Draven:'bot',    Ezreal:'bot',
  Jhin:'bot',      Jinx:'bot',      Kaisa:'bot',    Kalista:'bot',   KogMaw:'bot',
  Lucian:'bot',    MissFortune:'bot',Nilah:'bot',   Samira:'bot',    Senna:'bot',
  Sivir:'bot',     Tristana:'bot',  Twitch:'bot',   Varus:'bot',     Vayne:'bot',
  Xayah:'bot',     Zeri:'bot',
  // Support
  Alistar:'support',Bard:'support',  Blitzcrank:'support',Braum:'support',Janna:'support',
  Karma:'support', Leona:'support',  Lulu:'support', Milio:'support', Morgana:'support',
  Nami:'support',  Nautilus:'support',Pyke:'support',Rakan:'support', Renata:'support',
  Seraphine:'support',Sona:'support',Soraka:'support',Tahm:'support', Taric:'support',
  Thresh:'support',Yuumi:'support',  Zilean:'support',Zyra:'support',
};

/**
 * Busca o build de um campeão pelo role do DDragon.
 * @param {string} champId - ex: "Aatrox"
 * @param {number} slotIndex - 0=top, 1=jungle, 2=mid, 3=bot, 4=support
 */
export function getChampionBuild(champId, slotIndex) {
  if (!champId) return null;
  const entry = CHAMPION_BUILDS[champId];
  if (!entry) return null;

  const roleBySlot = ['top','jungle','mid','bot','support'][slotIndex] || 'top';
  // Tenta pelo slot atual, senão pelo role primário, senão pega a primeira entrada disponível
  return entry[roleBySlot] || entry[CHAMPION_PRIMARY_ROLES[champId]] || Object.values(entry)[0] || null;
}

/**
 * Resolve um item-key para um item DDragon real.
 * Tenta múltiplos name fragments até encontrar.
 * @param {object} allItems - Mapa de itens do DDragon
 * @param {string} key - Chave do ITEM_SEARCH
 * @returns {object|null}
 */
export function resolveItem(allItems, key) {
  const fragments = ITEM_SEARCH[key];
  if (!fragments || !allItems) return null;

  for (const fragment of fragments) {
    const found = Object.values(allItems).find(
      (item) => item.name.toLowerCase().includes(fragment.toLowerCase())
    );
    if (found) return found;
  }
  return null;
}

/**
 * Resolve um array de item-keys para itens DDragon reais.
 * Itens não encontrados são silenciosamente ignorados.
 */
export function resolveItems(allItems, keys = []) {
  return keys.map((key) => resolveItem(allItems, key)).filter(Boolean);
}
