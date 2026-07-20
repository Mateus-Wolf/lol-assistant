# Assistente de Composição para LoL --- Documentação Técnica

## 1. Visão Geral

Site onde o usuário insere manualmente os 10 campeões de uma partida (5
aliados + 5 inimigos) e recebe sugestões de estratégia: itens
prioritários, foco em teamfight, power spikes, matchups de rota.

Sem overlay, sem leitura em tempo real do client.

## 2. Fontes de Dados Pesquisadas

### 2.1 Riot Games API (oficial)

**O que dá:** histórico de partidas (match-v5), dados de invocador,
maestria de campeão e dados estáticos.

**Custo:** gratuita para uso pessoal/não-comercial.

**Limitação real:** a Development Key expira a cada 24h e possui rate
limit baixo (boa para prototipagem, ruim para produção). Uso comercial
exige Production Key.

A API não fornece diretamente o win rate de campeão X contra Y; seria
necessário agregar milhões de partidas.

### 2.2 Data Dragon (CDN oficial da Riot)

-   Dados estáticos: ícones, splash arts, itens, runas e atributos.
-   Gratuito.
-   Sem API key.
-   Sem rate limit.
-   Ideal para autocomplete e UI.
-   Atualizar a cada patch.

### 2.3 OP.GG MCP Server (oficial)

Ferramentas:

-   `lol-champion-analysis`
-   `lol-champion-positions-data`
-   `lol-champion-meta-data`

Fornece builds, counters, matchups, pick/ban rate e meta já agregados.

### 2.4 Fontes não-oficiais

-   Lolalytics (scrapers não oficiais)
-   U.GG (scrapers não oficiais)

**Recomendação:** utilizar Riot API + OP.GG MCP.

## 3. UI

### Tela de montagem

-   Autocomplete via Data Dragon.
-   Seleção do campeão e rota.

### Tela de sugestão

Cruza os 10 campeões com dados da OP.GG MCP e exibe:

-   Itens prioritários
-   Runas
-   Foco de teamfight
-   Power spikes

O MVP pode ser stateless.

## 4. Arquitetura

``` text
Usuário seleciona 10 campeões
        ↓
Backend consulta OP.GG MCP / Riot API
        ↓
JSON estruturado
        ↓
IA interpreta (não inventa dados)
        ↓
Resposta final
```

### Boas práticas

-   Cache por matchup + patch.
-   Salvar patch utilizado.
-   Feedback simples (sim/não).

## 5. Stack Recomendada

  Necessidade                   Fonte
  ----------------------------- ---------------------------
  Ícones, nomes, itens, runas   Data Dragon
  Histórico próprio             Riot API
  Matchups, builds e counters   OP.GG MCP
  Explicação da sugestão        IA alimentada pelos dados
