const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/MongoRegistration",{
      useNewUrlParser:true, // we write this because we dont get depricating warnings
      useUnifiedTopology:true,
      useCreateIndex: true
}).then(()=>{
    console.log(`connection sucessfull`);
}).catch((e)=>{
    console.log(`no connection`);
})