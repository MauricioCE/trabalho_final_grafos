import { Routes, Route, Navigate } from "react-router";
import StartScreen from "../components/game/screens/StartScreen";
import GameplayScreen from "../components/game/screens/GameplayScreen";
import WinScreen from "../components/game/screens/WinScreen";

export default function GameRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"start"} />} />
      <Route path="/start" element={<StartScreen />} />
      <Route path="/stage/:stageId" element={<GameplayScreen />} />
      <Route path="/win" element={<WinScreen />} />
    </Routes>
  );
}
