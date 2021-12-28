const my_express = require('express')
const my_path = require('path')
const api_router = require('./api/api_router')
const cors = require('cors')

const app = my_express()
app.use(cors())

app.use(my_express.json())

app.get('/',(req,res)=>{
    res.sendFile(my_path.join(__dirname,'./index.html'))
})
app.use('/api',api_router)
app.listen(5800,()=>console.log('http://localhost:5800'))