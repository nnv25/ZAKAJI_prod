import mongoose from "mongoose"

const restaurantSchema = new mongoose.Schema({
    name: {type:String,required:true},
    worktime:{type:String,required:true},
    adress:{type:String,required:true},
    image:{type:String, required:true},
})

const restaurantModel = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);


export default restaurantModel;