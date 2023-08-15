const db = require('../db/connection')

const readArticles = () => {
    return db.query('SELECT * FROM articles').then(({ rows }) => {
        return rows
    })
};

const getArticleById = (articleId) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [articleId])
    .then(({ rows, rowCount }) => {
        if(rowCount === 0) {
            return null
        } else {
            return rows[0]
        }
    })
}
module.exports = { readArticles, getArticleById };