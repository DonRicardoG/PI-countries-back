const { Country } = require('../db')
const { Op } = require('sequelize')
const {Activity} = require('../db')

const getAllCountries = async(req, res) =>{
    console.log(Country)
    try {
        let response = await Country.findAll({include: Activity})

        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const getCountryById = async(req, res) =>{
    try {
        const { id } = req.params
        let response = await Country.findByPk(id, {include: Activity})

        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

const getCountryByName = async(req, res) =>{
    try {
        const { name } = req.query
        let response = await Country.findOne({where: {
            name:{
                [Op.iLike]:"%"+name+"%"
            }
        }})
        return res.status(200).json(response) 
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByName
};