# Questions and topics

This project demonstrates the structure and usage of a MongoDB schema for managing topics and questions. It includes endpoints for querying questions based on topic names.

You can try it live using this URL : `https://peterwsamy.github.io/TopicsAndQuestionsFront.github.io/`

## Schema Explanation

### Topic Schema

The `topics` collection stores hierarchical topic information. Each topic can have multiple children and a unique topic name. Children is an array that contains the ID of documents of topic's children in the topics tree

#### Example Document

```json
{
    "_id":{"$oid":"665b999b5e4dd16c26eee965"},
    "topicName":"Cell Structure and Organisation",
    "children":[
        {"$oid":"665b994f5e4dd16c26eee732"},
        {"$oid":"665b99535e4dd16c26eee75c"},
        {"$oid":"665b99555e4dd16c26eee76e"},
        {"$oid":"665b99555e4dd16c26eee771"},
        {"$oid":"665b99565e4dd16c26eee777"},
        {"$oid":"665b99575e4dd16c26eee782"}],
        "__v":{"$numberInt":"0"}
}
```
### Questions Schema

The `questions` collection stores questions with their annotations. Each question contains the question number along with an array of annotations in it

#### Example Document

```json
{
    "_id":{"$oid":"665af652fd36e5bce40e66c5"},
    "questionNumber":{"$numberInt":"1"},
    "Annotations":[
        "Define diffusion and describe its role in nutrient uptake and gaseous exchange in plants and humans",
        "Define active transport and discuss its importance as an energy-consuming process by which substances are transported against a concentration gradient, as in ion uptake by root hairs and uptake of glucose by cells in the villi",
        "Define homeostasis as the maintenance of a constant internal environment"],
        "__v":{"$numberInt":"0"}
}
```

## Sample search request

endpoint for the deployed version : `https://topics-and-questions.vercel.app`

SAMPLE endpoint for testing : `https://topics-and-questions.vercel.app/search?q=Cell Structure and Organisation`
#### Response
```json
{
    "status": "success",
    "questionNumbers": [
        94,
        176,
        3,
        82,
        156,
        15,
        48,
        87,
        190,
        7,
        66,
        164,
        21,
        8,
        76,
        83,
        142,
        188,
        118,
        184,
        19,
        23,
        50,
        115,
        64,
        163,
        41,
        45,
        100,
        11,
        59,
        2,
        123,
        189,
        96,
        121,
        105,
        132,
        139,
        117,
        171,
        196,
        56,
        147
    ]
}
```

## Optimizations

After firstly running the query it took more than 10 seconds to return a response which is unefficient ofcourse. After carefull considerations I saw that the bottleneck was getting all questions and search in annotations array which has large latencies and bulky IO requests in the database.

### SOLUTION

I added a search index in my database on questions collection which basically helps in searching text rather than brute force solution to query all the questions.
This change managed to make the query execute in a total of 5 secs for the root nodes while milli seconds for children.
