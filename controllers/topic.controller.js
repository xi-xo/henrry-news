const readTopics  = require('../models/topic.model');

const getTopics = (request, response) => {
    readTopics()
    .then((topics) => {
        response.status(200).send({topics})
    })
    
}

module.exports = getTopics;