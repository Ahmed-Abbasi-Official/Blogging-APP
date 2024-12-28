import commentModel from "../models/comment.model.js";
import userModel from "../models/user.model.js";

class Comment {
  //  GET COMMENTS
  async getPostsComments(req, res) {
    try {
      const comments = await commentModel.find({post:req.params.postId}).populate("user","username userImg").sort({createdAt:-1}).populate("post",'slug')
      // console.log(comments);
      
      res.status(200).json(comments)
    } catch (error) {
        res.status(500).json("error in Get Comments :", error)
    }
  }

  //  ADD COMMENTS

  async addComment(req, res) {
    const clerkUserId=req.auth.userId;
    const postId = req.params.postId;

    if(!clerkUserId) {
      return res.status(401).json("Not authenticated!")
    }

    const user = await userModel.findOne({clerkUserId})

    const newComment= new commentModel({
      user:user._id,post:postId,...req.body
    })

   const savedComment= await newComment.save();
   setTimeout(() => {
    
     res.status(201).json(savedComment)
   }, 3000);

  }

  //  DELETE COMMENTS

  async deleteComment(req, res) { 
    // const clerkUserId=req.auth.userId;
    const id = req.params.id;
    

    // if(!clerkUserId) {
    //   return res.status(401).json("Not authenticated!")
    // }
    const role = await userModel.findOne({role:"admin"}) || "user";
    if (role) {
      await commentModel.findByIdAndDelete(id);
     return res.status(200).json({
        message: "Comment deleted",
      });
    }

    const user = await userModel.findOne  ({clerkUserId})

    const deleteComment= new commentModel.findOneAndDelete({
      _id:id,user:user._id
    })

    if (!deleteComment) {
      return res.status(403).json("You can delete only your Comment!")
    }

    res.status(201).json("Comment deleted!")
  }
}

const CommentController = new Comment();

export default CommentController;
