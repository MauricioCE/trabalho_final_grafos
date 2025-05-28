import { css } from "@emotion/react";
import { StageResult } from "../../common/types";
import ArrowsButton from "./ArrowsButton";

type Props = {
  result: StageResult;
  onClick: () => void;
};

export default function StageWinLoseModal({ result: state, onClick }: Props) {
  return (
    <div css={wrapper(state)}>
      <div css={backgroundStyle(state)} />
      <span>{state === "win" ? "You Win" : "You Lose"}</span>
      <ArrowsButton
        arrowSize="10px"
        css={buttonStyle}
        color={state === "win" ? "#2d2d2d" : "#fff"}
        onClick={onClick}
      >
        {state === "win" ? "Next stage" : "Retry"}
      </ArrowsButton>
    </div>
  );
}

const wrapper = (state: "win" | "lose") => css`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
  font-size: 5rem;
  font-weight: 600;
  color: ${state === "win" ? "#191919" : "#fff"};
`;

const backgroundStyle = (state: "win" | "lose") => css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${state === "win" ? "#fff" : "#000"};
  opacity: 0.9;
  z-index: -1;
`;

const buttonStyle = css`
  font-size: 1.5rem;
`;
