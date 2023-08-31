const app = require('../app');
const seed = require('../db/seeds/seed');
const data = require('../db/data/test-data/index');
const connection = require('../db/connection');
const request = require('supertest');
const endpoints = require('../endpoints.json');
const toBeSortedBy = require('jest-sorted');


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
                        author: 'butter_bridge',
                        title: 'Living in the shadow of a great man',
                        article_id: 1,
                        body: 'I find this existence challenging',
                        topic: 'mitch',
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        article_img_url: expect.any(String)
                    })
                })
        });
        test('articles should be sorted by date in descending order', async () => {
            const response = await request(app).get('/api/articles');
            const articles = response.body.articles;
            expect(articles).toBeSortedBy('created_at', { descending: true });
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
                    expect(msg).toBe('Invalid entry or Invalid artilce_id')
                })
        });

    });
    describe('/api/articles ticket 5', () => {
        test('200: response with status 200', () => {
            return request(app).get('/api/comments').expect(200)
        });
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
                        expect(article).toHaveProperty('comment_count')
                    })
                })
        });
        test('returns articles with no body property', () => {
            return request(app).get('/api/articles')
                .then(({ body }) => {
                    const articles = body.articles
                    articles.forEach((article) => {
                        expect(article).not.toHaveProperty('body')
                    })
                })
        });
    });
    describe('/api/articles/:article_id/comments ticket 6', () => {
        test('200: responds with an array of comments for a given article_id', () => {
            return request(app).get('/api/articles/1/comments').expect(200)
                .then(({ body }) => {
                    const comments = body
                    expect(Array.isArray(comments)).toBe(true)
                    comments.forEach((comment) => {
                        expect(comment).toHaveProperty('comment_id')
                        expect(comment).toHaveProperty('votes')
                        expect(comment).toHaveProperty('created_at')
                        expect(comment).toHaveProperty('author')
                        expect(comment).toHaveProperty('body')
                        expect(comment).toHaveProperty('article_id')
                    })
                })
        });
        test('200: should return an empty array when article has no comments', () => {
            return request(app).get('/api/articles/2/comments').expect(200)
                .then(({ body }) => {
                    expect(Array.isArray(body)).toBe(true)
                    expect(body.length).toBe(0);
                })
        });
        test('400: should return 400 when article ID is invalid', () => {
            return request(app).get('/api/articles/banana/comments').expect(400)
                .then(({ body }) => {
                    const msg = body.msg
                    expect(msg).toBe('Invalid entry or Invalid artilce_id')
                })
        });
        test('Comments should be served with the most recent comments first', () => {
            return request(app).get('/api/articles/2/comments').expect(200)
                .then(({ body }) => {
                    const comments = body
                    expect(comments).toBeSortedBy('created_at', { descending: true })
                })
        });
    });
});

describe('POST /api/articles/:article_id/comments ticket 7', () => {
    test('201: responds with the posted comment', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'This is a test comment.',
        };
        return request(app).post('/api/articles/1/comments').send(newComment)
            .expect(201)
            .then(({ body }) => {
                const postedComment = body.comment
                expect(postedComment).toHaveProperty('comment_id')
                expect(postedComment.author).toBe('butter_bridge');
                expect(postedComment.body).toBe('This is a test comment.');
                expect(postedComment.article_id).toBe(1);
                expect(postedComment.created_at).toBeTruthy();
            })
    });
    test('400: responds with an error for invalid article_id', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a test comment.',
        };
        return request(app).post('/api/articles/apples/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Invalid entry or Invalid artilce_id');
            });
    });
    test('404: responds with an error when adding a comment to a non-existent article', () => {
        const newComment = {
            username: 'icellusedkars',
            body: 'This is a test comment.',
        };
        return request(app).post('/api/articles/999/comments').send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Article not found');
            });
    });
    test('400: responds with an error for empty body', () => {
        const newComment = {
            username: 'icellusedkars',
            body: '',
        };
        return request(app).post('/api/articles/1/comments').send(newComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Missing required field(s)');
            });
    });
    test('201: ignores extra properties and responds with the posted comment', () => {
        const newComment = {
            username: 'butter_bridge',
            body: 'This is a test comment.',
            extraProperty: 'someValue'
        };
        return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(201)
            .then(({ body }) => {
                const postedComment = body.comment;
                expect(postedComment).toHaveProperty('comment_id');
                expect(postedComment.author).toBe('butter_bridge');
                expect(postedComment.body).toBe('This is a test comment.');
                expect(postedComment.article_id).toBe(1);
                expect(postedComment.created_at).toBeTruthy();
            });
    });
    test('400: responds with an error for missing required fields', () => {
        const invalidComment = {}; // Missing 'username' and 'body'
        return request(app)
            .post('/api/articles/1/comments')
            .send(invalidComment)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Missing required field(s)');
            });
    });
    test('404: responds with an error for non-existent username', () => {
        const newComment = {
            username: 'non_existent_user',
            body: 'This is a test comment.'
        };
        return request(app)
            .post('/api/articles/1/comments')
            .send(newComment)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Username not found');
            });
    });
});

describe('PATCH /api/articles/:article_id ticket 8', () => {
    test('updates article votes', () => {
        const newVote = { newVote: 20 }
        return request(app).patch('/api/articles/1').send(newVote)
            .expect(200)
            .then(({ body }) => {
                expect(body).toEqual({
                    article: {
                        author: "butter_bridge",
                        title: "Living in the shadow of a great man",
                        article_id: 1,
                        body: "I find this existence challenging",
                        topic: "mitch",
                        created_at: expect.any(String),
                        votes: 120,
                        article_img_url: expect.any(String)
                    }
                })
            })
    });
    test('responds with 404 when article does not exist', () => {
        const newVote = { newVote: 20 }
        return request(app)
            .patch('/api/articles/999')
            .send(newVote)
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toBe('Article not found');
            });
    });
    test('responds with 400 when newVote is not a number', () => {
        const newVote = { newVote: 'invalid' }
        return request(app)
            .patch('/api/articles/1')
            .send(newVote)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).toBe('Invalid entry or Invalid artilce_id');
            });
    });
    test('responds with 400 when article_id is invalid', () => {
        const newVote = {newVote: 20}
        return request(app)
        .patch('/api/articles/invalid_id')
        .send(newVote)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Invalid entry or Invalid artilce_id')
        })
    });
});