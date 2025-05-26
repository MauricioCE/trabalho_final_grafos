import { useGameStore } from "../../../stores/mainStore";
import { coordinateToPosition } from "../../../utils/positionUtils";
import { Vector2 } from "../../../common/types";
import PlayerPoint from "../../../assets/svgs/ingame_points/player_point.svg?react";
import BotPointPoint from "../../../assets/svgs/ingame_points/bot_point.svg?react";

export default function PointsLayer() {
  const playerPointsCoords = useGameStore((state) => state.playerPointsCoords);
  const botPointsCoords = useGameStore((state) => state.botPointsCoords);

  function renderPoints(
    points: Vector2[],
    texture: React.ReactNode,
    keyPrefix: string
  ) {
    return points.map((coord) => {
      const pos = coordinateToPosition(coord);
      const Texture = texture;
      return (
        <g
          key={`${keyPrefix}-${coord.x}-${coord.y}`}
          transform={`translate(${pos.x}, ${pos.y})`}
        >
          {Texture}
        </g>
      );
    });
  }

  return (
    <g id="tiles_layer" fill="#fff">
      {renderPoints(botPointsCoords, <BotPointPoint />, "bot")}
      {renderPoints(playerPointsCoords, <PlayerPoint />, "player")}
    </g>
  );
}
