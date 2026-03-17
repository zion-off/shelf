const palette = [
  "b5451b", // burnt sienna
  "3d6b5e", // deep sage
  "4a6fa5", // slate blue
  "7b5ea7", // dusty violet
  "b87333", // copper
  "2e4057", // navy slate
  "6b8f71", // muted moss
  "a0522d", // saddlebrown
  "4e7c89", // steel teal
  "8b5e6a", // mauve rose
];

export const tailwindSafeColors: string[] = [];

const hashTitle = (title: string) => {
  let h = 0;
  for (let i = 0; i < title.length; i++) {
    h = (h * 31 + title.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(h);
};

export const getPlaceholderColor = (title: string) => {
  return palette[hashTitle(title) % palette.length];
};
