import React, { useContext } from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from '@material-ui/core';
import { ThemeContext } from './ThemeProvider';

function App() {
    const setThemeName = useContext(ThemeContext)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello Fred!
        </a>
          </header>
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
    </div>
  );
}

export default App;
