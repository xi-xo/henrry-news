const fs = require('fs/promises');
const db = require('../db/connection');

const readTopics = ()=> {
    return db.query('SELECT * FROM topics').then((rows) => {
        return rows
    })
};

module.exports = readTopics;