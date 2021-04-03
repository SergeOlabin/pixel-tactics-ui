import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';
import store from './store/store';
import theme from './theme/theme';
import { Provider as HttpProvider } from 'use-http';
import { BASE_URL, HTTP_OPTIONS } from './shared/constants/http-options';
import SocketConnection from './shared/providers/GameConnection';
import { SnackbarProvider } from 'notistack';

ReactDOM.render(
  <HttpProvider url={BASE_URL} options={HTTP_OPTIONS}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={4000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <BrowserRouter>
            <SocketConnection>
              <Router />
            </SocketConnection>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </HttpProvider>,

  document.querySelector('#root'),
);
