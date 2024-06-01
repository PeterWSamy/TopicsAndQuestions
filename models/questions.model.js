const mongoose = require("mongoose")

const questionsSchema = new mongoose.Schema(
    {
        questionNumber : {
            type: Number,
            required: [true,"Number is required"]
        },
        Annotations : {
            type: [String],
            required: [true,"Annotaitions are required"],
        }
    }
)

const questionsModel = mongoose.model("questions",questionsSchema)

module.exports = questionsModel