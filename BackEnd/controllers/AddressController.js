const Address = require('../models/Address');
const City = require('../models/City');
const Community = require('../models/Community');

const createAddress = async(req, res) => {
    try {
        const { name, house, apartment, city_id } = req.body;

        const newAddress = new Address({name, house, apartment, city_id});

        await newAddress.save();

        res.status(201).json({message: "Address created successfully"});
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error created city'});
    }
}

const getAddress = async(req, res) => {
    try {
        const {city_id} = req.query;
        const addresses = await Address.find({city_id});
        res.status(200).json(addresses)
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get addresses'});
    }
}

const getCurrentAddress = async(req, res) => {
    try {
        const {addr_id} = req.query;
        const address = await Address.findById(addr_id);
        res.status(200).json(address)
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get addresses'});
    }
}


const updateAddress = async(req, res) => {
    try{
        const {consumption, addr_id, city_id, commun_id} = req.body;
        
        const address = await Address.findById(addr_id);
        const city = await City.findById(city_id);
        const community = await Community.findById(commun_id);

        console.log(address.name);
        console.log(city.name);
        console.log(community.name);

        address.consumption += Number(consumption);
        city.consumption += (consumption / 1000);
        community.consumption += (consumption / 1000);

        console.log(address.consumption);
        console.log(city.consumption);
        console.log(community.consumption);

        await address.save();
        await city.save();
        await community.save();

        res.status(200).json({message: 'Дані оновлено успішно'});
    }catch{
        res.status(500).json({message: 'Error update address'});
    }
}

module.exports = {createAddress, getAddress, updateAddress, getCurrentAddress};
