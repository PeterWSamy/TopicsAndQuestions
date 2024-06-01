const router = require("express").Router()
const questionModel = require("../models/questions.model")

const {search,addQuestion, addTopics} = require("../controller/questionsTopics.controller")


router.get("/search",search)
router.post("/addQuestion",addQuestion())
router.post("/addTopics",addTopics())


module.exports = router