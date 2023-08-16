const express = require('express')
const app = express()
const handle400errors = require('./controllers/error.controller')
const getTopics  = require('./controllers/topic.controller')
const { getArticles, getArticleByIdController, getCommentsArticlesController} = require('./controllers/articles.controller')
const getComments = require('./controllers/comments.controller')
const apiController = require('./api.controller')


app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api", apiController)
app.get('/api/articles/:article_id', getArticleByIdController)
app.get("/api/articles/:articles/comments", getComments)
app.get("/api/comments", getCommentsArticlesController)


app.use(handle400errors)

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'err'})
})
module.exports = app;