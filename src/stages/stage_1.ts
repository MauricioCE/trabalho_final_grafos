import { Stage } from "../common/types";

export const stage_1: Stage = {
  playerCoord: { x: 1, y: 1 },
  botCoord: { x: 12, y: 10 },
  playerPointsCoords: [
    { x: 8, y: 1 },
    { x: 4, y: 3 },
    { x: 11, y: 5 },
    { x: 1, y: 10 },
    { x: 11, y: 10 },
  ],
  botPointsCoords: [
    { x: 2, y: 1 },
    { x: 11, y: 1 },
    { x: 1, y: 5 },
    { x: 7, y: 5 },
    { x: 7, y: 10 },
  ],
  width: 14,
  height: 12,
  tilesLayout: [
    "t t t t t t t t t t t t t t",
    "t d d 3 d d d t 3 3 3 d 1 t",
    "t 2 2 2 1 1 d 2 2 d t 1 2 t",
    "t d 3 t d d 1 d d d d t 2 t",
    "t 2 3 d t t 1 2 d t 3 d d t",
    "t d d d 2 1 1 d 2 t 2 d d t",
    "t 3 1 1 2 2 d 3 d t 1 d 3 t",
    "t t d d d 3 1 t 1 1 3 t 3 t",
    "t 3 3 d t 1 1 d d 1 d t d t",
    "t d d 2 d 3 3 2 d 2 d 1 d t",
    "t d t 2 d 1 1 d 2 t t d d t",
    "t t t t t t t t t t t t t t",
  ],
};
