const { query } = require('express')
const router = require('express-promise-router')
const api_users = new router()
const users = require('../conectDb/db')
const Donors = new users('Donors')

api_users.get('/getAllData', async (req, res) => {
    let donorss = await Donors.getAll()
    // console.log(donorss);
    res.json(donorss)
})

api_users.post('/getDonorsForSomeone', async (req, res) => {
    let my_aggragate = [
        {
            '$match': {
                'DonatKode': req.body.DonatKode
            }
        }, {
            '$project': {
                'DonatName': '$DonatName',
                'Donations': '$Donations',
                'Donatphone': '$Donatphone',
                'DonatKode': '$DonatKode'
            }
        }
    ]
    let theAns = await Donors.getAggregate(my_aggragate)
    res.json(theAns)

})

api_users.get('/getAllDonations', async (req, res) => {
    let my_aggragate = [
        {
            '$project': {
                'DonatKode':"$DonatKode",
                'DonatName':"$DonatName",
                'Donation':"$Donations",
            }
        }
    ]
    let theAns = await Donors.getAggregate(my_aggragate)
    res.json(theAns)

})





module.exports = api_users