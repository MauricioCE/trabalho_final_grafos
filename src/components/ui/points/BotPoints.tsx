import Score from "./Points";
import FilledPoint from "../../../assets/svgs/ui_points/bot_filled_point.svg?react";
import UnfilledPoint from "../../../assets/svgs/ui_points/bot_unfilled_point.svg?react";
import { useGameplayStore } from "../../../stores/gameplayStore";

export default function BotPoints() {
  const maxPoints = useGameplayStore((state) => state.maxScore);
  const score = useGameplayStore((state) => state.botScore);
  return (
    <Score
      maxPoints={maxPoints}
      points={score}
      FilledPointComponent={FilledPoint}
      UnfilledPointComponent={UnfilledPoint}
      direction={"right-left"}
    />
  );
}
