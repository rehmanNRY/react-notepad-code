const mongoose = require('mongoose');
const mongoUri = "mongodb://127.0.0.1:27017/notepad?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1"

const connectToMongo = ()=>{
    try {
        mongoose.connect(mongoUri, ()=>{
            console.log("Connected to mongo successfully");
        });
    } catch (error) {
        console.log("Cannot connect to mongo");
    }
}

module.exports = connectToMongo;