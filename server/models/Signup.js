import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true ,
    },
    age:{
        type: Number,
        required:true
    },
    weight:{
        type:Number,
        required : true,
    },
    email:{
        type:String,
        required:true , 
        unique : [true , "This email Address is Already Exists in DataBase"]
    },
    password:{
        type:String,
        required:true
    },
    countryCode:{
        type:Number,
        required : true,
    },
    phoneNo:{
        type:Number,
        required:true , 
    }
},{timestamps:true})

export default mongoose.model("User", signupSchema);

