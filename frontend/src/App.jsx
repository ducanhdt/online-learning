import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import AppRouter from './routes/AppRouter';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Provider store={store()}>
          <SnackbarProvider>
            <AppRouter />
          </SnackbarProvider>
        </Provider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default App;
