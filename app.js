const express = require('express')
const app = express()
const { handleCustomErrors, handlePSQLErrors, handlePatchErrors} = require('./controllers/error.controller')
const getTopics  = require('./controllers/topic.controller')
const { getArticles, getArticleByIdController, getCommentsArticlesController, updateArticleVotes} = require('./controllers/articles.controller')
const { getComments, postCommentToArticle} = require('./controllers/comments.controller')
const apiController = require('./api.controller')
const cors = require('cors')

app.use(cors());


app.use(express.json());

app.get("/api/topics", getTopics)
app.get("/api/articles", getArticles)
app.get("/api", apiController)
app.get("/api/articles/:article_id", getArticleByIdController)
app.get("/api/articles/:article_id/comments", getComments)
app.get("/api/comments", getCommentsArticlesController)

app.post("/api/articles/:article_id/comments", postCommentToArticle)

app.patch("/api/articles/:article_id", updateArticleVotes)


app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handlePatchErrors)

app.use((err, request, response, next) => {
    console.log(err);
    response.status(500).send({ msg: 'err'})
})
module.exports = app;