const getCommmentsByArticleId = require('../models/comments.model')

const getComments = (request, response, next) => {
    console.log('we are in the controller file');
    getCommmentsByArticleId(1).then((comments) => {
        response.status(200).send(comments)
    }).catch((err) => {
        next(err)
    })
}

module.exports = getComments