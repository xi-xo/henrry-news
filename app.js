const express = require('express')
const app = express()
const getTopics  = require('./controllers/topic.controller')
const { getArticles, getArticleByIdController} = require('./controllers/articles.controller')
const apiController = require('./api.controller')

app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api", apiController)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleByIdController)


app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'err app.js'})
})

module.exports = app;