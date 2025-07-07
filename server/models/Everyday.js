import mongoose from "mongoose";
const mealSchema  = new mongoose.Schema({
    Quantity : {
        type : Number,
        required : true,
        min : 1,
        max : 10
    }  ,
    Dish : {
        type : String,
        required : true,
    },
    PlateType : {
        type : String,
        required : true,
    },
    calories : {
        type : Number,
        required : true,
    },
})
const caloriesDataSchema  =new mongoose.Schema({
    date : {
        type:String,
        required : [true , "Please insert Date"],
    },
    user :{
        type : String,
        required : [true,"User related error"],
    } ,
    breakfast : {
        type : [mealSchema],
        default : []
    },
    lunch : {
        type : [mealSchema],
        default : []
    },
    snacks : {
        type : [mealSchema],
        default : []
    },
    dinner : {
        type : [mealSchema],
        default : []
    }
})

caloriesDataSchema.index({ user: 1, date: 1 }, { unique: true });


export default mongoose.model("Calories", caloriesDataSchema);
