import { css } from "@emotion/react";
import { Constants } from "../../common/constants";
import TilesLayer from "./layers/TilesLayer";
import { useGameStore } from "../../stores/mainStore";
import { useMemo } from "react";
import Player from "./actors/Player";
import Bot from "./actors/Bot";
import PointsLayer from "./layers/PointsLayer";
import { StageData, Stage, TileData, TileType } from "../../common/types";
import PathLayer from "./layers/PathLayer";
import { useGameplayStore } from "../../stores/gameplayStore";

enum TileTypeId {
  DEFAULT = "1",
  SLOW_01 = "2",
  SLOW_02 = "3",
  SLOW_03 = "4",
  TREE = "t",
}

type Props = {
  className?: string;
  stage: Stage;
};

const tileSize = Constants.map.tileSize;
const tileGap = Constants.map.tileGap;

export default function Map({ stage, ...rest }: Props) {
  const setMap = useGameStore((state) => state.setMap);
  const setPlayerPointsCoords = useGameStore(
    (state) => state.setPlayerPointsCoords
  );
  const setBotPointsCoords = useGameStore((state) => state.setBotPointsCoords);
  const setMapSize = useGameStore((state) => state.setMapSize);
  const setMaxScore = useGameplayStore((state) => state.setMaxScore);

  const stageData = useMemo(() => {
    const data = getStageData(stage);
    setMap(data.map);
    setMapSize(data.size);
    setPlayerPointsCoords(data.playerPointsCoords);
    setBotPointsCoords(data.botPointsCoords);
    setMaxScore(data.maxPoints);
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  return (
    <div css={wrapperStyle} {...rest}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${stageData.size.width - Constants.map.tileGap} ${
          stageData.size.height - Constants.map.tileGap
        }`}
        preserveAspectRatio="xMidYMin meet"
      >
        <TilesLayer />
        <PointsLayer />
        <PathLayer />
        <Player initialCoord={stageData.playerCoord} />
        <Bot
          initialCoord={stageData.botCoord}
          pointsCoords={stageData.botPointsCoords}
        />
      </svg>
    </div>
  );
}

// FUNCTIONS =====================================================================================

function getStageData(stage: Stage): StageData {
  const map: TileData[][] = [];
  const mapHeight = stage.height;
  const mapWidth = stage.width;

  for (let x = 0; x < mapHeight; x++) {
    const row = stage.tilesLayout[x].split(" ");
    for (let y = 0; y < mapWidth; y++) {
      const char = row[y];
      if (map[y] === undefined) map[y] = [];
      const tileData = getTileData(char.toLowerCase());
      map[y].push({
        coord: { x: y, y: x },
        speed: tileData.drag,
        name: tileData.name,
        type: tileData.type,
      });
    }
  }

  return {
    map: map,
    size: {
      width: mapWidth * tileSize + mapWidth * tileGap,
      height: mapHeight * tileSize + mapHeight * tileGap,
    },
    playerCoord: stage.playerCoord,
    playerPointsCoords: stage.playerPointsCoords,
    botCoord: stage.botCoord,
    botPointsCoords: stage.botPointsCoords,
    maxPoints: stage.maxPoints,
  };
}

function getTileData(char: string): {
  name: string;
  drag: number;
  type: TileType;
} {
  switch (char) {
    case TileTypeId.SLOW_01:
      return {
        name: "slow_1",
        type: "floor",
        drag: Constants.tilesSpeed.slow1,
      };
    case TileTypeId.SLOW_02:
      return {
        name: "slow_2",
        type: "floor",
        drag: Constants.tilesSpeed.slow2,
      };
    case TileTypeId.SLOW_03:
      return {
        name: "slow_3",
        type: "floor",
        drag: Constants.tilesSpeed.slow3,
      };
    case TileTypeId.TREE:
      return { name: "tree", type: "tree", drag: Constants.tilesSpeed.tree };
    default:
      return {
        name: "default",
        type: "floor",
        drag: Constants.tilesSpeed.default,
      };
  }
}

// STYLES =====================================================================================

const wrapperStyle = css`
  width: 100%;
  height: 100%;
  border: 3px dotted #a0a0a0;
  border-radius: 20px;
  padding: 20px;
`;
