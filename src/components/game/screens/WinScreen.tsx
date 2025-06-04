import { css } from "@emotion/react";
import Confetti from "react-confetti";
import { Constants } from "../../../common/constants";

export default function WinScreen() {
  return (
    <div css={wrapperStyle}>
      <div css={textStyle}>Você venceu. Eba!!!</div>
      {
        <Confetti
          css={confettiStyle}
          width={1920}
          height={1000}
          numberOfPieces={400}
          friction={1}
        />
      }
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100svw;
  height: 100svh;
  background-color: ${Constants.colors.white_1};
`;

const textStyle = css`
  font-size: 65px;
`;

const confettiStyle = css`
  position: absolute;
  transform: translateY(-100px);
`;
