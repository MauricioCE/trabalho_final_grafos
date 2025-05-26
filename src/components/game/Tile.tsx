import { memo } from "react";
import { Vector2 } from "../../common/types";
import { useGameStore } from "../../stores/mainStore";
import { coordinateToPosition } from "../../utils/positionUtils";
import DefaultTileTexture from "../../assets/svgs/tiles/default_tile_svg.svg?react";
import SlowOneTileTexture from "../../assets/svgs/tiles/slow_1_tile_svg.svg?react";
import SlowTwoTileTexture from "../../assets/svgs/tiles/slow_2_tile_svg.svg?react";
import SlowThreeTileTexture from "../../assets/svgs/tiles/slow_3_tile_svg.svg?react";
import TreeTileTexture from "../../assets/svgs/tiles/tree_tile_svg.svg?react";

type TileProps = { coord: Vector2 };

function Tile({ coord }: TileProps) {
  const map = useGameStore((state) => state.map);
  const name = map[coord.x][coord.y].name;
  const position = coordinateToPosition(coord);

  return (
    <>
      <g transform={`translate(${position.x}, ${position.y})`}>
        {getTexture(name)}
      </g>
    </>
  );
}

function getTexture(name: string) {
  switch (name) {
    case "default":
      return <DefaultTileTexture />;
    case "slow_1":
      return <SlowOneTileTexture />;
    case "slow_2":
      return <SlowTwoTileTexture />;
    case "slow_3":
      return <SlowThreeTileTexture />;
    case "tree":
      return <TreeTileTexture />;
  }
}

export default memo(Tile);
