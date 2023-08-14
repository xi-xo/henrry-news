const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const connection = require('../db/connection');
const request = require('supertest');
const { forEach } = require('../db/data/test-data/articles');

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
        return request(app).get("/api/topics").expect(200)
        .then(({ body }) => {
            const topics = body.rows
            expect(Array.isArray(topics)).toBe(true)

            topics.forEach((topic) => {
                expect(topic).toHaveProperty('slug')
                expect(topic).toHaveProperty('description')
            })
            
            
        })
    });
});