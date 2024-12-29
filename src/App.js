import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import BillDashboard from './components/BillDashboard';
import store from './store/store';

const theme = createTheme();

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <BillDashboard />
      </Container>
    </ThemeProvider>
  </Provider>
  );
}

export default App;
