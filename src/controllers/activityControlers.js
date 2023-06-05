const { Activity, Country} = require('../db')
const { Op } = require('sequelize')

const getAllActivities = async(req, res) =>{
    try {
        let response = await Activity.findAll()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(401).json({message: error.message})
    }
}

const createActivity = async(req, res) =>{
    const {name, difficulty, duration, season, countries} = req.body
    
    try {
        
        let isActivity = await Activity.findOne({where: {
            name:{
                [Op.iLike]:"%"+name+"%"
            }
        }})

        // console.log(isActivity)

        if(isActivity){
            return res.status(500).json({message: "La actividad ya existe"})
        }

        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        })

        newActivity.addCountries(countries)
        return res.status(201).json({message: 'Activity created successfully'})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const addActivityToCountry = async(req, res) =>{
    try {

        let activity = await Activity.findAll()
        
        activity.forEach(act => {
            act.countries.forEach(country =>{
                act.addCountries(country)
            })
        });

        // if(!activity){
        //     return res.status(500).json({message: "La actividad seleccionada no existe"})
        // }

        // if(!country){
        //     return res.status(500).json({message: "El país seleccionado no existe"})
        // }

        // country.addActivities(activity)
        return res.status(201).json({message: "Actividad añadida correctamente"})
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllActivities,
    createActivity,
    addActivityToCountry
};