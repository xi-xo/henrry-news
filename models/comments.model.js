const db = require('../db/connection');

const getCommmentsByArticleId = (articleId) => {
    
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId])
    .then(({ rows }) => {
        return rows
    })
}

module.exports = getCommmentsByArticleId