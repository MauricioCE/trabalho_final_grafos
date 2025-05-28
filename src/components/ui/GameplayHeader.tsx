import PlayerPoints from "./points/PlayerPoints";
import BotPoints from "./points/BotPoints";
import { css } from "@emotion/react";

type Props = {
  className?: string;
  stageName: string;
};

export default function GameplayHeader({ className, stageName }: Props) {
  return (
    <div css={wrapperStyle} className={className}>
      <PlayerPoints />
      <span css={textStyle}>{stageName}</span>
      <BotPoints />
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const textStyle = css`
  font-size: 1.4rem;
  color: #3d3d3d;
  font-weight: 600;
`;
