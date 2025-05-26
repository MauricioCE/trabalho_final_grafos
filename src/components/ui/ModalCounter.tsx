import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  duration: number;
  onTimerOut: () => void;
};

export default function ModalCounter({ duration, onTimerOut }: Props) {
  const [text, setText] = useState(`${duration}`);
  const [time, setTime] = useState(duration);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (time >= 0) {
      timeout.current = setTimeout(() => {
        setTime(time - 1);
        setText(`${time - 1}`);
      }, 1000);
    } else {
      setText("GO");
    }
  }, [time]);

  function onTimerEnded() {
    if (time < 0) {
      setTimeout(() => {
        onTimerOut();
      }, 500);
    }
  }

  return (
    <div css={wrapperStyle}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: 1, scale: 1 }}
          key={text}
          css={counterStyle}
          onAnimationComplete={onTimerEnded}
        >
          {text}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const wrapperStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000052;
  z-index: 1000;
`;

const counterStyle = css`
  color: #232323;
  -webkit-text-stroke: 2px white;
  font-size: 7rem;
`;
