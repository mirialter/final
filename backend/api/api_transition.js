const { query } = require('express')
const router = require('express-promise-router')
const api_transition = new router()
const users = require('../conectDb/db')
const transition = new users('transition')

api_transition.get('/getAllDatatransition', async (req, res) => {
    let trans = await transition.getAll()
    res.json(trans)
})

api_transition.post('/addtransition', async (req, res) => {
    let new_user = await transition.addUser(req.body)
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    console.log(new_user);
    res.json(new_user)
})

api_transition.get('/dalateAllDataStatus', async (req, res) => {
    let trans = await transition.removeAllObect()
    res.json(trans)
})

api_transition.post('/deleteOneStatus', async (req, res) => {
    let my_user = await transition.getQuery(req.body)
    await transition.removeOneObect(my_user[0])
    res.json(my_user)
})




module.exports = api_transition