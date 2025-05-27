import { css } from "@emotion/react";
import BotPoints from "../../ui/points/BotPoints";
import PlayerPoints from "../../ui/points/PlayerPoints";
import InputManager from "../InputManager";
import { Stage, StageResult } from "../../../common/types";
import { Constants } from "../../../common/constants";
import Map from "../Map";
import { motion } from "motion/react";
import ModalCounter from "../../ui/ModalCounter";
import { useState } from "react";
import { useGameplayStore } from "../../../stores/gameplayStore";
import { stages } from "../../../stages/stages";
import StageWinLoseModal from "../../ui/StageWinLoseModal";

const stage: Stage = stages[0];
const maxWidth = "1600px";

export default function GameplayScreen() {
  const [showCounter, setShowCounter] = useState(true);
  let stageResult: StageResult | undefined;
  const setGameState = useGameplayStore((state) => state.setGameState);
  const playerScore = useGameplayStore((state) => state.playerScore);
  const botScore = useGameplayStore((state) => state.botScore);
  const maxScore = useGameplayStore((state) => state.maxScore);
  const counterDuration = 3;

  if (playerScore === maxScore) {
    setGameState("paused");
    stageResult = "win";
  }

  if (botScore === maxScore) {
    setGameState("paused");
    stageResult = "lose";
  }

  function startGameplay() {
    setGameState("running");
    setShowCounter(false);
  }

  return (
    <>
      <InputManager />
      {stageResult && <StageWinLoseModal result={stageResult} />}
      {showCounter && (
        <ModalCounter duration={counterDuration} onTimerOut={startGameplay} />
      )}
      <div css={backgroundStyle} />
      <div id="game-view" css={wrapperStyle}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          css={mainContainerStyle}
        >
          <div css={headerStyle}>
            <PlayerPoints />
            <span css={textStyle}>Fase 1 - Algoritmo BFS</span>
            <BotPoints />
          </div>
          {/* Map */}
          <Map css={mapStyle} stage={stage} />
        </motion.div>
      </div>
    </>
  );
}

// STYLES =====================================================================================

const headerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 90svh;
  padding: 0 20px;
`;

const wrapperStyle = css`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100svh;
  max-height: 100vh;
  overflow: hidden;
`;

const mainContainerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: ${maxWidth};
  height: 100%;
  padding: 10px 20px;
  flex: 1;
`;

const backgroundStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: ${Constants.colors.white_2};

  /* background: linear-gradient(to top, #00000010, #06070572, #1e2811); */
  /* mask-image: radial-gradient(); */
`;

const mapStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90svh;
`;

const textStyle = css`
  font-size: 1.4rem;
  color: #3d3d3d;
  font-weight: 600;
`;
