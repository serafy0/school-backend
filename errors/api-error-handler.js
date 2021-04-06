const ApiError = require('./api-errors');

function apiErrorHandler(err,req,res,next){
    //in prod don't user console.log or console.error
    console.error(err)

    if(err instanceof ApiError){
        res.status(err.code).json(err.message);
        return
    }
    res.status(500).json('something went wrong')
}

module.exports = apiErrorHandler;