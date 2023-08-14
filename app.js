const express = require('express')
const app = express()
const getTopics  = require('./controllers.topic/topic.controller')
app.use(express.json())

app.get("/api/topics", getTopics)


module.exports = app;