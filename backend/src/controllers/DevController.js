
const Dev = require("../models/Dev");
const axios = require('axios');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');
module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({github_username});

        if(!dev){
            const responseGit = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = responseGit.data;
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
        
            dev = await Dev.create({
                name,
                avatar_url,
                bio,
                github_username,
                techs: techsArray,
                location
        
            });

            const sendSocketMessageTo = findConnections(
                {latitude, longitude},
                techsArray
                
                );
                sendMessage(sendSocketMessageTo,'new-dev', dev);
                
        }
        
        return response.json(dev);
    },
    async delete(request, response){
        const {github_username} = request.params;

        const dev = await Dev.deleteOne({
            github_username
        });
        return response.json(dev);
    },
    async update(request, response){
        const {techs, latitude, longitude} = request.body;
        const {github_username} = request.params;

        let dev = await Dev.findOne({github_username});

        if(dev){
            const responseGit = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = responseGit.data;
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            }
        
            dev = await Dev.updateOne({
                github_username
            },{
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
        
            });
        }
        
        return response.json(dev);
    }
    
};