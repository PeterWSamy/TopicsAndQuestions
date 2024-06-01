var fs = require("fs");

async function readQuestions() {
    return await JSON.parse(fs.readFileSync('questions.json', 'utf8'));   
}

module.exports = readQuestions