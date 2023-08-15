const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const connection = require('../db/connection');
const request = require('supertest');
const endpoints = require('../endpoints.json')

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
            expect(topics.length).toBe(topics.length)
            topics.forEach((topic) => {
                expect(topic).toHaveProperty('slug')
                expect(topic).toHaveProperty('description')
            })
        })
    });
    describe('api endpoints', () => {
        test('200: responds with an object describing all avaiable endpoints', () => {
            return request(app).get("/api").expect(200)
            .then(({ body }) => {
                expect(body).toEqual(endpoints)
            })
        });
    });
    describe('/api/articles/:article_id', () => {
        test('200: should return articles objects', () => {
            return request(app).get('/api/articles/1').expect(200)
            .then(() => {
                
            })
        });
    });
});