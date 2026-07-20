export const ROLES = ["TOPO", "SELVA", "MEIO", "ATIRAD.", "SUPORTE"];

export const CHAMPION_LANES = {
  // Top
  Aatrox: ["TOPO"], Akali: ["TOPO", "MEIO"], Camille: ["TOPO"], Chogath: ["TOPO", "MEIO"], Darius: ["TOPO"],
  DrMundo: ["TOPO", "SELVA"], Fiora: ["TOPO"], Gangplank: ["TOPO"], Garen: ["TOPO"], Gnar: ["TOPO"],
  Gragas: ["TOPO", "SELVA", "MEIO"], Gwen: ["TOPO"], Heimerdinger: ["TOPO", "MEIO", "SUPORTE"], Illaoi: ["TOPO"],
  Irelia: ["TOPO", "MEIO"], Jax: ["TOPO", "SELVA"], Jayce: ["TOPO", "MEIO"], KSante: ["TOPO"], Kayle: ["TOPO", "MEIO"],
  Kennen: ["TOPO"], Kled: ["TOPO"], Malphite: ["TOPO", "MEIO"], Mordekaiser: ["TOPO"], Nasus: ["TOPO"],
  Olaf: ["TOPO", "SELVA"], Ornn: ["TOPO"], Pantheon: ["TOPO", "MEIO", "SUPORTE"], Poppy: ["TOPO", "SELVA", "SUPORTE"],
  Renekton: ["TOPO"], Riven: ["TOPO"], Rumble: ["TOPO", "MEIO"], Sett: ["TOPO", "SUPORTE"], Shen: ["TOPO", "SUPORTE"],
  Singed: ["TOPO"], Sion: ["TOPO"], Smolder: ["ATIRAD.", "MEIO", "TOPO"], Swain: ["SUPORTE", "MEIO", "TOPO"],
  Teemo: ["TOPO"], Trundle: ["TOPO", "SELVA"], Tryndamere: ["TOPO"], Urgot: ["TOPO"], Volibear: ["TOPO", "SELVA"],
  Warwick: ["TOPO", "SELVA"], Wukong: ["TOPO", "SELVA"], Yasuo: ["MEIO", "TOPO", "ATIRAD."], Yone: ["MEIO", "TOPO"], Yorick: ["TOPO"],
  Zac: ["SELVA", "TOPO", "SUPORTE"], Ambessa: ["TOPO", "SELVA"],

  // Selva
  Amumu: ["SELVA", "SUPORTE"], Belveth: ["SELVA"], Brand: ["SELVA", "SUPORTE", "MEIO"], Briar: ["SELVA"],
  Diana: ["SELVA", "MEIO"], Ekko: ["SELVA", "MEIO"], Elise: ["SELVA"], Evelynn: ["SELVA"], Fiddlesticks: ["SELVA"],
  Hecarim: ["SELVA"], Ivern: ["SELVA"], JarvanIV: ["SELVA"], Karthus: ["SELVA", "ATIRAD."], Kayn: ["SELVA"],
  Khazix: ["SELVA"], Kindred: ["SELVA"], LeeSin: ["SELVA"], Lillia: ["SELVA"], MasterYi: ["SELVA"],
  Nidalee: ["SELVA"], Nocturne: ["SELVA"], Nunu: ["SELVA"], Rammus: ["SELVA"], Reksai: ["SELVA"],
  Rengar: ["SELVA", "TOPO"], Sejuani: ["SELVA"], Shaco: ["SELVA", "SUPORTE"], Shyvana: ["SELVA"], Skarner: ["SELVA", "TOPO"],
  Taliyah: ["SELVA", "MEIO"], Talon: ["SELVA", "MEIO"], Udyr: ["SELVA", "TOPO"], Vi: ["SELVA"], Viego: ["SELVA"],
  XinZhao: ["SELVA"],

  // Meio
  Ahri: ["MEIO"], Akshan: ["MEIO", "TOPO"], Anivia: ["MEIO"], Annie: ["MEIO", "SUPORTE"], AurelionSol: ["MEIO"],
  Azir: ["MEIO"], Cassiopeia: ["MEIO"], Corki: ["MEIO", "ATIRAD."], Fizz: ["MEIO"], Galio: ["MEIO", "SUPORTE"],
  Hwei: ["MEIO", "SUPORTE"], Karma: ["SUPORTE", "MEIO"], Kassadin: ["MEIO"], Katarina: ["MEIO"], Leblanc: ["MEIO"],
  Lissandra: ["MEIO"], Lux: ["SUPORTE", "MEIO"], Malzahar: ["MEIO"], Naafiri: ["MEIO"], Neeko: ["MEIO", "SUPORTE"],
  Orianna: ["MEIO"], Qiyana: ["MEIO"], Ryze: ["MEIO", "TOPO"], Syndra: ["MEIO"], TwistedFate: ["MEIO", "ATIRAD."],
  Veigar: ["MEIO", "ATIRAD."], Velkoz: ["SUPORTE", "MEIO"], Viktor: ["MEIO"], Vladimir: ["MEIO", "TOPO"],
  Xerath: ["SUPORTE", "MEIO"], Zed: ["MEIO"], Zoe: ["MEIO"], Mel: ["MEIO", "SUPORTE"],

  // Atirador
  Aphelios: ["ATIRAD."], Ashe: ["ATIRAD.", "SUPORTE"], Caitlyn: ["ATIRAD."], Draven: ["ATIRAD."], Ezreal: ["ATIRAD."],
  Jhin: ["ATIRAD."], Jinx: ["ATIRAD."], Kaisa: ["ATIRAD."], Kalista: ["ATIRAD."], KogMaw: ["ATIRAD."],
  Lucian: ["ATIRAD."], MissFortune: ["ATIRAD."], Nilah: ["ATIRAD."], Samira: ["ATIRAD."], Senna: ["SUPORTE", "ATIRAD."],
  Sivir: ["ATIRAD."], Tristana: ["ATIRAD.", "MEIO"], Twitch: ["ATIRAD.", "SUPORTE"], Varus: ["ATIRAD.", "MEIO"],
  Vayne: ["ATIRAD.", "TOPO"], Xayah: ["ATIRAD."], Zeri: ["ATIRAD."],

  // Suporte
  Alistar: ["SUPORTE"], Bard: ["SUPORTE"], Blitzcrank: ["SUPORTE"], Braum: ["SUPORTE"], Janna: ["SUPORTE"],
  Leona: ["SUPORTE"], Lulu: ["SUPORTE"], Milio: ["SUPORTE"], Morgana: ["SUPORTE", "MEIO"], Nami: ["SUPORTE"],
  Nautilus: ["SUPORTE"], Pyke: ["SUPORTE"], Rakan: ["SUPORTE"], Renata: ["SUPORTE"], Seraphine: ["SUPORTE", "ATIRAD."],
  Sona: ["SUPORTE"], Soraka: ["SUPORTE"], Taric: ["SUPORTE"], Thresh: ["SUPORTE"], Yuumi: ["SUPORTE"],
  Zilean: ["SUPORTE", "MEIO"], Zyra: ["SUPORTE", "SELVA"]
};

