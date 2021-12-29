const { query } = require('express')
const router = require('express-promise-router')
const api_status = new router()
const users = require('../conectDb/db')
const status = new users('status')

api_status.get('/getAllDataStatus', async (req, res) => {
    let statuss = await status.getAll()

    res.json(statuss)
})

api_status.post('/addStatus', async (req, res) => {
    let new_user = await status.addUser(req.body)
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    console.log(new_user);
    res.json(new_user)
})


api_status.get('/dalateAllDataStatus', async (req, res) => {
    let statuss = await status.removeAllObect()
    res.json(statuss)
})

api_status.post('/updateStatus', async (req, res) => {

    var s = { name: req.body.name };

    if (req.body.status == "init") {  
       send = { $set: {init: req.body.bool } }
    }
    if(req.body.status == "orphan"){
        send = { $set: {orphan: req.body.bool } }
    }
    if(req.body.status == "final"){
         send = { $set: {final: req.body.bool } }
    }
    let a={s,send}
    console.log(a);
    let new_user = await status.updateObject(a)
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    res.json(new_user)
})

api_status.post('/deleteOneStatus', async (req, res) => {
    let my_user = await status.getQuery(req.body)
    await status.removeOneObect(my_user[0])
    res.json(my_user)
})




module.exports = api_status