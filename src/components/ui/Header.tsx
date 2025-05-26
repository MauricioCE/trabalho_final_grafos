import { css } from "@emotion/react";
import { Constants } from "../../common/constants";

type Props = {
  className?: string;
  title: string;
};

export default function Header({ className, title }: Props) {
  return (
    <header css={headerStyle} className={className}>
      {title}
    </header>
  );
}

const headerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${Constants.colors.primary};
  color: ${Constants.colors.black_2};
`;
