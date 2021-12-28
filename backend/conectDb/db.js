const my_mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const url2='mongodb+srv:// miria :miria36340@cluster0.bi9qe.mongodb.net/test'
module.exports = function MyOject(col){
    this.collection = col
    this.messagee = "hello from Credits"

    
    this.getAll = async()=>{
        let connection = await my_mongo.connect(url,{useUnifiedTopology:true}).catch(err=>console.log(err))
        if(connection ==undefined){
            console.log('failed to conect');
            return
        }
        try{
            let my_db = connection.db('magenAvotDontions')
            let ans = await my_db.collection(this.collection).find({}).toArray()
            return ans
        }
        catch(err){
            console.log(err);
        }
        finally{
            connection.close()
        }
    }
    this.getAggregate = async(query) =>{
        let connection = await my_mongo.connect(url,{useUnifiedTopology:true}).catch(err=>console.log(err))
        if(connection == undefined){
            console.log('failed no connect');return
        }
        try{
            let my_db = connection.db('magenAvotDontions')
            let ans = await my_db.collection(this.collection).aggregate(query).toArray()
            return ans
        }
        catch(err){
            console.log(err);
        }
        finally{
            connection.close()
        }
    }
    this.removeOneObect = async(query) =>{
        let connection = await my_mongo.connect(url,{useUnifiedTopology:true}).catch(err=>console.log(err))
        if(connection ==undefined){
            console.log('failed to conect');
            return
        }
        try{
            let my_db = connection.db('magenAvotDontions')
            let ans = await my_db.collection(this.collection).deleteOne(query)
            return ans
        }
        catch(err){
            console.log(err);
        }
        finally{
            connection.close()
        }
    }
    this.addUser = async(query)=>{
        let connection = await my_mongo.connect(url,{useUnifiedTopology:true}).catch(err=>console.log(err))
        if(connection ==undefined){
            console.log('failed to conect');
            return
        }
        try{
            let my_db = connection.db('magenAvotDontions')
            let ans = await my_db.collection(this.collection).insertOne(query)
            return ans
        }
        catch(err){
            console.log(err);
        }
        finally{
            connection.close()
        }
    }
    this.getQuery = async(query)=>{
        let connection = await my_mongo.connect(url,{useUnifiedTopology:true}).catch(err=>console.log(err))
        if(connection ==undefined){
            console.log('failed to conect');
            return
        }
        try{
            let my_db = connection.db('magenAvotDontions')
            let ans = await my_db.collection(this.collection).find(query).toArray()
            return ans
        }
        catch(err){
            console.log(err);
        }
        finally{
            connection.close()
        }
    }
}