import { css } from "@emotion/react";
import { ComponentProps } from "react";

type Props = {
  arrowSize?: string;
};

export default function ArrowsButton({
  arrowSize = "15px",
  children,
  color = "#2d2d2d",
  onClick,
  ...rest
}: Props & ComponentProps<"button">) {
  return (
    <button css={buttonStyle(color)} onClick={onClick} {...rest}>
      <div className="arrow" css={arrowStyle(arrowSize, "left", color)} />
      {children}
      <div className="arrow" css={arrowStyle(arrowSize, "right", color)} />
    </button>
  );
}

const buttonStyle = (color: string) => css`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  border: none;
  border-radius: 10px;
  font-size: 3rem;
  font-weight: 600;
  color: ${color};
  background-color: transparent;
  transition: 0.5s ease-in-out;
  cursor: pointer;

  .arrow {
    opacity: 0;
  }

  :hover .arrow {
    opacity: 1;
  }
`;

const arrowStyle = (size: string, dir: "left" | "right", color: string) => css`
  width: 0;
  height: 0;
  border-style: solid;
  transition: 0.2s ease-in-out;

  ${dir === "right" &&
  css`
    border-width: ${size} ${size} ${size} 0;
    border-color: transparent ${color} transparent transparent;
  `}

  ${dir === "left" &&
  css`
    border-width: ${size} 0 ${size} ${size};
    border-color: transparent transparent transparent ${color};
  `}
`;
