const express = require('express')
const app = express()
const getTopics  = require('./controllers.topic/topic.controller')
const apiController = require('./api.controller')

app.use(express.json())


app.get("/api/topics", getTopics)
app.get("/api", apiController)


module.exports = app;