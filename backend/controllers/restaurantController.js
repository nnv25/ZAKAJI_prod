import restaurantModel from "../models/restaurantModel.js"
import fs from 'fs'

//add restaurant
const addRestaurant = async(req,res) => {
    let image_filename = `${req.file.filename}`
    const restaurant = new restaurantModel({
        name: req.body.name,
        worktime:req.body.worktime,
        adress:req.body.adress,
        image:image_filename,
    })
    try {
        await restaurant.save();
        res.json({success:true,message:"Ресторан добавлен"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Ошибка"})
    }
}

export {addRestaurant}