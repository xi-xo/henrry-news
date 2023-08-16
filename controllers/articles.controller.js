const { readArticles, getArticleById, readComments }  = require('../models/articles.model');

const getArticles = (request, response) => {
    readArticles().then((articles) => {
        const articlesWithoutBody = articles.map((article) => {
            const { body, ...articleWithoutBody } = article;
            return articleWithoutBody;
        });
        response.status(200).send({ articles: articlesWithoutBody });
    });
}

const getComments = (request, response) => {
    readComments().then((comments) => {
        response.status(200).send(comments)
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


module.exports = { getArticles, getArticleByIdController, getComments };