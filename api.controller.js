const endpoints = require('./endpoints.json')

const apiControler = (request, response) => {
    response.status(200).send(endpoints)
}


module.exports= apiControler