const { query } = require('express')
const router = require('express-promise-router')
const api_users = new router()
const users = require('../conectDb/db')
const Donors = new users('Donors')


api_users.post('/addMonth', async (req, res) => {
    let my_user = await Donors.getQuery(req.body.quest)
    // console.log(my_user[0]);
    await Donors.removeOneObect(my_user[0])
    console.log(my_user[0].Donations[my_user[0].Donations.length - 1]);
    if ((my_user[0].Donations[my_user[0].Donations.length - 1].length) < 12) {
        my_user[0].Donations[my_user[0].Donations.length - 1] = [...my_user[0].Donations[my_user[0].Donations.length - 1], req.body.newMonth]
    }
    else {
        // console.log([...my_user[0].Donations,[req.body.newMonth] ]);
        my_user[0].Donations = [...my_user[0].Donations, [req.body.newMonth]]
    }
    // console.log(my_user[0]);
    let new_user = await Donors.addUser(my_user[0])
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    console.log(new_user);
    res.json(new_user)
})


api_users.post('/apdateMonth', async (req, res) => {
    let my_user = await Donors.getQuery(req.body.quest)
    // console.log(my_user[0]);
    await Donors.removeOneObect(my_user[0])
    console.log(my_user[0].Donations[my_user[0].Donations.length - 1]);
    my_user[0].Donations[req.body.year - 2020][req.body.month - 1] = req.body.sum

    // console.log(my_user[0]);
    let new_user = await Donors.addUser(my_user[0])
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    console.log(new_user);
    res.json(new_user)
})

api_users.post('/deleteUser', async (req, res) => {
    let my_user = await Donors.getQuery(req.body.quest)
    await Donors.removeOneObect(my_user[0])
    res.json(my_user)
})
api_users.post('/addUser', async (req, res) => {
    let new_user = await Donors.addUser(req.body.quest)
    if (new_user)
        console.log(new_user);
    else
        console.log('dont exits in the data');
    console.log(new_user);
    res.json(new_user)
})


module.exports = api_users