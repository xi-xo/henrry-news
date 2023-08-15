const db = require('../db/connection')

const readArticles = () => {
    return db.query("SELECT * FROM articles").then(({ rows }) => {
        console.log(rows);
        return rows
    })
};

module.exports = readArticles;