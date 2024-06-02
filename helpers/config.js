const mongoose = require('mongoose');

const initConnection = () => {
    return mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('connected'))
        .catch(() => console.log('error'));
}

module.exports = initConnection;
