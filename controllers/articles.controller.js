const readArticles = require('../models/articles.model')

const getArticles = (request, response) => {
    readArticles().then((articles) => {
        response.status(200).send({articles})
    })
}

module.exports = getArticles;