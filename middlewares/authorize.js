module.exports = (req,res,next) => {
    console.log(req.loggedInUser);
    if(req.loggedInUser.role === 1){
        next();
    }
    else{
        next({message:'permission denied'})
    }
}