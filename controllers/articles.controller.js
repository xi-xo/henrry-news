const { readArticles, getArticleById }  = require('../models/articles.model');

const getArticles = (request, response) => {
    readArticles().then((articles) => {
        response.status(200).send({articles})
    })
}

const getArticleByIdController = (request, response, next) => {
    const { article_id } = request.params;
    getArticleById(article_id)
    .then((article) => {
        response.status(200).send({ article });
    }).catch((err) => {
        next(err)
    })
    
}


module.exports = { getArticles, getArticleByIdController };