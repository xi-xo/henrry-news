const express = require('express')
const app = express()
const getTopics  = require('./controllers/topic.controller')
const getArticles = require('./controllers/articles.controllers')
const apiController = require('./api.controller')


app.get("/api/topics", getTopics)
app.get("/api", apiController)

app.get('/api/article', getArticles)


module.exports = app;