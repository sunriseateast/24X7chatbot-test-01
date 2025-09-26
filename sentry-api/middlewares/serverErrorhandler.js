
export default function serverErrorhandler(err,req,res,next){
    const statusCode=err.statusCode ||  err.status || 500
    const message=err.message || 'Internal Server Error'

    return res.status(statusCode).json({success:false,message})
}