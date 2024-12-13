import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

class Post {
  //  ALL POSTS
  async getPosts(req, res) {
    const allPosts = await postModel.find();
    res.status(200).json(allPosts);
  }

  //  SINGLE POST
  async getPost(req, res) {
      const singlePost = await postModel.findOne({ slug: req.params.slug });
      res.status(200).json(singlePost);
  }

  //  CREATE POST
  async createPost(req, res) {
    const clerkUserId=req.auth.userId;
    const user = await userModel.findOne({clerkUserId})
    console.log(req.body);
    
      const newPost = new postModel(user,...req.body);
      const post = await newPost.save();
      res.status(200).json({
        message: "Post created",
        post: post,
      });
  }

  //  DELETE POST
  async deletePost(req, res) {
    const user= await userModel.findOne({clerkId:req.auth.userId})
      const deletePost = await postModel.findByIdAndDelete({_id:req.params.id,user:user._id})
      if(!deletePost){
        return res.status(403).json("You can delete only your Post");
      }
      res.status(200).json({
        message: "Post deleted",
        post: deletePost,
      });
  }
}

const postController = new Post();

export default postController;
