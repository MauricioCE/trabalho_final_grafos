import BotTexture from "../../../assets/svgs/actors/bot.svg?react";
import { memo, useEffect, useRef, useState } from "react";
import Character from "./Character";
import { useGameStore } from "../../../stores/mainStore";
import { GameMap, GameState, Vector2 } from "../../../common/types";
import { bfs } from "../../../common/path_finder/bfs";
import { isSamePosition } from "../../../utils/positionUtils";
import { useGameplayStore } from "../../../stores/gameplayStore";
import { djkstra } from "../../../common/path_finder/dijkstra";
import { salesman } from "../../../common/path_finder/salesman";

type Props = {
  initialCoord: Vector2;
  pointsCoords: Vector2[];
};

function Bot({ initialCoord, pointsCoords: pointsCoordsProp }: Props) {
  const [coord, setCoord] = useState(initialCoord);
  const [canMove, setCanMove] = useState(false);
  const [speed, setSpeed] = useState(0);
  const pointsCoords = useRef<Vector2[]>(pointsCoordsProp);
  const currentPath = useRef<Vector2[]>([]);
  const gameState = useGameplayStore((state) => state.gameState);
  const maxScore = useGameplayStore((state) => state.maxScore);
  const setBotScore = useGameplayStore((state) => state.setBotScore);
  const map = useGameStore((state) => state.map);
  const setPoints = useGameStore((state) => state.setBotPointsCoords);
  const setPath = useGameStore((state) => state.setPath);
  const waitDuration = 200;

  function handleMovement() {
    if (gameState === "paused") return;

    if (currentPath.current.length === 0) {
      handlePoint();
      currentPath.current = getNearestPath(
        "bfs",
        coord,
        map,
        pointsCoords.current
      );

      setPath([coord, ...currentPath.current]);
    }

    const nextCoord = currentPath.current.shift();

    if (nextCoord) {
      setTimeout(() => {
        setCoord(nextCoord);
        setSpeed(map[nextCoord.x][nextCoord.y].speed);
      }, waitDuration);
      return;
    }
  }

  function handlePoint() {
    const newCoords = pointsCoords.current.filter(
      (pointCoord) => !isSamePosition(pointCoord, coord)
    );

    pointsCoords.current = newCoords;
    setBotScore(maxScore - newCoords.length);
    setPoints(pointsCoords.current);
  }

  useHandleGameState(gameState, canMove, setCanMove, handleMovement);

  return (
    <Character
      coord={coord}
      speed={speed}
      texture={<BotTexture />}
      onMovementCompleted={handleMovement}
    />
  );
}

// FUNCTIONS =====================================================================================

function getNearestPath(
  algorithmName: "bfs" | "dijkstra" | "salesman",
  botCoord: Vector2,
  map: GameMap,
  pointsCoords: Vector2[]
): Vector2[] {
  switch (algorithmName) {
    case "bfs":
      return bfs(botCoord, pointsCoords, map);
    case "dijkstra":
      return djkstra(botCoord, pointsCoords, map);
    case "salesman":
      return salesman(botCoord, pointsCoords, map);
  }
}

// HOOKS =====================================================================================

function useHandleGameState(
  gameState: GameState,
  canMove: boolean,
  setCanMove: (value: boolean) => void,
  handleMovement: () => void
) {
  useEffect(() => {
    if (gameState === "running" && !canMove) {
      setCanMove(true);
      handleMovement();
    } else if (gameState === "paused" && canMove) {
      setCanMove(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);
}

// function removePoint(pointCoord: Vector2, pointsCoords: Vector2[]) {
//   return pointsCoords.filter((coord) => !isSamePosition(coord, pointCoord));
// }

export default memo(Bot);
