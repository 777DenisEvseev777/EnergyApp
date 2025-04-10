const Community = require('../models/Community')

const createCommunity = async(req, res) => {
    try {
        const { name } = req.body;

        const community = await Community.findOne({name});
        
        if (community){
            return res.status(400).json({message: 'Community already exists'});
        }

        const newCommunity = new Community({name});

        await newCommunity.save();

        res.status(201).json({message: "Community created successfully"});
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error created community'});
    }
}

const getCommunity = async(req, res) => {
    try {
        const communities = await Community.find()
        res.status(200).json(communities)
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error get communities'});
    }
}

module.exports = {createCommunity, getCommunity};