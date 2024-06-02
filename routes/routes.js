const router = require("express").Router()

const {search,addQuestion, addTopics, getFirst10Questions} = require("../controller/questionsTopics.controller")


router.get("/search",search())
router.get("/first10Quests",getFirst10Questions())
router.post("/addQuestion",addQuestion())
router.post("/addTopics",addTopics())


module.exports = router