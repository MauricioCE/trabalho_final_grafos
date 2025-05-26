import { css } from "@emotion/react";
import LegendItem from "./LegendItem";
import { Constants } from "../../common/constants";

type Props = {
  className?: string;
};

export default function Legend({ ...props }: Props) {
  return (
    <ul css={wrapperStyle} {...props}>
      <LegendItem
        color={Constants.tileColors.visited}
        text="visitado"
        tileText="0"
        renderText
      />
      <LegendItem color={Constants.tileColors.queued} text="enfileirado" />
      <LegendItem
        color={Constants.tileColors.current}
        text="atual"
        tileText="0"
      />
      <LegendItem color="none" renderStroke text="vizinho" />
      <LegendItem color={Constants.tileColors.wall} text="muro" />
    </ul>
  );
}

const wrapperStyle = css`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: max-content;
  color: "white";
`;
