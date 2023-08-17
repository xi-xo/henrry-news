const { getCommmentsByArticleId, addCommentToArticle } = require('../models/comments.model')

const getComments = (request, response, next) => {
    const { article_id } = request.params
    getCommmentsByArticleId(article_id)
    .then((comments) => {
        response.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}

const postCommentToArticle = (request, response, next) => {
    const { article_id } = request.params
    const { username, body } = request.body

    addCommentToArticle(article_id, username, body)
    .then((newComment) => {
        response.status(201).send({ comment: newComment})
    }).catch((err) => {
        next(err)
    })


}

module.exports =  { getComments, postCommentToArticle }