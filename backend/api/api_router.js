const router = require('express-promise-router')
const app_api = new router()

const getData = require('./api_getData')
const updateData = require('./api_updateData')
app_api.use('/getData',getData)
app_api.use('/updateData',updateData)



module.exports = app_api