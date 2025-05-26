// COMPONENT =====================================================================================

import { ReactNode, useState } from "react";
import GameplayScreen from "./screens/GameplayScreen";
import StartScreen from "./screens/StartScreen";
import { AnimatePresence } from "motion/react";

export default function Game() {
  const [screen, setScreen] = useState<ReactNode>(
    <StartScreen key="startScreen" onStart={onStartGameplay} />
  );

  function onStartGameplay() {
    setScreen(<GameplayScreen key="gameplayScreen" />);
  }

  return <AnimatePresence mode="wait">{screen}</AnimatePresence>;
}
