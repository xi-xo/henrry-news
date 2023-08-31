const handlePSQLErrors = (err, request, response, next) => {
    if (err.code === '22P02') {
        return response.status(400).send({ msg: 'Invalid entry or Invalid artilce_id' });
    } else if (err.code === '23502') {
        return response.status(400).send({ msg: 'Missing required field(s)' });
    } else if (err.code === '23503') {
        if (err.constraint === 'comments_author_fkey'){
            return response.status(404).send({ msg: 'Username not found' });
        } else {
            return response.status(404).send({ msg: 'Article not found' });
        }
    } else {
        next(err);
    }
};
const handleCustomErrors = (err, request, response, next) => {
    if (err.status && err.msg){
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err)
    } 
};

const handlePatchErrors = (err, request, response, next) => {
    if (err.message === 'Article not found') {
        response.status(404).send({ msg: 'Article not found' });
    } else if (err.message === 'newVote must be a number') {
        response.status(400).send({ msg: 'newVote must be a number' });
    } else {
        next(err);
    }
};

module.exports = { handlePSQLErrors, handleCustomErrors, handlePatchErrors}