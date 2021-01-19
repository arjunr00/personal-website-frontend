import React, { createContext, useState } from 'react';

import Logo from './Logo';

import './styles/App.scss';

export enum Theme {
  DARK, LIGHT
};

interface AppContextData {
  theme?: Theme,
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>
};

export const AppContext = createContext<AppContextData>({});

function App(): JSX.Element {
  const [ theme, setTheme ] = useState<Theme>(Theme.LIGHT);

  return(
    <AppContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme
      }}
    >
      <div
        id='main-container'
        className={(theme === Theme.DARK) ? ' dark' : ''}
      >
        <button
          id='toggle-theme-btn'
          onClick={_ => {
            setTheme(old => old === Theme.DARK ? Theme.LIGHT : Theme.DARK);
          }}
        >
          Toggle Theme
        </button>
        <Logo />
      </div>
    </AppContext.Provider>
  );
}

export default App;