export const FALLBACK_CHAMPS = [
  { id: "Ahri", name: "Ahri", tags: ["Mage", "Assassin"] },
  { id: "Darius", name: "Darius", tags: ["Fighter", "Tank"] },
  { id: "LeeSin", name: "Lee Sin", tags: ["Fighter", "Assassin"] },
  { id: "Jinx", name: "Jinx", tags: ["Marksman"] },
  { id: "Thresh", name: "Thresh", tags: ["Support", "Fighter"] },
  { id: "Garen", name: "Garen", tags: ["Fighter", "Tank"] },
  { id: "Yasuo", name: "Yasuo", tags: ["Fighter", "Assassin"] },
  { id: "Lux", name: "Lux", tags: ["Mage", "Support"] },
  { id: "MissFortune", name: "Miss Fortune", tags: ["Marksman"] },
  { id: "Malphite", name: "Malphite", tags: ["Tank", "Fighter"] },
  { id: "Zed", name: "Zed", tags: ["Assassin"] },
  { id: "Leona", name: "Leona", tags: ["Tank", "Support"] },
  { id: "Ezreal", name: "Ezreal", tags: ["Marksman", "Mage"] },
  { id: "Amumu", name: "Amumu", tags: ["Tank", "Mage"] },
  { id: "Katarina", name: "Katarina", tags: ["Assassin", "Mage"] },
  { id: "Jax", name: "Jax", tags: ["Fighter", "Assassin"] },
  { id: "Nami", name: "Nami", tags: ["Support", "Mage"] },
  { id: "Vayne", name: "Vayne", tags: ["Marksman", "Assassin"] },
  { id: "Fiora", name: "Fiora", tags: ["Fighter", "Assassin"] },
  { id: "Morgana", name: "Morgana", tags: ["Mage", "Support"] }
];

export function getChampLanes(champ) {
  if (CHAMPION_LANES[champ.id]) return CHAMPION_LANES[champ.id];
  const tags = champ.tags || [];
  const lanes = [];
  if (tags.includes("Marksman")) lanes.push("ATIRAD.");
  if (tags.includes("Support")) lanes.push("SUPORTE");
  if (tags.includes("Mage") || tags.includes("Assassin")) lanes.push("MEIO");
  if (tags.includes("Fighter") || tags.includes("Tank")) {
    lanes.push("TOPO");
    lanes.push("SELVA");
  }
  return lanes.length > 0 ? lanes : ["TOPO", "SELVA", "MEIO", "ATIRAD.", "SUPORTE"];
}
