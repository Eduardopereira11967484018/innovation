import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      primary: '#89C440',
      secondary: '#0CA8E6',
      background: '#ffffff',
      text: '#333333',
      muted: '#666666',
      border: '#e2e2e2',
    },
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
  },
});

export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { 
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '$background',
    color: '$text',
  },
});

