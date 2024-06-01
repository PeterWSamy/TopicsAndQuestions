const questionsModel = require("../models/questions.model")
const topicsModel = require("../models/topics.model")
const readJson = require("../helpers/reader")

var questions

const search = (question) => {

}

const addTopics = () => {
    return async (req, res, next) => {
        topics = await readJson("topics.json")
        try {
            // add leaf nodes
            let lastLevel = 3
            for (let levelIndex = lastLevel; levelIndex >= 1; levelIndex--) {
                // Find all unique topics at the current level
                const levelTopics = [...new Set(topics.map(topic => topic[`level${levelIndex}`]).filter(Boolean))];

                for (let topic of topics) {
                    let shouldAddTopic = true;
                    let children = [];

                    const existingTopics = await topicsModel.find({ topicName: { $in: levelTopics } });

                    const existingTopicNames = new Set(existingTopics.map(doc => doc.topicName));

                    if (topic[`level${levelIndex}`] === "") {
                        continue;
                    }

                    if (existingTopicNames.has(topic[`level${levelIndex}`])) {
                        shouldAddTopic = false;
                    }

                    if (levelIndex < lastLevel) {
                        const childPromises = topics
                            .filter(child => child[`level${levelIndex + 1}`] && child[`level${levelIndex}`] === topic[`level${levelIndex}`])
                            .map(child => topicsModel.findOne({ topicName: child[`level${levelIndex + 1}`] }));

                        const childDocs = await Promise.all(childPromises);
                        children = childDocs.map(childDoc => childDoc._id);
                    }

                    if (shouldAddTopic) {
                        const newTopic = new topicsModel({
                            topicName: topic[`level${levelIndex}`],
                            children: children
                        });
                        await newTopic.save();
                    }
                }
            }

            res.status(200).json({
                status: "success",
                message: "added topic successfully"
            });
        } catch (err) {
            res.status(500).json({
                status: "failed",
                message: err
            })
        }
    }
}

const addQuestion = () => {
    return async (req, res, next) => {

        // read questions form json to insert it into the database
        questions = await readJson("questions.json")
        console.log(questions[0])
        try {
            questions.forEach(async question => {

                console.log(question)

                let annotations = []

                for (let i = 1; i <= 5; i++) {
                    if (question[`Annotation ${i}`] != "") {
                        annotations.push(question[`Annotation ${i}`])
                    }
                }

                const newQuestion = new questionsModel({
                    questionNumber: question["questionNumber"],
                    Annotations: annotations
                })

                await newQuestion.save()
            });

            res.status(200).json({
                status: "success",
                message: "added question successfully"
            });
        } catch (err) {
            res.status(500).json({
                error: 'An error occurred while adding the question'
            });
        }
    }
}

module.exports = { search, addQuestion, addTopics }