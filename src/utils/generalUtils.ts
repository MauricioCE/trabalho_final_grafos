import { Constants } from "../common/constants";
import { GameMap, TileData, Vector2 } from "../common/types";

// Limita um valor entre um valor mínimo e um máximo
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}

//
export function getNeighbors(coord: Vector2, map: GameMap): TileData[] {
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
