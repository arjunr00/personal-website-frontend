import React, { useContext } from 'react';

import { AppContext, Theme } from '../App';

import '../styles/ThemedDiv.scss';

function ThemedDiv(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): JSX.Element {
  const theme = useContext(AppContext).theme;

  return (
    <div
      {...({ className: undefined, ...props})}
      className={(props?.className ?? '') + ((theme === Theme.DARK) ? ' dark' : '')}
    >
    </div>
  );
}

export default ThemedDiv;
