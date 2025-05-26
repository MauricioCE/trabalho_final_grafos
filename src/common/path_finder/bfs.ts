import { Constants } from "../constants";
import { GameMap, TileData, Vector2 } from "../types";

export function bfs(
  botCoord: Vector2,
  pointsCoords: Vector2[],
  map: GameMap
): Vector2[] {
  // Se o map estiver vazio, não tem caminho
  if (map.length === 0) return [];
  // Se a coordenada do bot ou point forem desconhecidas, retorna vazio
  if (!botCoord || !pointsCoords) return [];

  const visited: Vector2[] = [];
  const queue: { tile: TileData; path: Vector2[] }[] = [];
  const startTile = map[botCoord.x][botCoord.y];

  queue.push({ tile: startTile, path: [] });
  visited.push(startTile.coord);

  while (queue.length > 0) {
    const data = queue.shift()!;
    if (included(pointsCoords, data.tile.coord)) {
      return data.path;
    }

    getNeighbors(data.tile.coord, map).forEach((neighbor) => {
      if (!included(visited, neighbor.coord)) {
        queue.push({ tile: neighbor, path: [...data.path, neighbor.coord] });
        visited.push(neighbor.coord);
      }
    });
  }

  return [];
}

function included(visited: Vector2[], coord: Vector2) {
  return visited.some(
    (visitedCoord) => visitedCoord.x === coord.x && visitedCoord.y === coord.y
  );
}

function getNeighbors(coord: Vector2, map: GameMap): TileData[] {
  const neighbors: TileData[] = [];

  for (const dir of Constants.getDirections()) {
    try {
      const adjacentTile = map[coord.x + dir.x][coord.y + dir.y];
      if (adjacentTile.type === "floor") {
        neighbors.push(adjacentTile);
      }
    } catch {
      continue;
    }
  }

  return neighbors;
}
