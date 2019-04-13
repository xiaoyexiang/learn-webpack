import _ from 'lodash';

import sum from './vendor/sum.js';
console.log('sum(1, 2) = ', sum(1, 2));

var minus = require('./vendor/minus.js');
console.log('minus(1, 2) = ', minus(1, 2));

import multi from './vendor/multi.js';
console.log('multi(1, 2) = ', multi(1, 2));

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by script.
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());