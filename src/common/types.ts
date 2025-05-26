export type Direction = "up" | "down" | "left" | "right";

export type GameMap = TileData[][];

export type GameMapData = {
  map: GameMap;
  size: Size;
  playerCoord: Vector2;
  playerPointsCoords: Vector2[];
  botCoord: Vector2;
  botPointsCoords: Vector2[];
};

export type GameState = "running" | "paused";

export type MovementKeys = {
  up: string;
  down: string;
  left: string;
  right: string;
};

export type Range = {
  min: number;
  max: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Stage = {
  playerCoord: Vector2;
  playerPointsCoords: Vector2[];
  botCoord: Vector2;
  botPointsCoords: Vector2[];
  width: number;
  height: number;
  tilesLayout: string[];
};

export type TileData = {
  coord: Vector2;
  speed: number;
  name: string;
  type: TileType;
};

export type TileType = "floor" | "tree";

export type Vector2 = {
  x: number;
  y: number;
};
