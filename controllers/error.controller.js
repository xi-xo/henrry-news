const handlePSQLErrors = (err, request, response, next) => {
    if (err.code === '22P02') {
        return response.status(400).send({ msg: 'Bad request' });
    } else if (err.status === '22P02' && err.msg === 'Article not found') {
        return response.status(404).send({ msg: 'Article not found' });
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