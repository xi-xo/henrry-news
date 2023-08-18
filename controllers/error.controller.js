const handlePSQLErrors = (err, request, response, next) => {
    if (err.code === '22P02') {
        return response.status(400).send({ msg: 'Bad request' });
    } else if (err.code === '23502') {
        return response.status(400).send({ msg: 'Missing required field(s)' });
    } else if (err.code === '23503' || err.code === '22P02') {
        return response.status(404).send({ msg: 'Article not found' });
    } else if (err.code === '230503') {
        return response.status(400).send({ msg: 'Comment body cannot be empty'});
    } else {
        next(err);
    }
}
const handleCustomErrors = (err, request, response, next) => {
    if (err.status && err.msg){
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err)
    } 
}

module.exports = { handlePSQLErrors, handleCustomErrors}