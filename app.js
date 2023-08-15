const express = require('express')
const app = express()
const getTopics  = require('./controllers/topic.controller')
const { getArticles, getArticleByIdController} = require('./controllers/articles.controller')
const apiController = require('./api.controller')


app.get("/api/topics", getTopics)
app.get("/api", apiController)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id', getArticleByIdController)


module.exports = app;