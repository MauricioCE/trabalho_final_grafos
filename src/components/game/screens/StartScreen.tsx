import { css } from "@emotion/react";
import { Constants } from "../../../common/constants";
import { motion } from "motion/react";

type Props = {
  onStart: () => void;
};

const exitAnimation = {
  exit: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export default function StartScreen({ onStart }: Props) {
  return (
    <>
      <div css={backgroundStyle} />
      <motion.div
        exit={exitAnimation.exit}
        variants={exitAnimation}
        css={wrapperStyle}
      >
        <div css={buttonWrapperStyle}>
          <div css={arrowStyle("left")} />
          <button css={buttonStyle} onClick={onStart}>
            Start Game
          </button>
          <div css={arrowStyle("right")} />
        </div>
      </motion.div>
    </>
  );
}

const backgroundStyle = css`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -100;
  background-color: ${Constants.colors.white_2};

  /* background: linear-gradient(to top, #00000010, #06070572, #1e2811); */
  /* mask-image: radial-gradient(); */
`;

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100svw;
  height: 100svh;
`;

const buttonWrapperStyle = css`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;

  div {
    opacity: 0;
  }

  :hover div {
    opacity: 1;
  }
`;

const buttonStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border: none;
  border-radius: 10px;
  font-size: 2.2rem;
  color: #2d2d2d;
  background-color: transparent;
  transition: 0.5s ease-in-out;
  cursor: pointer;
`;

const arrowStyle = (dir: "left" | "right") => css`
  width: 0;
  height: 0;
  border-style: solid;
  transition: 0.2s ease-in-out;

  ${dir === "right" &&
  css`
    border-width: 15px 15px 15px 0;
    border-color: transparent #2d2d2d transparent transparent;
  `}

  ${dir === "left" &&
  css`
    border-width: 15px 0 15px 15px; // Top, Right, Bottom, Left
    border-color: transparent transparent transparent #2d2d2d;
  `}
`;
