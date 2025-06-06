import { Algorithm, Stage } from "../common/types";

export function createStage(
  stageName: string,
  nextStage: string,
  algorithm: Algorithm
): Stage {
  return {
    stageName: stageName,
    nextStage: nextStage,
    algorithm: algorithm,
    maxPoints: 12,
    width: 23,
    height: 14,
    playerCoord: { x: 10, y: 11 },
    botCoord: { x: 12, y: 11 },
    playerPointsCoords: [
      { x: 2, y: 1 },
      { x: 9, y: 1 },
      { x: 2, y: 3 },
      { x: 10, y: 4 },
      { x: 2, y: 5 },
      { x: 5, y: 6 },
      { x: 8, y: 6 },
      { x: 2, y: 7 },
      { x: 3, y: 9 },
      { x: 10, y: 9 },
      { x: 6, y: 11 },
      { x: 3, y: 12 },
    ],
    botPointsCoords: [
      { x: 13, y: 1 },
      { x: 20, y: 1 },
      { x: 20, y: 3 },
      { x: 12, y: 4 },
      { x: 20, y: 5 },
      { x: 14, y: 6 },
      { x: 17, y: 6 },
      { x: 20, y: 7 },
      { x: 12, y: 9 },
      { x: 19, y: 9 },
      { x: 16, y: 11 },
      { x: 19, y: 12 },
    ],
    tilesLayout: [
      "t t t t t t t t t t t t t t t t t t t t t t t",
      "t 1 pp 4 1 1 2 2 t pp 1 t 1 bp t 2 2 1 1 4 bp 1 t",
      "t 1 4 1 2 4 3 1 4 1 1 t 1 1 4 1 3 4 2 1 4 1 t",
      "t 1 pp 1 t 1 2 1 t 1 2 t 2 1 t 1 2 1 t 1 bp 1 t",
      "t 3 4 2 t 1 4 1 3 2 pp t bp 2 3 1 4 1 t 2 4 3 t",
      "t 1 pp 1 t 1 2 1 2 1 2 t 2 1 2 1 2 1 t 1 bp 1 t",
      "t 1 4 1 4 pp 1 4 pp t 1 t 1 t bp 4 1 bp 4 1 4 1 t",
      "t 1 pp 4 4 4 t t t t 1 t 1 t t t t 4 4 4 bp 1 t",
      "t 1 4 1 3 1 1 1 1 t 1 t 1 t 1 1 1 1 3 1 4 1 t",
      "t 1 4 pp 1 1 t t 1 t pp t bp t 1 t t 1 1 bp 4 1 t",
      "t 2 3 1 t 1 4 1 1 t t t t t 1 1 4 1 t 1 3 2 t",
      "t 2 1 1 4 1 pp t 1 1 player t bot 1 1 t bp 1 4 1 1 2 t",
      "t t t pp 3 1 4 1 1 t t t t t 1 1 4 1 3 bp t t t",
      "t t t t t t t t t t t t t t t t t t t t t t t",
    ],
  };
}
