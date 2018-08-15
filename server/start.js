require('babel-core/register')({
  'presets': [
    'stage-3',
    ["latest-node", { "target": "current" }]
  ],
  'plugins': [
    'transform-decorators-legacy'
  ]
})

require('babel-polyfill')
require('./server')
