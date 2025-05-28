import BotTexture from "../../../assets/svgs/actors/bot.svg?react";
import { memo, useEffect, useRef, useState } from "react";
import Character from "./Character";
import { useGameStore } from "../../../stores/mainStore";
import { Algorithm, GameMap, Vector2 } from "../../../common/types";
import { bfs } from "../../../common/path_finder/bfs";
import { isSamePosition } from "../../../utils/positionUtils";
import { useGameplayStore } from "../../../stores/gameplayStore";
import { djkstra } from "../../../common/path_finder/djkstra";
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

  const algorithmName = useGameplayStore((state) => state.algorithm);
  const gameState = useGameplayStore((state) => state.gameplayState);
  const maxScore = useGameplayStore((state) => state.maxScore);
  const setBotScore = useGameplayStore((state) => state.setBotScore);

  const map = useGameStore((state) => state.map);
  const setPoints = useGameStore((state) => state.setBotPointsCoords);

  const setPath = useGameStore((state) => state.setPath);

  const waitDuration = 150;

  useEffect(() => {
    pointsCoords.current = pointsCoordsProp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (gameState === "not-initialized") {
      setCoord(initialCoord);
      setCanMove(false);
      setPath([]);
      currentPath.current = [];
      pointsCoords.current = [];
      return;
    }

    if (gameState === "running" && !canMove) {
      setCanMove(true);
      handleMovement();
      return;
    }

    if (gameState === "paused" && canMove) {
      setCanMove(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);

  function handleMovement() {
    if (gameState !== "running") return;

    if (currentPath.current.length === 0) {
      handlePoint();
      currentPath.current = getNearestPath(
        algorithmName,
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
  algorithmName: Algorithm,
  botCoord: Vector2,
  map: GameMap,
  pointsCoords: Vector2[]
): Vector2[] {
  switch (algorithmName) {
    case "bfs":
      return bfs(botCoord, pointsCoords, map);
    case "djkstra":
      return djkstra(botCoord, pointsCoords, map);
    case "salesman":
      return salesman(botCoord, pointsCoords, map);
  }
}

// HOOKS =====================================================================================

export default memo(Bot);
