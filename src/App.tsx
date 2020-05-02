import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from '@material-ui/core';
import { ThemeContext } from './ThemeProvider';

import MainMenuBar from './TabPanel';

function App() {
    const setThemeName = useContext(ThemeContext)
  return (
    <div className="App">
          <Button
              variant="contained"
              color="primary"
              onClick={() => setThemeName("lightTheme")}
          >
              Set Light Theme
        </Button>
          <Button
              variant="contained"
              color="secondary"
              onClick={() => setThemeName("darkTheme")}
          >
              Set Dark Theme
        </Button>
        <MainMenuBar/>
    </div>
  );
}

export default App;
