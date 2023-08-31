const { readArticles, getArticleById, readComments,updateArticleVotesById }  = require('../models/articles.model');

const getArticles = (request, response) => {
    readArticles().then((articles) => {
        return response.status(200).send({ articles });
    });
}

const getCommentsArticlesController = (request, response) => {
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

const updateArticleVotes = (request, response, next) => {
    const { article_id} = request.params
    const { newVote} = request.body

    updateArticleVotesById(article_id, newVote)
    .then((updatedArticles) => {
        response.status(200).send({ article: updatedArticles })
    })
    .catch((err) => {
        next(err)
    })

}



module.exports = { getArticles, getArticleByIdController, getCommentsArticlesController, updateArticleVotes };