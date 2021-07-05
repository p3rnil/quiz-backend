const { merge } = require('lodash')
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development' || 'dev',
  isProd: env === 'production' || 'prod',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '100d',
  },
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev')
    break
  case 'prod':
  case 'production':
    envConfig = require('./prod')
    break
  default:
    envConfig = require('./dev')
}

const config = merge(baseConfig, envConfig)

module.exports = config
