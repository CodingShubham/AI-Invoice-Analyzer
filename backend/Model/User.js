const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({

        emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },

    firstName:{
        type:String,
        required:true,
      

    },

    lastName:{
        type:String,
        required:true,
    },

    passWord:{
        type:String,
        required:true,
    },




  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

    gender:{
        type:String,
        enum:["Male","Female","Other"]
    }

}, {timestamps:true});


const User=mongoose.model("User",userSchema)


module.exports=User;