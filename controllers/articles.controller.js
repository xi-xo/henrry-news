const readArticles  = require('../models/topic.model');

const getArticles = (request, response) => {
    readArticles()
    .then((articles) => {
        response.status(200).send({articles})
    })
    
}

module.exports = getArticles;