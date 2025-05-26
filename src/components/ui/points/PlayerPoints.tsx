import Score from "./Points";
import FillePoint from "../../../assets/svgs/ui_points/player_filled_point.svg?react";
import UnfilledPoint from "../../../assets/svgs/ui_points/player_unfilled_point.svg?react";
import { useGameplayStore } from "../../../stores/gameplayStore";

export default function PlayerPoints() {
  const maxPoints = useGameplayStore((state) => state.maxScore);
  const score = useGameplayStore((state) => state.playerScore);
  return (
    <Score
      maxPoints={maxPoints}
      points={score}
      FilledPointComponent={FillePoint}
      UnfilledPointComponent={UnfilledPoint}
      direction={"left-right"}
    />
  );
}
