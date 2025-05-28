export type Actors = "player" | "bot" | "none";

export type Algorithm = "bfs" | "djkstra" | "salesman";

export type Direction = "up" | "down" | "left" | "right";

export type GameMap = TileData[][];

export type StageData = {
  map: GameMap;
  size: Size;
  playerCoord: Vector2;
  playerPointsCoords: Vector2[];
  botCoord: Vector2;
  botPointsCoords: Vector2[];
  maxPoints: number;
};

export type GameState = "not-initialized" | "running" | "paused" | "finished";

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
  stageName: string;
  nextStage: string;
  algorithm: "bfs" | "djkstra" | "salesman";
  playerCoord: Vector2;
  playerPointsCoords: Vector2[];
  botCoord: Vector2;
  botPointsCoords: Vector2[];
  maxPoints: number;
  width: number;
  height: number;
  tilesLayout: string[];
};

export type StageResult = "win" | "lose";

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
