var fs = require("fs");

async function readQuestions(fileName) {
    return await JSON.parse(fs.readFileSync(fileName, 'utf8'));   
}

module.exports = readQuestions