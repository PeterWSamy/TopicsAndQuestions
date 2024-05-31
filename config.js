const mongoose = require('mongoose');

const initConnection = () => {
    return mongoose.connect(process.env.connectionUrl)
        .then(() => console.log('connected'))
        .catch(() => console.log('error'));
}

module.exports = initConnection;
