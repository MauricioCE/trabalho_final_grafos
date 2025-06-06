import { Constants } from "../common/constants";
import { Direction, MovementKeys, Vector2 } from "../common/types";
import { useGameStore } from "../stores/mainStore";
import { clamp } from "./generalUtils";

// Diz se dois Vector2 são iguais
export function isSamePosition(
  posA: Vector2 | undefined,
  posB: Vector2 | undefined
) {
  if (!posA || !posB) return false;

  return posA.x === posB.x && posA.y === posB.y;
}

// Converte uma posição no mapa para coordenadas que podem ser usadas na matriz
// que TileData[][] que representa o mapa do jogo
export function positionToCoordinate(pos: Vector2) {
  return {
    x: Math.floor(pos.x / (Constants.map.tileSize + Constants.map.tileGap)),
    y: Math.floor(pos.y / (Constants.map.tileSize + Constants.map.tileGap)),
  };
}

// Converte uma coordenada usada na matriz de dados do mapa para uma posição
// de renderização no Map
export function coordinateToPosition(coord: Vector2) {
  return {
    x: Constants.map.tileSize * coord.x + coord.x * Constants.map.tileGap,
    y: Constants.map.tileSize * coord.y + coord.y * Constants.map.tileGap,
  };
}

// Retorna uma string que representa a direção que o target está da coordenada informada
export function directionBetween(
  coord: Vector2,
  targetCoord: Vector2
): Direction {
  if (coord.x - targetCoord.x > 0) return "left";
  if (coord.x - targetCoord.x < 0) return "right";
  if (coord.y - targetCoord.y > 0) return "up";
  return "down";
}

// Retorna a próxima coordenada a partir das seguintes variáveis
export function getNextCoord(
  pressedKey: string,
  movementKeys: MovementKeys,
  coord: Vector2
) {
  const map = useGameStore.getState().map;
  let xIncrement = 0;
  let yIncrement = 0;

  switch (pressedKey) {
    case movementKeys.up:
      yIncrement = -1;
      break;
    case movementKeys.down:
      yIncrement = 1;
      break;
    case movementKeys.left:
      xIncrement = -1;
      break;
    case movementKeys.right:
      xIncrement = 1;
      break;
  }

  const newX = clamp(coord.x + xIncrement, 0, map.length - 1);
  const newY = clamp(coord.y + yIncrement, 0, map[0].length - 1);

  if (map[newX][newY].type !== "floor") return coord;
  if (newX === coord.x && newY === coord.y) return coord;

  return { x: newX, y: newY };
}
