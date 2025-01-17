import { createStitches } from '@stitches/react';

// Criação do Stitches com tema e media queries
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

// Estilos globais
export const globalStyles = globalCss({
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' },
  body: { 
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '$background',
    color: '$text',
  },
  a: {
    color: '$secondary', // Cor do link
    textDecoration: 'none', // Remover sublinhado
    '&:hover': {
      textDecoration: 'underline', // Sublinhado ao passar o mouse
    },
  },
});

// Componente de botão estilizado
export const Button = styled('button', {
  backgroundColor: '$primary',
  color: '$background',
  border: 'none',
  borderRadius: '4px',
  padding: '10px 20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: '$secondary',
  },
});

// Aplicar estilos globais
globalStyles();
