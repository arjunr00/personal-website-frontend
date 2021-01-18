import anime from 'animejs';
import React, { useEffect, useRef } from 'react';

import './styles/Logo.scss';

import LogoSvg from '../assets/logo.svg';

function Logo(): JSX.Element {

  const animationRef = useRef<anime.AnimeInstance | null>(null);

  useEffect(() => {
    animationRef.current = anime({
      targets: 'path',
      strokeDashoffset: [anime.setDashoffset, 0],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 1500,
      delay: anime.stagger(100),
    });
  }, []);

  return(
    <div
      id='logo-container'
    >
      <div
        id='logo'
        dangerouslySetInnerHTML={{__html: LogoSvg}}
      >
      </div>
    </div>
  );
}

export default Logo;
