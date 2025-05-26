import { ReactNode } from "react";
import { motion } from "motion/react";
import { Vector2 } from "../../../common/types";
import { coordinateToPosition } from "../../../utils/positionUtils";

interface Props {
  coord: Vector2;
  speed: number;
  texture: ReactNode;
  onMovementCompleted: () => void;
}

export default function Character({
  coord,
  speed = 0.1,
  texture,
  onMovementCompleted,
}: Props) {
  const position = coordinateToPosition(coord);

  return (
    <motion.g
      initial={{
        translateX: `${position.x}px`,
        translateY: `${position.y}px`,
      }}
      animate={{
        translateX: `${position.x}px`,
        translateY: `${position.y}px`,
      }}
      transition={{ duration: speed }}
      onAnimationComplete={onMovementCompleted}
    >
      {texture}
    </motion.g>
  );
}
