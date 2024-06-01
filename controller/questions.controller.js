const questionsModel = require("../models/questions.model")
const readQuestions = require("../helpers/reader")

var questions

const search = (question) => {

}

const addQuestion = () => {
    return async (req, res, next) => {

        // read questions form json to insert it into the database
        questions = await readQuestions()
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

module.exports = { search, addQuestion }