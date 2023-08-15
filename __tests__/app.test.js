const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const connection = require('../db/connection');
const request = require('supertest');
const endpoints = require('../endpoints.json');
const apiController = require('../api.controller')

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
        test('200: should return a specific article by ID', () => {
            return request(app).get('/api/articles/1')
            .then(({ body }) => {
                const article = body.article
                expect(article).toMatchObject({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: 1,
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    article_img_url: expect.any(String)
                })
            })
        });
        test('404: should return 404 when article does not exist', () => {
            return request(app).get('/api/articles/999').expect(404)
            .then(({ body }) => {
                const msg = body.msg
                expect(msg).toBe('Article not found')
            })
        });
        test('400: should return 400 when article ID is invalid', () => {
            return request(app).get('/api/articles/bananas').expect(400)
            .then(({ body }) => {
                const msg = body.msg;
                expect(msg).toBe('Bad request')
            })
        });
    });
});