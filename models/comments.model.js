const db = require('../db/connection');

const getCommmentsByArticleId = (articleId) => {
    
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId])
    .then(({ rows }) => {
        return rows
    })
}

const addCommentToArticle = (article_id, username, body) => {
    return db.query(
        'INSERT INTO comments (body, votes, author, article_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING comment_id, body, votes, author, article_id, created_at', [body, 0, username, article_id]
    )
}

module.exports = { getCommmentsByArticleId, addCommentToArticle }