const TileColors = {
  primary: "#32a651",
  black_1: "#000",
  black_2: "#191919",
  brightGreen: "#32a651",
  brightGreenTransp: "#32a65188",
  darkBlue: "#0e1867",
  darkGreen_1: "#20533c",
  darkGreen_2: "#1C342A",
  lightBlue: "#1b7ccd",
  mediumBlue: "#2a2ec4",
  mediumGray: "#008f85",
  white_1: "#fff",
  white_2: "#fcfafc",
};

export const Constants = {
  colors: TileColors,
  gapColor: TileColors.white_2,
  map: {
    tileSize: 64,
    tileGap: -0.8,
    maxMapWidth: 700,
  },
  tilesSpeed: {
    default: 0.1,
    slow1: 0.4,
    slow2: 0.6,
    slow3: 1,
    tree: 0.1,
  },
  textSize: {
    extraBig: "3rem",
    big: "2rem",
    medium: "1.5rem",
    small: "1rem",
    extraSmall: "0.8rem",
  },
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },
  directions: {
    up: { x: -1, y: 0 },
    left: { x: 0, y: -1 },
    down: { x: 1, y: 0 },
    right: { x: 0, y: 1 },
  },

  getDirections: () => {
    return Object.values(Constants.directions);
  },
} as const;
