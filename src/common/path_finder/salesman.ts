import { GameMap, TileData, Vector2 } from "../types";
import { bfs } from "./bfs";

//funções auxiliares

//função para simplicar a busca até as coordenadas x e y, diminuindo o trabalho
function getKey(coord: Vector2): string {
  return `${coord.x},${coord.y}`;
}

function precomputeDistances(
  points: Vector2[],
  map: GameMap
): Record<string, Record<string, { cost: number; path: Vector2[] }>> {
  const result: Record<string, Record<string, { cost: number; path: Vector2[] }>> = {};

  //iterando em todos os pontos
  for (const from of points) {
    result[getKey(from)] = {};
    //iterando para obter as distancias até os outros pontos
    for (const to of points) {
      if (from.x === to.x && from.y === to.y) {
        //se o ponto destino é a propria origem, obviamente o custo é 0 e o caminho é a coord onde ele está
        result[getKey(from)][getKey(to)] = { cost: 0, path: [from] };
      } else {
        //se não, faz bfs para ver a distancia do ponto origem até destino, reaproveitando o bfs já feito
        const path = bfs(from, [to], map);
        result[getKey(from)][getKey(to)] = { cost: path.length - 1, path };
      }
    }
  }

  //nesse retorno, teremos todas as distancias de todos as coords entre si (que importam, ou seja o bot e os pontos)
  return result;
}

//FUNÇÃO PRINCIPAL

export function salesman(
  botCoord: Vector2,
  pointsCoords: Vector2[],
  map: GameMap
): Vector2[] {
  
  if (map.length === 0) return [];

  if (!botCoord || !pointsCoords) return [];

  const allPoints = [botCoord, ...pointsCoords]
  //pré-calculo das distancia entre o bot e os pontos
  const distances = precomputeDistances(allPoints, map);

  let bestPath: Vector2[] = [];
  let minCost = Infinity;

  //implementacao do dfs para determinar o melhor caminho entre todos os calculados (implementação com recursão)
  function dfs(current: Vector2, visited: Vector2[], cost: number) {
    //se todos os pontos foram visitados:
    if (visited.length === pointsCoords.length + 1) {
      //adiciona ao custo total o custo até a origem (botCoord), padrão do TSP
      const returnCost = distances[getKey(current)][getKey(botCoord)].cost;
      const totalCost = cost + returnCost;
      //se o custo foi o melhor até agora:
      if (totalCost < minCost) {
        minCost = totalCost;
        bestPath = [...visited, ...distances[getKey(current)][getKey(botCoord)].path.slice(1)];
      }
      //encerra a função
      return;
    }

    //se ainda temos pontos a explorar:
    for (const point of pointsCoords) {
      //se já foi visitado, pula:
      if (visited.some(v => v.x === point.x && v.y === point.y)) continue;
      //obtem o custo até o ponto
      const { cost: nextCost, path: nextPath } = distances[getKey(current)][getKey(point)];
      //RECURSÃO:
      //para cada "point", continua buscando caminhos melhores
      dfs(point, [...visited, ...nextPath.slice(1)], cost + nextCost);
    }
  }

  //dfs configura o bestpath para que o bot obtenha o melhor caminho possivel no mapa
  dfs(botCoord, [botCoord], 0);

  return bestPath;
}
