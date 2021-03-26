import { green, indigo } from '@material-ui/core/colors';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

interface ICardShadows {
  hover?: string;
  active?: string;
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    cardShadows?: ICardShadows;
  }

  interface Palette {
    cardShadows?: ICardShadows;
  }
}

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    // primary: {
    //   // main: '#af55d6',
    //   m,
    // },
    error: {
      main: red.A400,
    },
    background: {
      default: '#E1E2E1',
    },
    cardShadows: {
      hover: `0 0 20px 10px ${indigo[200]}`,
      active: `0 0 20px 10px ${green.A700}`,
    },
  },
  typography: {
    fontSize: 10,
    body1: {
      lineHeight: 1.2,
    },
  },
});

export default theme;
