module.exports = (req,res,next) => {
    if(req.loggedInUser.role === 1){
        next();
    }
    else{
        next({message:'permission denied'})
    }
}