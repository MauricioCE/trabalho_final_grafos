import { css } from "@emotion/react";
import InputManager from "../InputManager";
import { StageResult } from "../../../common/types";
import { Constants } from "../../../common/constants";
import Map from "../Map";
import { motion } from "motion/react";
import ModalCounter from "../../ui/ModalCounter";
import { useEffect, useState } from "react";
import { useGameplayStore } from "../../../stores/gameplayStore";
import { getStage } from "../../../stages/stages";
import StageWinLoseModal from "../../ui/StageWinLoseModal";
import { useNavigate, useParams } from "react-router";
import GameplayHeader from "../../ui/GameplayHeader";

export default function GameplayScreen() {
  const [showCounter, setShowCounter] = useState(true);
  const [result, setResult] = useState<StageResult | null>(null);

  const playerScore = useGameplayStore((state) => state.playerScore);
  const setBotScore = useGameplayStore((state) => state.setBotScore);
  const maxScore = useGameplayStore((state) => state.maxScore);

  const setAlgorithm = useGameplayStore((state) => state.setAlgorithm);
  const setPlayerScore = useGameplayStore((state) => state.setPlayerScore);
  const botScore = useGameplayStore((state) => state.botScore);
  const setGameState = useGameplayStore((state) => state.setGameState);

  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = getStage(stageId!);
  const counterDuration = 0;

  useEffect(() => {
    setAlgorithm(stage.algorithm);
  }, [setAlgorithm, stage]);

  useEffect(() => {
    if (playerScore === maxScore) {
      setGameState("paused");
      setResult("win");
    }

    if (botScore === maxScore) {
      setGameState("paused");
      setResult("lose");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [botScore, playerScore]);

  function startGameplay() {
    setGameState("running");
    setShowCounter(false);
  }

  function handleStageEnded() {
    if (result === "win") {
      const nextStage =
        stage.nextStage !== "" ? `/stage/${stage.nextStage}` : "/win";

      setGameState("not-initialized");
      setResult(null);
      setShowCounter(true);
      setPlayerScore(0);
      setBotScore(0);
      navigate(nextStage);
      setAlgorithm(stage.algorithm);
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <InputManager />
      {renderStageWinLoseModal(result, handleStageEnded)}
      {renderTimer(showCounter, counterDuration, startGameplay)}
      <div css={backgroundStyle} />
      <div css={wrapperStyle}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          css={mainContainerStyle}
        >
          <GameplayHeader css={headerStyle} stageName={stage.stageName} />
          <Map css={mapStyle} stage={stage} />
        </motion.div>
      </div>
    </>
  );
}

function renderStageWinLoseModal(
  stageResult: StageResult | null,
  handleStageEnded: () => void
) {
  return (
    stageResult && (
      <StageWinLoseModal onClick={handleStageEnded} result={stageResult} />
    )
  );
}

function renderTimer(
  showCounter: boolean,
  duration: number,
  onStateGameplay: () => void
) {
  return (
    showCounter && (
      <ModalCounter duration={duration} onTimerOut={onStateGameplay} />
    )
  );
}

// STYLES =====================================================================================

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
  height: 100%;
  padding: 10px 20px;
  flex: 1;
`;

const headerStyle = css`
  max-width: 130svh;
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
  max-width: 130svh;
`;
