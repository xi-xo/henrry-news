const { readArticles, getArticleById }  = require('../models/articles.model');

const getArticles = (request, response) => {
    readArticles()
    .then((articles) => {
        response.status(200).send({articles})
    })
}

const getArticleByIdController = (request, response) => {
    const { article_id } = request.params;
    if (Number.isNaN(parseInt(article_id, 10))) {
        response.status(400).send({ msg: 'Bad request' });
        return;
    }
const articleId = parseInt(article_id, 10);

    getArticleById(articleId)
    .then(({ rows, rowCount }) => {
        if(rowCount === 0) {
            response.status(404).send({ msg: 'Article not found'})
        } else {
            response.status(200).send({ articles : rows[0] })
        }
    })
    
}

module.exports = { getArticles, getArticleByIdController };