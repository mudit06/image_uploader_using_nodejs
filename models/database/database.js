const mongoose= require('mongoose')
require('dotenv').config()

const connect = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)

        console.log('MONGODB CONNECTED SUCESSFULLY')
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports= connect