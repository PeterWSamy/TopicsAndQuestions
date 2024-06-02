const router = require("express").Router()

const {search,addQuestion, addTopics, first10Quests} = require("../controller/questionsTopics.controller")


router.get("/search",search())
router.get("/first10Quests",first10Quests())
router.post("/addQuestion",addQuestion())
router.post("/addTopics",addTopics())


module.exports = router