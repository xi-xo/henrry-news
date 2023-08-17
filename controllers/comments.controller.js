const getCommmentsByArticleId = require('../models/comments.model')

const getComments = (request, response, next) => {
    const { article_id } = request.params
    getCommmentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}

module.exports = getComments