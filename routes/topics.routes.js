const router = require("express").Router()
const searchController = require("../controller/questions.controller")


router.get("/search",searchController)


module.exports = router