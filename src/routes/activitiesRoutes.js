const Router = require("express");
const { getAllActivities, createActivity, addActivityToCountry } = require("../controllers/activityControlers");


const router = Router()

router.get('/', getAllActivities).post('/', createActivity).put('/', addActivityToCountry)

module.exports = router
