const mongoose = require("mongoose");
// creating schema
const employeeSchema = new mongoose.Schema({
    firstname : {
        type:String, // type:Number if its a number
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email:  {
        type:String,
        required:true,
        unique:true,
    },
   
    password:  {
        type:String,
        required:true,
    },
    
    confirmpassword:  {
        type:String,
        required:true,
    },
})


// we need to create a collections

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;