const {getAllCountries, getCountryById, getCountryByName} = require("../controllers/countryControler");
const Router = require("express")

const router = Router()

router
    .get("/", getAllCountries)
    .get("/id/:id", getCountryById )
    .get("/name", getCountryByName)


module.exports = router