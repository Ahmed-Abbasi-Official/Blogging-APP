import postModel from '../models/post.model.js'

const increaseVisits=async(req,res,next)=>{
    const slug=req.params.slug;
    await postModel.findOneAndUpdate({slug},{$inc:{visit:1}})

    next();
}

export default increaseVisits;