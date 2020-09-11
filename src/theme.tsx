import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#af55d6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#E1E2E1',
    },
  },
});

export default theme;
