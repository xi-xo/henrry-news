const express = require('express')
const app = express()
const getTopics  = require('./controllers/topic.controller')
const apiController = require('./api.controller')
const getArticles = require('./controllers/articles.controller')


app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api", apiController)


module.exports = app;