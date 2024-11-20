import { createTamagui } from 'tamagui';

const config = createTamagui({
  themes: {
    light: {
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      background: '#000000',
      text: '#ffffff',
    },
  },
  shorthands: {
    bg: 'backgroundColor',
    fg: 'color',
  },
  fonts: {
    body: {
      family: 'System',
      size: {
        1: 14,
        2: 16,
        3: 18,
      },
      weight: {
        1: '400',
        2: '700',
      },
      lineHeight: {
        1: 1.4,
        2: 1.6,
      },
    },
  },
  tokens: {
    size: {
      1: 4,
      2: 8,
      3: 16,
      4: 32,
      5: 64,
      true: 16,
    },
    space: {
      1: 4,
      2: 8,
      3: 16,
      4: 32,
      5: 64,
      true: 16,
    },
    color: {
      primary: '#0070f3',
      secondary: '#ff4081',
    },
    radius: {
      1: 4,
      2: 8,
      3: 16,
    },
    zIndex: {
      1: 1,
      2: 10,
      3: 100,
    },
  },
});

export default config;