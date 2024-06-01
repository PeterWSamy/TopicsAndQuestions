const mongoose = require("mongoose")

const topicsSchema = new mongoose.Schema(
    {
        topicName : {
            type: String,
            required: [true,"topic name is required"]
        },
        children : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "topic"
        }]
    }
)

const topicsModel = mongoose.model("topic",topicsSchema)

module.exports = topicsModel