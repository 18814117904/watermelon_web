'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
BASE_URL: '"http://www.panzhihui.cn/watermelon"',
BASE_API: '"http://www.panzhihui.cn/watermelon_api/"',
// BASE_URL: '"http://localhost:8085"',
// BASE_API: '"http://localhost:8085/watermelon_api/"',
  PACK_NAME:'"/"',
}) 
