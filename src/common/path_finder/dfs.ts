import { getNeighbors } from "../../utils/generalUtils";
import { GameMap, TileData, Vector2 } from "../types";

export function dfs(
  botCoord: Vector2,
  pointsCoords: Vector2[],
  map: GameMap,
): Vector2[] {
  if (map.length === 0) return [];
  if (!botCoord || !pointsCoords) return [];

  const visited: Vector2[] = [];
  const stack: { tile: TileData; path: Vector2[] }[] = [];
  const startTile = map[botCoord.x][botCoord.y];

  stack.push({ tile: startTile, path: [] });
  visited.push(startTile.coord);

  while (stack.length > 0) {
    const data = stack.pop()!;
    if (included(pointsCoords, data.tile.coord)) {
      return data.path;
    }

    getNeighbors(data.tile.coord, map)
      .reverse()
      .forEach((neighbor) => {
        if (!included(visited, neighbor.coord)) {
          stack.push({ tile: neighbor, path: [...data.path, neighbor.coord] });
          visited.push(neighbor.coord);
        }
      });
  }

  return [];
}

function included(visited: Vector2[], coord: Vector2) {
  return visited.some(
    (visitedCoord) => visitedCoord.x === coord.x && visitedCoord.y === coord.y,
  );
}
