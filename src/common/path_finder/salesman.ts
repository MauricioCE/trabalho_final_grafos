import { GameMap, Vector2 } from "../types";
import { djkstra } from "./dijkstra";

// Heap's Algorithm
function* permute(arr: number[]): Generator<number[]> {
  const n = arr.length;
  const c = new Array(n).fill(0);
  const output = arr.slice();
  yield output.slice();
  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      const k = i % 2 === 1 ? c[i] : 0;
      [output[i], output[k]] = [output[k], output[i]];
      yield output.slice();
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
}

// calcula o custo com o dijkstra
function getCost(
  from: Vector2,
  to: Vector2,
  map: GameMap
): { cost: number; path: Vector2[] } {
  const path = djkstra(from, [to], map);
  const cost = path.length;
  return { cost, path };
}

// algoritmo principal
export function salesman(
  botCoord: Vector2,
  pointsCoords: Vector2[],
  map: GameMap
): Vector2[] {
  if (!botCoord || pointsCoords.length === 0 || map.length === 0) return [];

  const n = pointsCoords.length;
  const nodes = [botCoord, ...pointsCoords];

  // matriz de custos, inicia com tudo infinito
  const costMatrix: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(n + 1).fill(Infinity));

  // matriz de caminhos, inicia com tudo vazio
  const pathMatrix: Vector2[][][] = Array(n + 1)
    .fill(0)
    .map(() => Array(n + 1).fill([]));

  // preenche a matriz de custos e caminhos
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === j) {
        costMatrix[i][j] = 0;
        pathMatrix[i][j] = [];
        continue;
      }
      //com o dijkstra, determina o caminho e custo de um ponto ao outro
      const { cost, path } = getCost(nodes[i], nodes[j], map);
      costMatrix[i][j] = cost;
      pathMatrix[i][j] = path;
    }
  }

  let bestCost = Infinity;
  let bestRoute: number[] = [];

  //avalia todas as permutações dos pontos
  //.keys(): retorna indice de cada elemento
  //assim temos um array de indices para permutar 
  //.map(): está incremente em 1 cada indice (ignorar o 0 pq ele é o bot)
  for (const perm of permute([...Array(n).keys()].map((i) => i + 1))) {
    let totalCost = 0;
    let current = 0; // começa no bot
    let pruned = false; //controla caminhos que ja são piores imediatamente

    //avaliando o custo de cada permutação
    for (const next of perm) {
      const c = costMatrix[current][next];
      totalCost += c;

      //se o custo total já é pior que o melhor, descarta
      if (totalCost >= bestCost) {
        pruned = true;
        break;
      }

      current = next;
    }

    if (!pruned && totalCost < bestCost) {
      bestCost = totalCost;
      bestRoute = perm;
    }
  }

  if (bestRoute.length === 0) return [];

  //monta o caminho apenas até o primeiro ponto da melhor rota
  const firstTarget = bestRoute[0];
  const pathToFirst = pathMatrix[0][firstTarget];

  return pathToFirst;
}
