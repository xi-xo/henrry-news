const format = require('pg-format');
const db = require('../db/connection');

const getCommmentsByArticleId = (articleId) => {
    
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId])
    .then(({ rows }) => {
        return rows
    })
}

const addCommentToArticle = (newComment) => {
    if (!newComment || !newComment.body || !newComment.username) {
        return Promise.reject({ status: 400, msg: 'Comment body cannot be empty' });
    }
    const {article_id, username, body} = newComment
    const values = [[body, 0, username, article_id, new Date()]];
    const queryStr = format('INSERT INTO comments (body, votes, author, article_id, created_at) VALUES %L RETURNING comment_id, body, votes, author, article_id, created_at', values);
    return db.query(queryStr).then(({ rows}) => {
        return rows
        
    })
}

module.exports = { getCommmentsByArticleId, addCommentToArticle }