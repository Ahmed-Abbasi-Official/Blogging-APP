import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

class User {
  //  GET SAVED POTS
  async getUserSavedPosts(req, res) {
    const clerkUserId = req.auth.userId;
    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const user = await userModel.findOne({ clerkUserId });
    res.status(200).json(user.savedPosts);
  }

  //  UPDATE USER
  async savePost(req, res) {
    const clerkUserId = req.auth.userId;
    const postId = req.body.postId;

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const user = await userModel.findOne({ clerkUserId });

    const isSaved = user.savedPosts.some((p) => p === postId);
    if (!isSaved) {
      await userModel.findOneAndUpdate(user._id, {
        $push: { savedPosts: postId },
      });
    } else {
      await userModel.findOneAndUpdate(user._id, {
        $pull: { savedPosts: postId },
      });
    }
    setTimeout(() => {
      res.status(200).json(isSaved ? "Post Unsaved" : "Post Saved");
    }, 3000);
  }

  //  GET USER

  async getUser(req,res)  {
    const clerkUserId=req.auth.userId;
    
    if(!clerkUserId) {
      return res.status(401).json("Not authenticated!")
    }
    const user = await userModel.findOne({role:"admin"})
    res.status(200).json(user)
  }

    //  SAVED POSTS
    async savedPosts(req, res) {
      try {
        const clerkUserId = req.auth.userId;
        
        
       const posts=await userModel.findOne({clerkUserId})
       const savedPosts = await postModel.find({
        _id: { $in: posts.savedPosts },
      });

       
       
        res.status(200).json(savedPosts);
      } catch (error) {
        res.status(500).json({
          message: "Error uploading Auth",
          error: error.message,
        });
      }
    }
}

const UserController = new User();

export default UserController;
