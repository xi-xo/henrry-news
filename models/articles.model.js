const db = require('../db/connection')

const readArticles = () => {
    return db.query(
        'SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC')
        .then(({ rows }) => {
            
        return rows
    })
};

const readComments = () => {
    return db.query('SELECT * FROM comments').then(({ rows }) => {
        return rows
    })
}

const getArticleById = (articleId) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows, rowCount }) => {
        if(rowCount === 0) {
            return Promise.reject({ status: 404, msg: 'Article not found'})
        } else {
            return rows[0]
        }
    })
}
module.exports = { readArticles, getArticleById, readComments };


