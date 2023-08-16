const db = require('../db/connection');

const getCommmentsByArticleId = () => {
    
    return db.query(`SELECT * FROM comments WHERE article_id = 1`)
    .then(({ rows }) => {
        return rows
    })
}

module.exports = getCommmentsByArticleId