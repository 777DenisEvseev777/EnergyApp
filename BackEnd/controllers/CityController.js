const City = require('../models/City')

const createCity = async(req, res) => {
    try {
        const { name, type, commun_id } = req.body;

        const city = await City.findOne({name});
        
        if (city){
            return res.status(400).json({message: 'City already exists'});
        }

        const newCity = new City({name, type, commun_id});

        await newCity.save();

        res.status(201).json({message: "City created successfully"});
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error created city'});
    }
}

const getCity = async(req, res) => {
    try {
        const {commun_id} = req.query;
        const cities = await City.find({commun_id});
        res.status(200).json(cities)
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get cities'});
    }
}

module.exports = {createCity, getCity};