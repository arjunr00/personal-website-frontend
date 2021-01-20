import React, { createContext, useState } from 'react';

import ThemedDiv from './helper/ThemedDiv';
import Title from './Title';

import './styles/App.scss';

export enum Theme {
  DARK, LIGHT
}

interface AppContextData {
  theme?: Theme,
  setTheme?: React.Dispatch<React.SetStateAction<Theme>>
}

export const AppContext = createContext<AppContextData>({});

function App(): JSX.Element {
  const [ theme, setTheme ] = useState<Theme>(Theme.LIGHT);

  return(
    <AppContext.Provider
      value={{
        theme: theme,
        setTheme: setTheme,
      }}
    >
      <ThemedDiv
        id='main-container'
      >
        <button
          id='toggle-theme-btn'
          onClick={() => {
            setTheme(old => old === Theme.DARK ? Theme.LIGHT : Theme.DARK);
          }}
        >
          Toggle Theme
        </button>
        <Title />
      </ThemedDiv>
    </AppContext.Provider>
  );
}

export default App;
