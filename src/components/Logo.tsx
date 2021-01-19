import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useContext, useEffect, useRef } from 'react';

import { AppContext, Theme } from './App';

import './styles/Logo.scss';

import LogoSvg from '../assets/logo.svg';
import LogoDarkSvg from '../assets/logo_dark.svg';

function Logo(): JSX.Element {
  const ANIM_MAIN_STEP_DURATION = 500;
  const ANIM_INIT_STEP_DURATION = ANIM_MAIN_STEP_DURATION;
  const ANIM_MAIN_START = 1.5 * ANIM_INIT_STEP_DURATION;

  const theme = useContext(AppContext).theme;

  const animTimelineRef = useRef<AnimeTimelineInstance | null>(null);

  useEffect(() => {
    const timeline: AnimeTimelineInstance = anime.timeline();

    // Pop in circles (staggered)
    timeline.add({
      easing: 'easeOutBack',
      targets: '.fill',
      r: [0, 33],
      duration: ANIM_INIT_STEP_DURATION,
      delay: anime.stagger(ANIM_INIT_STEP_DURATION / 3),
    }, 0);

    // reveal circle outlines
    timeline.add({
      easing: 'easeInOutSine',
      targets: '#a_bot_outline, #a_top_outline, #r_outline',
      strokeDashoffset: [
        anime.setDashoffset,
        0,
      ],
      duration: ANIM_INIT_STEP_DURATION,
      delay: anime.stagger(ANIM_INIT_STEP_DURATION / 3),
    }, ANIM_INIT_STEP_DURATION);

    // Draw bottom arc of a
    timeline.add({
      easing: 'easeInSine',
      targets: '#a_bot_arc',
      strokeDashoffset: [
        anime.setDashoffset,
        (el: HTMLElement | SVGElement | null): number => {
          return 2 * anime.setDashoffset(el);
        },
      ],
      duration: ANIM_MAIN_STEP_DURATION,
    }, ANIM_MAIN_START);

    // Draw top arc of a outwards from center as bottom arc finishes
    timeline.add({
      easing: 'easeOutSine',
      targets: '#a_top_arc',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: ANIM_MAIN_STEP_DURATION,
    }, ANIM_MAIN_START + ANIM_MAIN_STEP_DURATION);

    // Draw r arc outwards from center along with top arc of a
    timeline.add({
      easing: 'easeOutSine',
      targets: '#r_arc',
      strokeDashoffset: [
        anime.setDashoffset,
        (el: HTMLElement | SVGElement | null): number => {
          return 2 * anime.setDashoffset(el);
        },
      ],
      duration: 2 * ANIM_MAIN_STEP_DURATION / 3,
    }, ANIM_MAIN_START + 5 * ANIM_MAIN_STEP_DURATION / 4);

    // Draw stem bottom up to match top arc of a and r
    timeline.add({
      easing: 'easeOutSine',
      targets: '#stem',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: 3 * ANIM_MAIN_STEP_DURATION / 4,
    }, ANIM_MAIN_START + ANIM_MAIN_STEP_DURATION);

    // Pop in extra fill to mask gap between stem and bottom of a
    timeline.add({
      easing: 'linear',
      targets: '#a_bot_extra_fill',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: 3 * ANIM_MAIN_STEP_DURATION / 4,
    }, `-=${ANIM_MAIN_STEP_DURATION}`);

    animTimelineRef.current = timeline;
  }, [ theme ]);

  return(
    <div
      id='logo-container'
    >
      <div
        id='logo'
        dangerouslySetInnerHTML={{
          __html: theme === Theme.DARK ? LogoDarkSvg : LogoSvg
        }}
      >
      </div>
    </div>
  );
}

export default Logo;
