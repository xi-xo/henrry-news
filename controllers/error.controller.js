const handle400errors = (err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
    } else if (err.code === '22P02' || err.msg === 'Bad request') {
        return response.status(400).send({ msg: 'Bad request' });
    } else if (err.status === '22P02' && err.msg === 'Article not found') {
        return response.status(404).send({ msg: 'Article not found' });
    } else {
        next(err);
    }
};

module.exports = handle400errors