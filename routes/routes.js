const router = require("express").Router()
const questionModel = require("../models/questions.model")

const {search,addQuestion} = require("../controller/questions.controller")


router.get("/search",search)
router.post("/addQuestion",addQuestion())


module.exports = router