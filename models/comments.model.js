const db = require('../db/connection');

const getCommmentsByArticleId = (articleId) => {
    
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC`, [articleId])
    .then(({ rows, rowCount }) => {
        if(rowCount === 0) {
            const errorMsg = `No comments found for article with ID ${articleId}`
            return Promise.reject({ status: 404, msg: errorMsg})
        } else {
            return rows
        }
        
    })
}

module.exports = getCommmentsByArticleId