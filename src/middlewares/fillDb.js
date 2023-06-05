const { Country, CountryActivity} = require('../db')
const axios = require('axios')


const fillDataBaseFromApi = async () =>{
    try {
        if(await Country.findOne()){
            return
        }
        const response = await axios.get('https://restcountries.com/v3/all')
        const countriesData = response.data

        const countryInstances = countriesData.map(country => ({
            id: country.cca3,
            name: country.name.common,
            flags: country.flags[0],
            continents:country.region,
            population: country.population,
            capital: country.capital
        }))

        await Country.bulkCreate(countryInstances)
        return 

    } catch (error) {
        return console.error('Error al guardar los datos en la base', error)
    }
}


module.exports = fillDataBaseFromApi;