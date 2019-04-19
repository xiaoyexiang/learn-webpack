import './css/base.css'

import './stylus/main.styl'


import(/* webpackChunkName: 'lodash'*/ 'lodash').then(function(_) {
  console.log(_.join(['1', '2']))
})