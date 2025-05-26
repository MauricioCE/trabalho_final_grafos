import { ReactNode } from "react";

type Props = {
  maxPoints: number;
  points: number;
  FilledPointComponent: React.ElementType;
  UnfilledPointComponent: React.ElementType;
  direction: "left-right" | "right-left";
};

export default function Score({
  maxPoints,
  points,
  FilledPointComponent,
  UnfilledPointComponent,
  direction,
}: Props) {
  const filledPoints: ReactNode[] = [];
  const unfilledPoints: ReactNode[] = [];

  for (let x = 0; x < points; x++) {
    unfilledPoints.push(<FilledPointComponent key={x} />);
  }

  for (let x = points; x < maxPoints; x++) {
    filledPoints.push(<UnfilledPointComponent key={x} />);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction === "left-right" ? "row" : "row-reverse",
      }}
    >
      {unfilledPoints}
      {filledPoints}
    </div>
  );
}
