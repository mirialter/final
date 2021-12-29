const router = require('express-promise-router')
const app_api = new router()


const status = require('./api_status')
const transition = require('./api_transition')

app_api.use('/status',status)
app_api.use('/transition',transition)


module.exports = app_api