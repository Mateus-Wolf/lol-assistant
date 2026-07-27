# ⚔️ Assistente Tático LoL (League of Legends Draft & Matchup Assistant)

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Data Dragon](https://img.shields.io/badge/Riot_Data_Dragon-API-D0A85C?style=for-the-badge&logo=leagueoflegends&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Active-22C55E?style=for-the-badge&logo=github&logoColor=white)

> Uma ferramenta web interativa de análise de drafts, leitura tática de comps e sugestão de estratégias para partidas de **League of Legends**, atualizada em tempo real via **Riot Data Dragon API**.

🌐 **Acesse a aplicação ao vivo:** [https://mateus-wolf.github.io/lol-assistant/](https://mateus-wolf.github.io/lol-assistant/)

---

## 📌 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Modos de Assistente](#-modos-de-assistente)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy Automático](#-deploy-automático)
- [Licença](#-licença)

---

## 🛡️ Visão Geral

O **Assistente Tático LoL** foi projetado para auxiliar jogadores e times a tomar decisões táticas mais inteligentes durante a fase de seleção de campeões (Draft) e no planejamento da partida (*early*, *mid* e *late game*).

A aplicação faz requisições automáticas à API pública do **Riot Data Dragon**, garantindo que a lista de campeões, avatares, itens e versões de patch estejam sempre sincronizados com a versão oficial do jogo.

---

## ✨ Funcionalidades Principais

- 🗡️ **Seleção Interativa de Campeões:** Pesquisa por nome, filtro por rotas (*Topo, Selva, Meio, Bot, Suporte*) e funções (*Tanque, Mago, Atirador, Assassino, Lutador, Suporte*).
- 📊 **Leitura Tática Detalhada:** Relatórios completos com balanço de dano (AP/AD), poder de luta em equipe (*Teamfight*), controle de grupo (*CC*), mobilidade e facilidade de execução.
- 🎯 **Identificação de Matchups & Power Spikes:** Dicas específicas sobre quando seu campeão atinge o pico de força e como se comportar na fase de rotas.
- 🎒 **Recomendação de Builds & Itens:** Sugestões dinâmicas de itens com ícones e descrições vindas da API da Riot.
- 🏆 **Condições de Vitória (Win Conditions):** Orientações estratégicas sobre o plano de jogo do seu time para vencer a partida.
- 🌙 **Interface Premium:** Estética inspirada no cliente oficial do League of Legends com suporte total a telas responsivas.

---

## 🎮 Modos de Assistente

1. **Modo Composição (5v5):**
   - Análise estratégica dos 10 campeões da partida (Time Azul vs Time Vermelho).
   - Avaliação global do equilíbrio da comp, sinergias e fraquezas gerais.

2. **Modo Lane (1v1 / 2v2):**
   - Leitura focada exclusivamente na rota selecionada (**Topo**, **Selva**, **Meio** ou **Bot Lane**).
   - Análise detalhada das trocas diretas e dinâmicas da rota.

---

## 🛠️ Tecnologias Utilizadas

- **[React 19](https://react.dev/)** — Biblioteca principal de UI.
- **[Vite 6](https://vitejs.dev/)** — Bundler e ambiente de desenvolvimento ultra-rápido.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Estilização moderna e responsiva.
- **[TanStack Query (React Query v5)](https://tanstack.com/query)** — Gerenciamento de estado assíncrono e cache dos dados da API.
- **[Lucide React](https://lucide.dev/)** — Biblioteca de ícones modernos.
- **[Riot Data Dragon API](https://developer.riotgames.com/docs/lol#data-dragon)** — Fonte oficial de dados, imagens e patches do League of Legends.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (incluso com Node.js)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Mateus-Wolf/lol-assistant.git
   cd lol-assistant
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse no seu navegador a URL exibida no terminal (geralmente `http://localhost:5173`).

---

## 📦 Deploy Automático

O repositório está configurado com **GitHub Actions** (`.github/workflows/deploy.yml`). 

Toda vez que uma alteração é enviada para a branch `main`, a Action é executada automaticamente para compilar o projeto com Vite e publicar a versão atualizada no **GitHub Pages**:

🔗 **Link de Produção:** [https://mateus-wolf.github.io/lol-assistant/](https://mateus-wolf.github.io/lol-assistant/)

---

## 📄 Licença

Este projeto é de uso livre para fins educacionais e de estudo. Os dados, nomes e imagens de campeões pertencem à **Riot Games, Inc.**
