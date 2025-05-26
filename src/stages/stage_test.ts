import { Stage } from "../common/types";

export const stage_test: Stage = {
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
    { x: 9, y: 10 },
  ],
  width: 14,
  height: 12,
  tilesLayout: [
    "t t t t t t t t t t t t t t",
    "t d d t d d d d d d t d d t",
    "t d t d d d d d d d t d d t",
    "t d d d d d d d d d t d d t",
    "t d t d d d d d d d d d d t",
    "t d t d d d d d d d t d t t",
    "t t d d t t t t t d d d t t",
    "t d d d d d d d d t d t d t",
    "t d d d d d d d d d d d d t",
    "t t t d d d d d t d t d d t",
    "t d d d d d t d t d d d d t",
    "t t t t t t t t t t t t t t",
  ],
};
