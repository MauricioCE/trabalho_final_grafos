import { Routes, Route, Navigate } from "react-router";
import StartScreen from "../components/game/screens/StartScreen";
import GameplayScreen from "../components/game/screens/GameplayScreen";

export default function GameRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"start"} />} />
      <Route path="/start" element={<StartScreen />} />
      <Route path="/stage/:stageId" element={<GameplayScreen />} />
    </Routes>
  );
}
