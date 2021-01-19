import anime, { AnimeTimelineInstance } from 'animejs';
import React, { useEffect, useRef } from 'react';

import './styles/Logo.scss';

import LogoSvg from '../assets/logo.svg';

function Logo(): JSX.Element {
  const ANIM_MAIN_STEP_DURATION = 500;
  const ANIM_INIT_STEP_DURATION = ANIM_MAIN_STEP_DURATION;
  const ANIM_MAIN_START = 1.5 * ANIM_INIT_STEP_DURATION;

  const animTimelineRef = useRef<AnimeTimelineInstance | null>(null);

  useEffect(() => {
    const timeline: AnimeTimelineInstance = anime.timeline();

    timeline.add({
      easing: 'easeOutBack',
      targets: '.fill',
      r: [0, 33],
      duration: ANIM_INIT_STEP_DURATION,
      delay: anime.stagger(ANIM_INIT_STEP_DURATION / 3),
    }, 0);

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

    timeline.add({
      easing: 'easeOutSine',
      targets: '#a_top_arc',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: ANIM_MAIN_STEP_DURATION,
    }, ANIM_MAIN_START + ANIM_MAIN_STEP_DURATION);

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

    timeline.add({
      easing: 'easeOutSine',
      targets: '#stem',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: 3 * ANIM_MAIN_STEP_DURATION / 4,
    }, ANIM_MAIN_START + ANIM_MAIN_STEP_DURATION);

    timeline.add({
      easing: 'linear',
      targets: '#a_bot_extra_fill',
      strokeDashoffset: [ anime.setDashoffset, 0 ],
      duration: 3 * ANIM_MAIN_STEP_DURATION / 4,
    }, `-=${ANIM_MAIN_STEP_DURATION}`);

    animTimelineRef.current = timeline;
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
