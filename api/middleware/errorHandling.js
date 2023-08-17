//error handling
function errorHandling(err,req,res,next){
    if (err){
        let status = err.stats || 500
        res.json({
            status,
            msg: "An error occurred; please try again later."
        })
    }
    next()
}
module.exports = errorHandling