import { appmaker } from '@appmaker-xyz/core';
import { blocks } from '../blocks/index';
import { registerActions } from '../actions';
import { setSettings } from '../config.js';

export function activate(params) {
  registerActions();
  setSettings(params?.settings);
  console.log('whatmore-shoppable-videos activated with config', params);
}
const WhatmoreShoppableVideos = {
  id: 'whatmore-shoppable-videos',
  activate,
  blocks
};
appmaker.registerPlugin(WhatmoreShoppableVideos);
export default WhatmoreShoppableVideos;
