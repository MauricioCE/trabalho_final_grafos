import PlayerTexture from "../../../assets/svgs/actors/player.svg?react";
import Character from "./Character";
import { useGameStore } from "../../../stores/mainStore";
import { memo, useEffect, useState } from "react";
import {
  GameMap,
  GameState,
  MovementKeys,
  Vector2,
} from "../../../common/types";
import { getNextCoord, isSamePosition } from "../../../utils/positionUtils";
import { useGameplayStore } from "../../../stores/gameplayStore";

const moveKeys: MovementKeys = {
  up: "w",
  down: "s",
  left: "a",
  right: "d",
};

function Player({ initialCoord }: { initialCoord: Vector2 }) {
  const [coord, setCoord] = useState(initialCoord);
  const [canMove, setCanMove] = useState(false);
  const [speed, setSpeed] = useState(0);
  const gameState = useGameplayStore((state) => state.gameState);
  const maxScore = useGameplayStore((state) => state.maxScore);
  const setPlayerScore = useGameplayStore((state) => state.setPlayerScore);
  const pressedKey = useGameStore((state) => state.pressedKey);
  const pointsCoords = useGameStore((state) => state.playerPointsCoords);
  const setPointsCoords = useGameStore((state) => state.setPlayerPointsCoords);
  const map = useGameStore((state) => state.map);

  useHandleState(gameState, setCanMove);

  useHandlePressedKey(
    canMove,
    coord,
    gameState,
    pressedKey,
    map,
    setCanMove,
    setCoord,
    setSpeed
  );

  function handleMovement() {
    handlePoint();

    if (gameState === "running") {
      setCanMove(true);
    }
  }

  function handlePoint() {
    const newCoords = pointsCoords.filter(
      (pointCoord) => !isSamePosition(pointCoord, coord)
    );

    if (newCoords.length !== pointsCoords.length) {
      setPointsCoords([...newCoords]);
      setPlayerScore(maxScore - newCoords.length);
    }
  }

  return (
    <Character
      coord={coord}
      speed={speed}
      texture={<PlayerTexture />}
      onMovementCompleted={handleMovement}
    />
  );
}

// HOOKS =====================================================================================

function useHandlePressedKey(
  canMove: boolean,
  coord: Vector2,
  gameState: GameState,
  pressedKey: { value: string },
  map: GameMap,
  setCanMove: (value: boolean) => void,
  setCoord: (value: Vector2) => void,
  setSpeed: (value: number) => void
) {
  useEffect(() => {
    if (gameState === "paused") return;
    const keysValues = Object.values(moveKeys);

    if (keysValues.includes(pressedKey.value)) {
      const nextCoord = getNextCoord(pressedKey.value, moveKeys, coord);

      if (!isSamePosition(nextCoord, coord) && canMove) {
        setCanMove(false);
        setCoord(nextCoord);
        setSpeed(map[nextCoord.x][nextCoord.y].speed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedKey]);
}

function useHandleState(
  gameState: GameState,
  setCanMove: (value: boolean) => void
) {
  useEffect(() => {
    setCanMove(gameState === "running");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState]);
}

export default memo(Player);
