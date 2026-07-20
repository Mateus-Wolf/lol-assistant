/**
 * Base de conhecimento de campeões — perfis, power spikes e sinergias.
 * Usada pelo motor de análise tática para gerar dicas ricas e específicas.
 */

// ─── Perfis por campeão ───────────────────────────────────────────────────────
// early/mid/late: 1–5 (5 = mais forte nesse período)
// archetype: estilo de jogo principal
// spike: momento-chave de poder
// description: dica tática principal

export const CHAMPION_PROFILES = {
  // ╔══════════════════════════════╗
  // ║         TOP LANERS           ║
  // ╚══════════════════════════════╝
  Aatrox:      { early:3, mid:5, late:4, spike:'2º item / Nível 11', archetype:['all-in','sustain','teamfight'], range:'melee', description:'Domine o mid game após o 2º item. Force trocas longas e use Q com precisão. Evite CC pesado no teamfight.' },
  Camille:     { early:3, mid:5, late:4, spike:'2º item', archetype:['split','all-in'], range:'melee', description:'Splitpusher elite. Use E para engajar e R para isolar carries. Evite teamfights abertas desfavoráveis.' },
  Darius:      { early:5, mid:4, late:3, spike:'Nível 6', archetype:['all-in','juggernaut'], range:'melee', description:'Devastador no early. Force trocas longas para acumular stacks de sangramento. No late, precise de aliados para isolar alvos.' },
  Fiora:       { early:4, mid:5, late:5, spike:'2º item', archetype:['split','duelist'], range:'melee', description:'Domina 1v1 no late game. Acerte os vitais do inimigo para cura e dano. Splitpush sempre que possível.' },
  Gangplank:   { early:2, mid:3, late:5, spike:'3º item / Nível 13', archetype:['poke','teamfight','split'], range:'mixed', description:'Fraco no early. Farm e acumule ouro calmamente. No late, barris + R global são devastadores.' },
  Garen:       { early:5, mid:4, late:3, spike:'Nível 6 / 1º item', archetype:['all-in','sustain'], range:'melee', description:'Poderoso no early. Force trocas rápidas e recue para regenerar. No late, seja o frontline que inicia para o time.' },
  Gnar:        { early:3, mid:4, late:4, spike:'Mega Gnar', archetype:['poke','engage','teamfight'], range:'ranged', description:'Poke no early como Mini Gnar. No teamfight, aguarde a raiva máxima e use GNAR! contra uma parede para CC massivo.' },
  Gwen:        { early:3, mid:5, late:4, spike:'2º item', archetype:['all-in','sustain'], range:'melee', description:'Excelente contra tanks com dano verdadeiro. O W bloqueia projéteis — use durante trocas. Vulnerável a assassinos.' },
  Illaoi:      { early:4, mid:5, late:4, spike:'Nível 7 / 2º item', archetype:['sustain','all-in'], range:'melee', description:'Extremamente poderosa em lane. Use o E para invocar o tentáculo na alma do inimigo. Evite engajar com muitos inimigos — sem o split ela é mais fraca.' },
  Irelia:      { early:4, mid:5, late:4, spike:'5 stacks de Ionianos', archetype:['all-in','teamfight'], range:'melee', description:'Ative as 5 stacks antes de engajar. Com stacks ativas, use Q em tropas para resetar e destruir o inimigo.' },
  Jax:         { early:3, mid:4, late:5, spike:'2º item / Nível 11', archetype:['split','duelist'], range:'melee', description:'Um dos melhores 1v1 do late game. Escale até 2-3 itens e então domine qualquer duelista. Use E para bloquear ataques básicos.' },
  Jayce:       { early:5, mid:4, late:3, spike:'Nível 7 / 1º item', archetype:['poke','all-in'], range:'mixed', description:'Domina o early com alternância de formas. Poke de longe e troque no corpo-a-corpo quando o inimigo estiver fraco.' },
  KSante:      { early:3, mid:4, late:5, spike:'2º item', archetype:['engage','teamfight'], range:'melee', description:'Frontline elite no late. Gerencie os Q stacks para stun e use R para criar jogadas individuais nos carries inimigos.' },
  Malphite:    { early:3, mid:4, late:5, spike:'Nível 6 / 1º item', archetype:['engage','teamfight'], range:'melee', description:'Aguarde os itens de armadura e use R para engagamento decisivo. Devastador contra times full AD.' },
  Mordekaiser: { early:4, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['all-in','sustain'], range:'melee', description:'Isole carries com R e os elimine em 1v1. Use o escudo de W para absorver burst.' },
  Nasus:       { early:2, mid:3, late:5, spike:'200+ stacks', archetype:['split','sustain'], range:'melee', description:'Foco total em farmar stacks no early. Com 300+ stacks e itens, torna-se imbatível. Evite confrontos desnecessários antes do 2º item.' },
  Olaf:        { early:5, mid:4, late:3, spike:'Nível 6 / 1º item', archetype:['all-in','sustain'], range:'melee', description:'Use R para ignorar CC e destruir carries. Quanto mais HP perder, mais rápido fica. Feche a partida antes do late.' },
  Ornn:        { early:3, mid:4, late:5, spike:'3º item / Nível 13', archetype:['engage','teamfight'], range:'melee', description:'Escala muito com itens de aliados. No teamfight, combo de Q + R para knockups em área é devastador.' },
  Renekton:    { early:5, mid:5, late:2, spike:'Nível 3-6', archetype:['all-in','bully'], range:'melee', description:'Um dos mais fortes no early-mid. Domine a lane e crie pressão. Cai muito no late — feche a partida antes dos 25 min.' },
  Riven:       { early:4, mid:5, late:4, spike:'2º item / Nível 9', archetype:['all-in','split'], range:'melee', description:'Exige mecânica. Com bom jogo, é devastadora no mid game. Combo de E+Q+W e execute com R.' },
  Sett:        { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','engage','teamfight'], range:'melee', description:'Use Grit para devolver dano verdadeiro. No teamfight, R em cima de aliados causa dano massivo em área.' },
  Shen:        { early:3, mid:4, late:4, spike:'Nível 6', archetype:['engage','utility','global'], range:'melee', description:'R global para resgatar aliados. Use a presença global para influenciar lutas no mapa inteiro enquanto mantém pressão na rota.' },
  Sion:        { early:3, mid:4, late:5, spike:'2º item', archetype:['engage','teamfight'], range:'melee', description:'Escala com farm. No teamfight, Q carregado + R para invadir a linha inimiga é devastador.' },
  Teemo:       { early:4, mid:4, late:4, spike:'1º item / Nível 5', archetype:['poke','split'], range:'ranged', description:'Excelente contra melee. Poke pesado com Q cegueira. Use cogumelos para visão e slow. Cuidado ao engajar no late.' },
  Tryndamere:  { early:3, mid:4, late:5, spike:'2º item / Fúria máxima', archetype:['split','hypercarry'], range:'melee', description:'Splitpusher definitivo. Com R para sobreviver e Fúria máxima para burst, destrói structures rapidamente.' },
  Urgot:       { early:3, mid:5, late:4, spike:'2º item', archetype:['all-in','poke'], range:'mixed', description:'Excelente contra tanks — dano em % de HP. Use E para imobilizar e R para executar inimigos com pouco HP.' },
  Volibear:    { early:4, mid:4, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','engage'], range:'melee', description:'R desativa torres temporariamente — use para mergulhos sob torre. Forte em duelos e engages.' },
  Yorick:      { early:3, mid:4, late:5, spike:'2º item', archetype:['split'], range:'melee', description:'Imparável no split push com a Maiden e o exército. Mantenha pressão lateral enquanto aliados ameaçam objetivos.' },

  // ╔══════════════════════════════╗
  // ║         JUNGLERS             ║
  // ╚══════════════════════════════╝
  Amumu:       { early:3, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['engage','teamfight'], range:'melee', description:'R de teamfight fenomenal. Ganke com Q e aguarde nível 6 para lutas decisivas. Pair ideal com carries que precisam de setup.' },
  Belveth:     { early:4, mid:5, late:5, spike:'2º item / Stacks de Lavender', archetype:['hypercarry','all-in'], range:'melee', description:'Escala absurdamente com stacks. Limpe eficientemente e domine no late com DPS insano.' },
  Briar:       { early:5, mid:5, late:3, spike:'Nível 3-6', archetype:['all-in','bully'], range:'melee', description:'Extremamente agressiva no early. Ganke cedo e frequentemente. Sua vida se regenera em combate.' },
  Diana:       { early:4, mid:5, late:4, spike:'Nível 6', archetype:['all-in','burst'], range:'melee', description:'Q marca para R devastador. Ganke mid após nível 6 — combo Q+R em carries é letal.' },
  Ekko:        { early:3, mid:5, late:4, spike:'2º item', archetype:['burst','all-in'], range:'melee', description:'R de reviver pode mudar teamfights. Hit com W para stun de área e use R estrategicamente.' },
  Elise:       { early:5, mid:4, late:2, spike:'Nível 3-6', archetype:['burst','engage'], range:'mixed', description:'Uma das mais fortes no early game. Ganke agressivamente antes do inimigo crescer. Cai muito no late.' },
  Evelynn:     { early:2, mid:5, late:4, spike:'Nível 6', archetype:['burst','all-in'], range:'melee', description:'Invisibilidade permanente após 6 para ganks letais. Farm seguro early e exploda no mid game. Guarde R para execute.' },
  Graves:      { early:4, mid:5, late:4, spike:'1º item', archetype:['all-in','burst'], range:'ranged', description:'Alto dano e mobilidade. Excelente em duelos na selva. Fagulheiro Q causa dano massivo à queima-roupa.' },
  Hecarim:     { early:3, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['engage','teamfight'], range:'melee', description:'Ganks letais com velocidade + R. Percursos longos para surpreender. No teamfight, R + E = fear + knockback devastador.' },
  Ivern:       { early:2, mid:3, late:5, spike:'3º item', archetype:['utility','support'], range:'ranged', description:'Suporte da selva. Forneça Daisy! para teamfights e use arbustos para visão. Escala bem no late com aliados.' },
  JarvanIV:    { early:4, mid:4, late:4, spike:'Nível 6 / 1º item', archetype:['engage','teamfight'], range:'melee', description:'E+Q knockup confiável. R isola carries — cuidado para não prender aliados também.' },
  Kayn:        { early:3, mid:4, late:5, spike:'Transformação completa', archetype:['all-in','burst'], range:'melee', description:'Complete a transformação cedo. Darkin para sustain e tank, Sombra para burst assassino.' },
  Khazix:      { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee', description:'Evolua Q para burst máximo em alvos isolados. Isole carries que estejam sozinhos para bônus de isolamento.' },
  Kindred:     { early:4, mid:4, late:4, spike:'3+ stacks', archetype:['hypercarry','poke'], range:'ranged', description:'Acumule stacks de Caçada para escalar. R pode salvar aliados — timing é crucial.' },
  LeeSin:      { early:5, mid:4, late:2, spike:'Nível 3 / Early game', archetype:['all-in','engage'], range:'melee', description:'Rei do early — insec, ganks e counter-jungle. Domine os primeiros 15 minutos e converta vantagem antes do late.' },
  Lillia:      { early:3, mid:4, late:4, spike:'2º item', archetype:['poke','teamfight'], range:'melee', description:'R adormece o time inimigo — combo poderoso em teamfights. Use E para poke seguro e escape.' },
  MasterYi:    { early:2, mid:4, late:5, spike:'2º item / 3+ itens', archetype:['hypercarry','all-in'], range:'melee', description:'Farm calmamente e escale. Com 3+ itens, limpa teamfights inteiras. Precisa de proteção para chegar ao late.' },
  Nidalee:     { early:5, mid:4, late:3, spike:'Nível 3-6', archetype:['poke','burst'], range:'mixed', description:'Poke de longo alcance com lanças. Ganke eficientemente e foque nos alvos feridos pela lança.' },
  Nocturne:    { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','burst'], range:'melee', description:'R transforma qualquer rota em gank mortal com blackout global. Caçe carries isolados após o ult.' },
  Nunu:        { early:3, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['engage','teamfight'], range:'melee', description:'Invada e force duelos na selva. R em área com aliados de poke/burst é devastador.' },
  Rammus:      { early:3, mid:4, late:4, spike:'1º item', archetype:['engage','all-in'], range:'melee', description:'Contra times full AD ele é imparável. Powerball Q para ganks rápidos e R para teamfights.' },
  Reksai:      { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','engage'], range:'melee', description:'Mobilidade de túneis e R global. Ganke de forma imprevisível e use R para aparecer onde o inimigo não espera.' },
  Rengar:      { early:4, mid:5, late:4, spike:'1º item / Nível 6', archetype:['burst','all-in'], range:'melee', description:'Predador puro. Acumule ferocidade e exploda carries com invisibilidade + Q empowered. Caçe alvos solitários.' },
  Sejuani:     { early:3, mid:4, late:5, spike:'Nível 6 / 2º item', archetype:['engage','teamfight'], range:'melee', description:'R de CC longa distância para engage ou interrupção. No late, frontline de CC massivo. Pair com carries de burst.' },
  Shaco:       { early:4, mid:4, late:3, spike:'Nível 3-6', archetype:['burst','split'], range:'melee', description:'Medo psicológico com caixinhas. Use clones para confundir e Q + backstab para abates. Eficaz em split push.' },
  Shyvana:     { early:3, mid:4, late:5, spike:'3º item / Dragões', archetype:['teamfight','hypercarry'], range:'melee', description:'Escala com mata-dragões. No late com R, é um devastador de teamfights em área.' },
  Skarner:     { early:4, mid:5, late:4, spike:'2º item', archetype:['engage','all-in'], range:'melee', description:'R sequestra o carry mais importante. Engaje com E+Q para slow e entre com R no momento ideal.' },
  Taliyah:     { early:3, mid:5, late:4, spike:'2º item', archetype:['burst','teamfight'], range:'ranged', description:'Poke de longa distância e teamfight com W (trabalhado). R para mobilidade global e corte de rotas.' },
  Viego:       { early:3, mid:5, late:5, spike:'Nível 6 / 1º item', archetype:['all-in','hypercarry'], range:'melee', description:'Possessão pode virar teamfights instantaneamente. Pratique timing e priorize a posse dos carries inimigos.' },
  Vi:          { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','engage'], range:'melee', description:'R bloqueia o carry inimigo em stunlook. Engaje Q e use R para pinear o carry mais perigoso.' },
  Warwick:     { early:4, mid:4, late:4, spike:'Nível 6 / 1º item', archetype:['all-in','sustain'], range:'melee', description:'Sustain alto e R poderoso. Caçe inimigos com pouco HP — passivo detecta eles de longe. Bom para iniciantes.' },
  Wukong:      { early:4, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['all-in','teamfight'], range:'melee', description:'R duplo pode reverter teamfights. Clone engana inimigos — use para escapar ou distrair.' },
  XinZhao:     { early:5, mid:4, late:3, spike:'Nível 3 / 1º item', archetype:['all-in','engage'], range:'melee', description:'Um dos mais fortes no nível 3. Ganke desde cedo. R remove dashes no teamfight — use no momento do engage.' },
  Zac:         { early:3, mid:5, late:5, spike:'Nível 6 / 2º item', archetype:['engage','teamfight'], range:'melee', description:'E de longa distância para engage surpresa. R de bounce mantém CC ativo. Blobs ressuscitam — elimine-os.' },

  // ╔══════════════════════════════╗
  // ║         MID LANERS           ║
  // ╚══════════════════════════════╝
  Ahri:        { early:3, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['burst','roam'], range:'ranged', description:'Excelente para roam após nível 6. Acerte o encantamento Q para slow antes de usar R+E. Influencie outras rotas.' },
  Akali:       { early:3, mid:5, late:5, spike:'Nível 6 / 2º item', archetype:['burst','all-in'], range:'melee', description:'Fraca pré-6. Com R, mobilidade e invisibilidade de W a tornam muito difícil de pegar. Poke no W e exploda com R.' },
  Anivia:      { early:2, mid:4, late:5, spike:'3º item', archetype:['poke','teamfight'], range:'ranged', description:'Escale para o late e domine com R de controle de área. Use parede de Muro de Cristal estrategicamente para separar times.' },
  Annie:       { early:4, mid:5, late:4, spike:'Nível 6 / Stun carregado', archetype:['burst','engage'], range:'ranged', description:'Stun carregado + R + Tibbers é devastador. Mantenha sempre o stun carregado antes de engajar.' },
  AurelionSol: { early:2, mid:4, late:5, spike:'3º item', archetype:['poke','teamfight','hypercarry'], range:'ranged', description:'Fraco no early. Escale e domine com stardust. No late, uma das maiores capacidades de teamfight do jogo.' },
  Azir:        { early:2, mid:4, late:5, spike:'3º item', archetype:['poke','teamfight','hypercarry'], range:'ranged', description:'Farm seguro no early. No late, soldados + R Emperor\'s Divide controla teamfights completamente.' },
  Cassiopeia: { early:3, mid:5, late:5, spike:'2º item / Nível 9', archetype:['poke','hypercarry'], range:'ranged', description:'DPS mágico absurdo no late. Envenene com Q e descarregue E. R paralisa inimigos que te encaram.' },
  Fizz:        { early:3, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee', description:'Extremamente difícil de pegar com E. Combo Q+E+R é letal em carries. Pulo salva de muitos skillshots.' },
  Galio:       { early:3, mid:4, late:4, spike:'Nível 6', archetype:['engage','global','utility'], range:'melee', description:'R global para ajudar aliados. Tankão com CC massivo. Forte contra times de dano mágico.' },
  Hwei:        { early:3, mid:4, late:5, spike:'2º item', archetype:['poke','teamfight'], range:'ranged', description:'Versatilidade de 10 feitiços. Use a combinação certa para cada situação. Devastador em teamfights com poke constante.' },
  Kassadin:    { early:2, mid:3, late:5, spike:'Nível 16 / 3º item', archetype:['burst','hypercarry'], range:'melee', description:'O late game carry definitivo. Sobreviva no early (é muito fraco!) e escale para nível 16 + 3 itens para ser imparável.' },
  Katarina:    { early:3, mid:5, late:4, spike:'Nível 6 / 2º item', archetype:['burst','teamfight'], range:'melee', description:'Entre após o CC inimigo e limpe times com R que reseta em abates. Muito forte quando o inimigo não tem supress.' },
  LeBlanc:     { early:4, mid:5, late:3, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'ranged', description:'Rainha do burst early-mid. Combo Q+W+R elimina carries. Caia no late — feche a partida antes dos 25 min.' },
  Lissandra:   { early:3, mid:4, late:4, spike:'Nível 6 / 2º item', archetype:['burst','engage'], range:'ranged', description:'R em si mesmo para se tornar intocável ou em inimigo para supress. Excelente contra divers e assassinos.' },
  Lux:         { early:3, mid:4, late:4, spike:'2º item', archetype:['poke','burst'], range:'ranged', description:'Poke e burst de longo alcance. Use Q para CC e R para executar. Posicione-se atrás da linha de frente.' },
  Malzahar:    { early:3, mid:4, late:4, spike:'Nível 6 / 2º item', archetype:['burst','engage'], range:'ranged', description:'R de supress é poderoso — garante abates em carries sem mobilidade. Voidlings fazem dano passivo constante.' },
  Naafiri:     { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee', description:'Assassina simples e eficaz. Pacote + R para investidas rápidas. Cachorros auxiliares causam dano extra.' },
  Orianna:     { early:3, mid:4, late:5, spike:'2º item / Com engajador aliado', archetype:['poke','teamfight','utility'], range:'ranged', description:'R com aliados de knockup (Malphite, J4) é a combo mais letal do jogo. Mantenha a bola no carry para proteção e dano.' },
  Qiyana:      { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee', description:'Burst altíssimo no mid game. Use o ambiente (rio, parede, erva) para maximizar elementos do Q. R em área é devastador.' },
  Ryze:        { early:2, mid:4, late:5, spike:'3º item', archetype:['poke','hypercarry'], range:'ranged', description:'Escale para 3 itens e domine com DPS de habilidades constante. R de teleporte pode mudar partidas.' },
  Syndra:      { early:4, mid:5, late:4, spike:'Nível 9 (Q max) / 2º item', archetype:['burst','poke'], range:'ranged', description:'Com 7 esferas o R pode one-shot carries. Poke com Q e use R em alvos com pouco HP. Muito forte contra imóveis.' },
  TwistedFate: { early:3, mid:4, late:4, spike:'Nível 6 / 1º item', archetype:['roam','utility'], range:'ranged', description:'R global para ganks e pressão de mapa. Carte Dourada garante CC. Influencie todo o mapa após nível 6.' },
  Viktor:      { early:3, mid:4, late:5, spike:'3º item', archetype:['poke','teamfight'], range:'ranged', description:'Escale com upgrades de habilidades. No late, E+R em área é devastador. Forte contra times que agrupam.' },
  Vladimir:    { early:2, mid:3, late:5, spike:'3º item', archetype:['sustain','teamfight'], range:'ranged', description:'Praticamente imortal no late com sustain de Q. R em teamfight amplifica todo dano recebido pelos inimigos afetados.' },
  Yasuo:       { early:3, mid:4, late:5, spike:'2º item / Com knockup aliado', archetype:['hypercarry','all-in'], range:'melee', description:'Exige knockup de aliados para usar R. Bloqueia projéteis com W. Escala muito bem e crítico constrói rápido.' },
  Yone:        { early:3, mid:4, late:5, spike:'2º item', archetype:['all-in','teamfight','hypercarry'], range:'melee', description:'Dano misto físico+mágico dificulta a defesa. R de longa distância para engage. Muito forte no late com itens.' },
  Zed:         { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee', description:'Assassino físico definitivo. R+W+Q é letal. Cuidado com Ampulheta de Zhonya. Fraco contra tanks.' },
  Zoe:         { early:4, mid:5, late:4, spike:'Nível 6 / 1º item', archetype:['burst','poke'], range:'ranged', description:'Q+E para burst de longa distância. O portal de R permite poke muito seguro. Acerte o E (Durmência) para R garantido.' },

  // ╔══════════════════════════════╗
  // ║         ATIRADORES           ║
  // ╚══════════════════════════════╝
  Aphelios:    { early:3, mid:4, late:5, spike:'Nível 9 / 2º item', archetype:['hypercarry','poke'], range:'ranged', description:'Versatilidade máxima de armas. Aprenda combinações de Gravitum+Crescendum para CC garantido. Devastador no late.' },
  Ashe:        { early:3, mid:4, late:4, spike:'2º item', archetype:['utility','poke','teamfight'], range:'ranged', description:'Utility ADC com slow constante e R de longa distância. Use R para iniciar teamfights ou interromper engage inimigo.' },
  Caitlyn:     { early:5, mid:4, late:3, spike:'1º item / Nível 7', archetype:['poke','hypercarry'], range:'ranged', description:'Maior alcance do early game. Poke seguro com headshots. Armadilhas E bloqueiam rotas e forcam posicionamento.' },
  Draven:      { early:5, mid:5, late:4, spike:'Early game / 1º item', archetype:['all-in','hypercarry'], range:'ranged', description:'Atirador mais forte no early. Cada abate com R aumenta dano permanentemente. Seja agressivo desde o início.' },
  Ezreal:      { early:3, mid:4, late:4, spike:'2º item', archetype:['poke','hypercarry'], range:'ranged', description:'Melhor mobilidade entre atiradores. Poke seguro com Q e fuja com E. Use R para wave clear de longe.' },
  Jhin:        { early:3, mid:4, late:5, spike:'2º item / 4º tiro', archetype:['poke','burst'], range:'ranged', description:'4º tiro é devastador. Use W para root de longa distância. Posicione-se bem antes de usar R.' },
  Jinx:        { early:2, mid:3, late:5, spike:'1º abate / 3º item', archetype:['hypercarry','teamfight'], range:'ranged', description:'Late game carry definitivo. Get Excited! após abates a torna imparável. Farm e deixe o time criar espaço no early.' },
  Kaisa:       { early:3, mid:4, late:5, spike:'2º item / Upgrades Q', archetype:['hypercarry','all-in'], range:'ranged', description:'Versátil AD ou AP. Use R para engajar em inimigos já marcados por aliados. Upgrade de Q com AP é devastador.' },
  Kalista:     { early:4, mid:4, late:4, spike:'1º item', archetype:['all-in','utility'], range:'ranged', description:'Jogue com suportes que possam usar Oathsworn (Alistar, Braum). Mobilidade única no bot torna difícil de targetar.' },
  KogMaw:      { early:2, mid:3, late:5, spike:'3º item', archetype:['hypercarry','poke'], range:'ranged', description:'Late game carry de maior alcance e DPS. Precisa de MUITA proteção (Lulu, Yuumi, Janna). Imbatível no late com suporte.' },
  Lucian:      { early:5, mid:5, late:3, spike:'1º item / Nível 7', archetype:['all-in','poke'], range:'ranged', description:'Domina no lane com agressividade. Feche a partida antes do late game onde ele é mais fraco.' },
  MissFortune: { early:4, mid:5, late:4, spike:'2º item', archetype:['burst','teamfight','poke'], range:'ranged', description:'R devastador com CC aliado (Amumu, Leona). Combine setup de CC com Chuva de Balas para eliminar times.' },
  Nilah:       { early:3, mid:5, late:5, spike:'2º item', archetype:['all-in','teamfight'], range:'melee', description:'Atirador melee único. Curte perto do action. R em área é muito forte em teamfights. Precisa de engage aliado.' },
  Samira:      { early:3, mid:5, late:5, spike:'S-Grade / 2º item', archetype:['hypercarry','all-in'], range:'mixed', description:'Acumule S-Grade encadeando ataques e habilidades variados. Entre com R após CC aliado para limpar times.' },
  Senna:       { early:3, mid:4, late:5, spike:'Stacks de Almas', archetype:['utility','hypercarry'], range:'ranged', description:'Escala com almas coletadas. Use o R global para salvar aliados ou limpar HP. Sustain de Q é muito valioso.' },
  Sivir:       { early:3, mid:4, late:4, spike:'2º item', archetype:['teamfight','utility'], range:'ranged', description:'R concede velocidade ao time inteiro — excelente para engage ou disengage. Forte em teamfights com seu R.' },
  Tristana:    { early:3, mid:4, late:5, spike:'2º item / Nível 11', archetype:['hypercarry','all-in'], range:'ranged', description:'Alcance cresce com nível — no late tem o maior do jogo. R expulsa divers. Use W para pular CC.' },
  Twitch:      { early:2, mid:3, late:5, spike:'3º item', archetype:['hypercarry','all-in'], range:'ranged', description:'Invisibilidade para flanqueamentos letais. No late, pode limpar um time inteiro com Disparo Ambush. Precisa chegar ao late.' },
  Varus:       { early:3, mid:4, late:4, spike:'2º item', archetype:['poke','teamfight'], range:'ranged', description:'R de CC de longa distância imobiliza e espalha para aliados. Poke pesado com Q carregado.' },
  Vayne:       { early:2, mid:3, late:5, spike:'2º item / Nível 11', archetype:['hypercarry','all-in'], range:'ranged', description:'A jogadora late game. Dano verdadeiro contra tanks e invisibilidade no R. Sobreviva e escale — ela vence qualquer 1v1 no late.' },
  Xayah:       { early:3, mid:4, late:5, spike:'2º item', archetype:['hypercarry','all-in'], range:'ranged', description:'Posicione penas e snappe com E para dano massivo. R invulnerável — guarde para sobreviver ao engage.' },
  Zeri:        { early:3, mid:4, late:5, spike:'2º item', archetype:['hypercarry','all-in'], range:'ranged', description:'Mobilidade extrema. Chase com Q e E. No late com R ativado, velocidade e dano explodem.' },

  // ╔══════════════════════════════╗
  // ║         SUPORTES             ║
  // ╚══════════════════════════════╝
  Alistar:     { early:5, mid:4, late:4, spike:'Nível 3 / Combo W+Q', archetype:['engage','utility'], range:'melee', description:'Combo W+Q é um dos melhores CC do jogo no nível 3. Use R para absorver burst e sobreviver a engages.' },
  Bard:        { early:3, mid:4, late:4, spike:'Meeks coletados', archetype:['utility','roam'], range:'ranged', description:'Roame para coletar Meeks e criar portais úteis. R de imobilização pode virar teamfights se bem utilizado.' },
  Blitzcrank:  { early:5, mid:4, late:3, spike:'Qualquer hook', archetype:['engage'], range:'melee', description:'Hook bem dado = abate garantido. Posicione em arbustos e force a posição inimiga. Ameaça constante.' },
  Braum:       { early:4, mid:4, late:4, spike:'Nível 6 / Stacks de Concussão', archetype:['engage','utility'], range:'melee', description:'E bloqueia projéteis — proteção inigualável. Acumule stacks de Concussão com aliados para stun garantido.' },
  Janna:       { early:3, mid:4, late:5, spike:'Qualquer nível', archetype:['disengage','utility'], range:'ranged', description:'Rainha do disengage. Use Q para slow/knockup e R para expulsar divers. Escale e proteja o carry no late.' },
  Karma:       { early:4, mid:4, late:4, spike:'1º item', archetype:['poke','utility'], range:'ranged', description:'Poke forte no early com Q mantrizado. Shield+speed para aliados com E. Versátil em poke e proteção.' },
  Leona:       { early:5, mid:5, late:4, spike:'Nível 3 / Combo E+Q+R', archetype:['engage','teamfight'], range:'melee', description:'E+Q+ignite mata qualquer carry no nível 3. No teamfight, R em área cria abertura para o time inteiro.' },
  Lulu:        { early:3, mid:4, late:5, spike:'Com hypercarry aliado', archetype:['utility','disengage'], range:'ranged', description:'Melhor suporte para hypercarrys. R no carry quando divers chegarem. Lulu + Jinx/Vayne/Kog = combo imbatível no late.' },
  Milio:       { early:3, mid:4, late:5, spike:'2º item', archetype:['utility','disengage'], range:'ranged', description:'Poke de longe e cura constante. R remove CC — timing perfeito pode salvar teamfights. Proteção de longo alcance.' },
  Morgana:     { early:3, mid:4, late:4, spike:'Nível 6', archetype:['utility','engage'], range:'ranged', description:'W de zona poderoso. E de escudo negro bloqueia CC em aliados. R perfeito para teamfights quando empoderado por Q.' },
  Nami:        { early:3, mid:4, late:4, spike:'Com atirador agressivo', archetype:['utility','engage'], range:'ranged', description:'E ativa bônus de slow em ataques do atirador. Combo poderoso com Lucian, Draven. R para disengage ou engage.' },
  Nautilus:    { early:4, mid:5, late:4, spike:'Nível 6 / Hook+R', archetype:['engage','teamfight'], range:'melee', description:'CC em TODA habilidade. Hook + R em cima do carry imobiliza completamente. Devastador com carries de burst.' },
  Pyke:        { early:4, mid:5, late:5, spike:'Nível 6 / Combo Q+R', archetype:['burst','engage'], range:'melee', description:'Assassino de suporte. R redistribui ouro para aliados. Faça roams e use R para abates que financiam o time.' },
  Rakan:       { early:3, mid:4, late:4, spike:'Nível 6 / Combo com Xayah', archetype:['engage','utility'], range:'melee', description:'Engaje e charm em área com R. Com Xayah, R combinado é devastador. Mobilidade do W surpreende inimigos.' },
  Renata:      { early:3, mid:4, late:5, spike:'Nível 6 / 2º item', archetype:['utility','engage'], range:'ranged', description:'R faz inimigos atacarem uns aos outros — combo com MissFortune R é devastador. Suporte único com mecânicas de controle.' },
  Seraphine:   { early:3, mid:4, late:5, spike:'2º item', archetype:['utility','poke'], range:'ranged', description:'R de longa distância que vincula múltiplos inimigos. Poke com Q passivo e cura/shield com E.' },
  Sona:        { early:3, mid:4, late:5, spike:'Nível 6 / 2º item', archetype:['utility','engage'], range:'ranged', description:'R de CC em área de longa distância para engage ou interrupção. Bônus passivos de aura aumentam com poke.' },
  Soraka:      { early:3, mid:4, late:5, spike:'Qualquer nível', archetype:['utility','sustain'], range:'ranged', description:'Cura global com R pode mudar fights em outros mapas. Pair com carries de late (Jinx, KogMaw) para dupla imbatível.' },
  Tahm:        { early:3, mid:3, late:4, spike:'Nível 6 / 2º item', archetype:['utility','engage'], range:'melee', description:'Devore aliados para salvá-los e inimigos para isolá-los. Escudo W enorme no late.' },
  Taric:       { early:3, mid:3, late:5, spike:'Nível 6 / R de invulnerabilidade', archetype:['utility','sustain'], range:'melee', description:'R de invulnerabilidade torna o time literalmente imortal por 2.5s. Time o R para anular o ult inimigo mais poderoso.' },
  Thresh:      { early:4, mid:5, late:5, spike:'Qualquer nível', archetype:['engage','utility','disengage'], range:'melee', description:'O suporte mais completo — hook, lanterna, knockback, caixa e CC passivo. Insec para posicionar aliados com lanterna.' },
  Yuumi:       { early:2, mid:3, late:5, spike:'3º item do carry', archetype:['utility','sustain'], range:'ranged', description:'Extremamente dependente do carry. Fique no carry mais forte. No late, bônus permanentes de Yuumi são muito fortes.' },
  Zilean:      { early:3, mid:4, late:5, spike:'Nível 6', archetype:['utility','disengage'], range:'ranged', description:'R revive aliados em qualquer lugar — timing perfeito é crucial. Bombas para slow+stun e bomba dupla para grande CC.' },
  Zyra:        { early:3, mid:4, late:4, spike:'Nível 6 / 2º item', archetype:['poke','engage'], range:'ranged', description:'Poke e controle de zona com plantas. R de knockup em área em teamfights. Vulnerável a assassinos.' },
};

// ─── Fallback por tipo de campeão ─────────────────────────────────────────────
// Para campeões sem perfil específico, usa o perfil do tipo mais próximo

const TYPE_FALLBACK_PROFILES = {
  Fighter: { early:4, mid:4, late:4, spike:'1º-2º item', archetype:['all-in','sustain'], range:'melee',
    description:'Domine sua rota com trocas sustentadas. Aproveite janelas de CD do inimigo para forçar combates.' },
  Tank: { early:3, mid:4, late:4, spike:'2º item', archetype:['engage','teamfight'], range:'melee',
    description:'Absorva dano e crie espaço para seus carries. Engaje quando aliados estiverem prontos para converter.' },
  Mage: { early:3, mid:4, late:4, spike:'2º item', archetype:['poke','burst'], range:'ranged',
    description:'Poke seguro de longe e use habilidades de alto dano com precisão. Posicione-se atrás da linha de frente.' },
  Assassin: { early:4, mid:5, late:3, spike:'Nível 6 / 1º item', archetype:['burst','all-in'], range:'melee',
    description:'Caçe carries isolados e elimine-os antes de serem protegidos. Jogue em torno do CC aliado para facilitar os engages.' },
  Marksman: { early:3, mid:4, late:5, spike:'2º-3º item', archetype:['hypercarry','poke'], range:'ranged',
    description:'Farm seguro no early e escale. No late, posicione-se bem e cause dano sustentado atrás da frontline.' },
  Support: { early:3, mid:4, late:4, spike:'Nível 6', archetype:['utility','engage'], range:'ranged',
    description:'Proteja seu carry e crie oportunidades de engajamento. Mantenha visão e comunique-se com o time.' },
};

/**
 * Retorna o perfil do campeão, com fallback por tipo.
 * @param {{ id: string, tags: string[] }} champ
 */
export function getChampionProfile(champ) {
  if (!champ) return null;
  if (CHAMPION_PROFILES[champ.id]) return CHAMPION_PROFILES[champ.id];
  // Fallback por tag principal
  const primaryTag = champ.tags?.[0];
  return TYPE_FALLBACK_PROFILES[primaryTag] || TYPE_FALLBACK_PROFILES.Fighter;
}

/**
 * Retorna rótulo legível para o pico de poder.
 */
export function getPowerPhaseLabel(profile) {
  if (!profile) return 'mid';
  const { early, mid, late } = profile;
  const max = Math.max(early, mid, late);
  if (max === late && late >= 4) return 'late';
  if (max === early && early >= 4) return 'early';
  return 'mid';
}

// ─── Sinergias conhecidas ─────────────────────────────────────────────────────
// strength: 'S' = tier máximo, 'A' = muito forte, 'B' = sólida

export const KNOWN_SYNERGIES = [
  // ── Combos de Ultimate ──────────────────────────────────────────────────
  { champions:['Malphite','Yasuo'],     name:'Golpe do Ar',          strength:'S', type:'ult-combo',      description:'Malphite usa Implacável para arremessar todos no ar — Yasuo usa Última Respiração no mesmo instante. Uma das combos mais devastadoras do jogo.' },
  { champions:['Malphite','Yone'],      name:'Implacável + Destino',  strength:'S', type:'ult-combo',      description:'R do Malphite ativa o R do Yone. Knock-up em área seguido de Destino é letal para qualquer time.' },
  { champions:['Orianna','Malphite'],   name:'Bola + Implacável',     strength:'S', type:'ult-combo',      description:'Orianna coloca a Bola no Malphite antes do engage. No R do Malphite, Shockwave chama todos ao centro para burst total.' },
  { champions:['Orianna','Amumu'],      name:'Choro da Donzela',      strength:'S', type:'ult-combo',      description:'Amumu imobiliza com R, Orianna usa Shockwave no centro. Burst mágico massivo em toda a equipe inimiga.' },
  { champions:['Amumu','MissFortune'],  name:'Chuva de Balas',        strength:'S', type:'ult-combo',      description:'Amumu prende o time inteiro com R. MissFortune canaliza R no centro com todos imóveis. Teamfight encerrada.' },
  { champions:['Leona','MissFortune'],  name:'Stun + Balas',          strength:'S', type:'ult-combo',      description:'Leona engaja com combo full CC, MissFortune usa R com todos agrupados e imóveis.' },
  { champions:['JarvanIV','Yasuo'],     name:'Flagrante + Última',    strength:'A', type:'ult-combo',      description:'E+Q do Jarvan cria knockup — Yasuo usa R imediatamente. Combo confiável e altamente sinérgico.' },
  { champions:['Wukong','Yasuo'],       name:'Macaco + Vento',        strength:'A', type:'ult-combo',      description:'R duplo do Wukong cria knockup em área para Yasuo usar Última Respiração. Muito difícil de escapar.' },
  { champions:['Renata','MissFortune'], name:'Aliados Raivosos',      strength:'S', type:'ult-combo',      description:'Renata R faz inimigos atacarem uns aos outros. MissFortune R com todos agrupados e se atacando é catastrófico.' },
  { champions:['Hecarim','Orianna'],    name:'Corrida + Donzela',     strength:'A', type:'ult-combo',      description:'Orianna coloca bola no Hecarim — no engage com R, Shockwave acerta todos os que foram arrastados.' },
  { champions:['Vi','Orianna'],         name:'Punk + Donzela',        strength:'A', type:'ult-combo',      description:'Vi usa R para pinear o carry inimigo. Orianna usa Shockwave no cluster reunido ao redor.' },
  { champions:['Gnar','Orianna'],       name:'Arremesso + Donzela',   strength:'A', type:'ult-combo',      description:'Mega Gnar lança inimigos contra parede. Orianna usa Shockwave no meio do grupo caoticamente reunido.' },
  { champions:['Jarvan IV','Katarina'], name:'Arena + Giroscópio',    strength:'B', type:'ult-combo',      description:'R do Jarvan IV cria arena onde Katarina pode usar R com muita dificuldade de ser interrompida.' },
  { champions:['Diana','Orianna'],      name:'Lua + Donzela',         strength:'A', type:'ult-combo',      description:'Diana marca com Q. Orianna coloca bola próxima. Diana engaja, Orianna usa Shockwave no grupo reunido.' },
  { champions:['Nocturne','Lissandra'], name:'Escuridão Gelada',      strength:'A', type:'ult-combo',      description:'Nocturne R cega o mapa — Lissandra vai ao carry com R durante o blackout sem que ninguém veja.' },

  // ── Protect-the-Carry ───────────────────────────────────────────────────
  { champions:['Lulu','Jinx'],     name:'Jinx Imortal',         strength:'S', type:'protect-carry', description:'Lulu R+E+W cria uma Jinx enorme e impossível de matar. Com Get Excited! após abates, é um snowball imparável.' },
  { champions:['Lulu','Vayne'],    name:'Vayne Invencível',     strength:'S', type:'protect-carry', description:'Lulu torna Vayne enorme com R e intocável com W. No late, Vayne + Lulu 1v9s qualquer composição.' },
  { champions:['Lulu','KogMaw'],   name:'Kog Protegido',        strength:'S', type:'protect-carry', description:'KogMaw + Lulu é a combinação de late game mais unkillable do jogo. W, E e R da Lulu em cada engage inimigo.' },
  { champions:['Soraka','KogMaw'], name:'Sustain Infinito',     strength:'A', type:'protect-carry', description:'Soraka cura KogMaw indefinidamente enquanto ele causa DPS de longe. Ambos são imparáveis no late se protegidos.' },
  { champions:['Yuumi','Jinx'],    name:'Jinx Voadora',         strength:'A', type:'protect-carry', description:'Yuumi se prende a Jinx e fornece cura, velocidade e dano bônus. No late, Jinx com Yuumi é um snowball perpétuo.' },
  { champions:['Zilean','Jinx'],   name:'Última Chance',        strength:'A', type:'protect-carry', description:'Zilean R ressuscita Jinx. Ela volta ao campo com Get Excited! para continuar o massacre.' },
  { champions:['Janna','Vayne'],   name:'Disengage + Scale',    strength:'A', type:'protect-carry', description:'Janna protege Vayne de divers com R, Q e E. Vayne farm e escala para o late game imbatível.' },
  { champions:['Milio','Vayne'],   name:'Chama Protetora',      strength:'A', type:'protect-carry', description:'Milio remove CC com R e fornece escudo + buff de alcance. Vayne com alcance extra e CC removido é assustadora.' },

  // ── Sinergias de Botlane ─────────────────────────────────────────────────
  { champions:['Leona','Draven'],    name:'Botlane do Terror',   strength:'S', type:'botlane',       description:'Leona é o suporte perfeito para Draven. Stun garantido com combo E+Q+ignite + todo dano do Draven = abate certo.' },
  { champions:['Nami','Lucian'],     name:'Predator Duo',        strength:'S', type:'botlane',       description:'E da Nami ativa bônus em cada ataque do Lucian. Combo Tidecaller\'s Blessing + burst do Lucian é devastador.' },
  { champions:['Blitzcrank','Jinx'], name:'Hook + Explosão',     strength:'A', type:'botlane',       description:'Blitzcrank hook garante setup perfeito para o heavy damage da Jinx. Muito eficaz para snowball early.' },
  { champions:['Nautilus','Caitlyn'],name:'Prender + Atirar',    strength:'A', type:'botlane',       description:'Nautilus hook + R garante headshot da Caitlyn em cima da armadilha. Combo de delete que funciona em qualquer ELO.' },
  { champions:['Thresh','Kalista'],  name:'Ameaça Dupla',        strength:'A', type:'botlane',       description:'Kalista pode arremessar Thresh com Oathsworn para engage surpresa. O hook do Thresh confirma abates.' },

  // ── Sinergias Globais ─────────────────────────────────────────────────────
  { champions:['Shen','Tryndamere'], name:'Splitpush Infinito',  strength:'A', type:'global',        description:'Tryndamere splitpusha sem medo de morrer com R e Shen pode teletransportar para salvar ou jogar teamfight.' },
  { champions:['Shen','Katarina'],   name:'Escudo da Assassina', strength:'A', type:'global',        description:'Shen teletransporta para proteger Katarina com escudo durante o R dela. Uma das combos de suporte-assassino mais fortes.' },
  { champions:['TwistedFate','Nocturne'], name:'Cegueira Total', strength:'A', type:'global',        description:'Nocturne R cega o mapa e TF usa R para teletransportar. Time inimigo não vê nada e não pode responder.' },
  { champions:['Gangplank','Lux'],   name:'Execute Global',      strength:'B', type:'global',        description:'Lux prende com Q e R de longa distância. Gangplank R global executa qualquer inimigo com pouco HP no mapa.' },
];

/**
 * Detecta sinergias presentes em uma lista de campeões.
 * Retorna sinergias encontradas ordenadas por força.
 *
 * @param {Array} champs - Array de campeões do time
 * @returns {Array} sinergias detectadas
 */
export function detectSynergies(champs) {
  const validIds = new Set(champs.filter(Boolean).map((c) => c.id));
  if (validIds.size < 2) return [];

  const found = [];
  for (const synergy of KNOWN_SYNERGIES) {
    const matches = synergy.champions.filter((id) => validIds.has(id));
    if (matches.length >= 2) {
      found.push({ ...synergy, matchedCount: matches.length });
    }
  }

  // Ordenar: S antes de A antes de B, e por quantidade de champs matched
  const ORDER = { S: 0, A: 1, B: 2 };
  found.sort((a, b) => ORDER[a.strength] - ORDER[b.strength] || b.matchedCount - a.matchedCount);

  return found;
}
