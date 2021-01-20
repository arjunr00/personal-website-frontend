import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useEffect, useRef, useState } from 'react';

import ThemedDiv from './helper/ThemedDiv';
import Logo from './Logo';

import './styles/Title.scss';

function Title(): JSX.Element {
  const ANIM_START_DELAY = 300;
  const ANIM_MAIN_STEP_DURATION = 500;

  const [ logoAnimDone, setLogoAnimDone ] = useState(false);

  const animTimelineRef = useRef<AnimeTimelineInstance | null>(null);

  useEffect(() => {
    const timeline: AnimeTimelineInstance = anime.timeline({
      autoplay: false,
      duration: ANIM_MAIN_STEP_DURATION,
    });

    const centerX = window.innerWidth / 2;
    const logoRect =
      document.getElementById('logo-container')?.getBoundingClientRect();
    const logoXPos = logoRect ? logoRect.x + (logoRect.width / 2) : centerX;

    timeline.add({
      easing: 'easeInOutExpo',
      targets: '#logo-container',
      translateX: [centerX - logoXPos, 0],
      delay: ANIM_START_DELAY,
    });

    timeline.add({
      easing: 'easeOutExpo',
      targets: '#separator',
      scaleY: [0, 1],
    }, '-=50');

    const titleTextRect =
      document.getElementById('title-text-container')?.getBoundingClientRect();
    const titleTextWidth = titleTextRect?.width ?? 0;

    timeline.add({
      easing: 'easeOutExpo',
      targets: '#title-text-container *',
      translateX: [-1 * titleTextWidth, 0],
      opacity: [0, 1],
      duration: 2 * ANIM_MAIN_STEP_DURATION,
      delay: anime.stagger(ANIM_MAIN_STEP_DURATION / 4),
    }, `-=${ANIM_MAIN_STEP_DURATION / 2}`);

    animTimelineRef.current = timeline;
  }, []);

  useEffect(() => {
    if (logoAnimDone) animTimelineRef.current?.play();
  }, [ logoAnimDone ]);

  return (
    <ThemedDiv
      id='title-container'
    >
      <Logo
        onAnimationEnd={() => setLogoAnimDone(true)}
      />
      <ThemedDiv id='separator'></ThemedDiv>
      <ThemedDiv
        id='title-text-container'
      >
        <h1>Arjun Raghavan</h1>
        <h2>Insert subtitle here</h2>
      </ThemedDiv>
    </ThemedDiv>
  );
}

export default Title;
