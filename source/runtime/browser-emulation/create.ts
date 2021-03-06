import domino = require('domino');

import {bindAnimation} from './animation';
import {bindBase64} from './base64';
import {bindControl} from './control';
import {bindEvents} from './events';
import {bindHttp} from './http';
import {bindInteractions} from './interaction';
import {bindMutation} from './mutation-observer';
import {bindNavigator} from './navigator';
import {bindPosition} from './position';
import {bindSelection} from './selection';
import {bindStorage} from './storage';
import {bindStyle} from './style';
import {bindTypes} from './types';

Object.assign(global, {__domino_frozen__: false}); // allow overwrite

export const upgradeWindow = (target, window: () => Window): void => {
  const fills = [
    [true, domino.impl],
    [true, bindTypes],
    bindAnimation(window),
    bindBase64(window),
    bindControl(window),
    bindEvents(window),
    bindHttp(window),
    bindInteractions(window),
    bindMutation(window),
    bindNavigator(window),
    bindPosition(window),
    bindSelection(window),
    bindStorage(window),
    bindStyle(window),
  ];

  for (const [overwrite, properties] of fills) {
    for (const k in properties) {
      if (overwrite || typeof target[k] === 'undefined') {
        Object.defineProperty(target, k, {
          configurable: true,
          enumerable: false,
          value: properties[k],
          writable: true,
        });
      }
    }
  }
};

export const createModernWindow = (template: string, uri: string): Window => {
  const newWindow = domino.createWindow(template, uri);

  upgradeWindow(newWindow, () => newWindow);

  return newWindow;
};
