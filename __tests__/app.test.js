const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const connection = require('../db/connection');
const request = require('supertest');
const endpoints = require('../endpoints.json');

afterAll(() => {
    return connection.end();
})

beforeEach(() => {
    return seed(data);
})
describe("/api/topics", () => {
    test("200: response with a status of 200", () => {
        return request(app).get("/api/topics").expect(200)
    });
    test('"200: responds with an array of topic objects"', () => {
        return request(app).get("/api/topics")
        .then(({ body }) => {
            const topics = body.topics
            expect(Array.isArray(topics)).toBe(true)
            expect(topics.length).toBe(3)
            topics.forEach((topic) => {
                expect(topic).toHaveProperty('slug')
                expect(topic).toHaveProperty('description')
            });
        });
    });
    describe('api endpoints', () => {
        test('200: responds with an object describing all avaiable endpoints', () => {
            return request(app).get("/api").expect(200)
            .then(({ body }) => {
                expect(body).toEqual(endpoints)
            });
        });
    });
    describe('/api/articles/:article_id', () => {
        test("200: response with a status of 200", () => {
            return request(app).get("/api/articles").expect(200)
        });
        test('200: should return articles objects', () => {
            return request(app).get('/api/articles/1').expect(200)
            .then(({ body }) => {
                const articles = body.articles
                expect(Array.isArray(articles)).toBe(true)
                expect(articles.length).toBe(1)
                articles.forEach(article => {
                    expect(article).toHaveProperty('author')
                    expect(article).toHaveProperty('title')
                    expect(article).toHaveProperty('article_id')
                    expect(article).toHaveProperty('body')
                    expect(article).toHaveProperty('topic')
                    expect(article).toHaveProperty('created_at')
                    expect(article).toHaveProperty('votes')
                    expect(article).toHaveProperty('article_img_url')
                });
            })
        });
        test('404: should return 404 when article does not exist', () => {
            return request(app).get('/api/articles/999').expect(404)
            .then(({ body }) => {
                const msg = body.msg
                expect(msg).toBe('Article not found')
            })
        });
    });
    describe('/api/articles ticket 5', () => {
        test('200: responds with an array of articles with enhanced properties', () => {
            return request(app).get('/api/articles').expect(200)
            .then(({ body }) => {
                const articles = body.articles
                expect(Array.isArray(articles)).toBe(true)
                expect(articles.length).toBe(13)
                articles.forEach(article => {
                    expect(article).toHaveProperty('author')
                    expect(article).toHaveProperty('title')
                    expect(article).toHaveProperty('article_id')
                    expect(article).toHaveProperty('topic')
                    expect(article).toHaveProperty('created_at')
                    expect(article).toHaveProperty('votes')
                    expect(article).toHaveProperty('article_img_url')
                })
            })
        });
    });
});