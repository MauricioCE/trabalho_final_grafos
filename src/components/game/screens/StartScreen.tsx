import { css } from "@emotion/react";
import { Constants } from "../../../common/constants";
import { motion } from "motion/react";
import ArrowsButton from "../../ui/ArrowsButton";

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
        <ArrowsButton onClick={onStart}>Start Game</ArrowsButton>
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
