const express = require('express')
const app = express()
const { handleCustomErrors, handlePSQLErrors} = require('./controllers/error.controller')
const getTopics  = require('./controllers/topic.controller')
const { getArticles, getArticleByIdController, getComments} = require('./controllers/articles.controller')
const apiController = require('./api.controller')


app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api", apiController)
app.get('/api/articles/:article_id', getArticleByIdController)
app.get("/api/comments", getComments)

app.use(handleCustomErrors)
app.use(handlePSQLErrors)

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'err'})
})
module.exports = app;