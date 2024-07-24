const mongoose = require('mongoose');
const mongoURI = process.env.DATABASE

mongoose.connect(mongoURI).then(()=>{console.log("Database Connected")}).catch((err)=>console.log(err.message))
