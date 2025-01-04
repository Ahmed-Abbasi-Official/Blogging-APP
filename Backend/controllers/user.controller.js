import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import { getUser } from "../service/auth.js";

class User {
  //  GET SAVED POTS
  async getUserSavedPosts(req, res) {
    try {
      const clerkUserId = req.headers?.authorization;
      if (!clerkUserId) {
        return res.status(401).json({ error: "Not authenticated!" });
      }
  
      const userID = getUser(clerkUserId);
      // console.log("UserID from getUser:", userID);
  
      if (!userID || !userID.userId) {
        return res.status(400).json({ error: "Invalid user ID!" });
      }
  
      const user = await userModel.findOne({ _id: userID.userId });
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }
  
      const savedPosts = user.savedPosts || [];
      console.log("Saved Posts:", savedPosts);
  
      return res.status(200).json({ savedPosts });
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  //  UPDATE USER
  async savePost(req, res) {
    const clerkUserId = req?.headers?.authorization;
    const postId = req.body.postId;
    // console.log(postId);
    

    if (!clerkUserId) {
      return res.status(401).json("Not authenticated!");
    }

    const userID=getUser(clerkUserId)
    // console.log(userID);
    const user = await userModel.findOne({ _id:userID.userId });
    // console.log(user);
    

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
    const updatedIsSaved = updatedUser.savedPosts.some((p) => p === postId);

    // console.log(updatedIsSaved ? "Post Saved" : "Post Unsaved");
  
    // Delay response
    setTimeout(() => {
      res.status(200).json(updatedIsSaved ? "Post Saved" : "Post Unsaved");
    }, 3000);
  }

  //  GET USER

  async getUser(req,res)  {
    
    const clerkUserId = req?.headers?.authorization;
    
    if(!clerkUserId) {
      return res.status(401).json("Not authenticated!")
    }
    const userID=getUser(clerkUserId)
    const user = await userModel.findOne({role:"admin"})
    const userData = await userModel.findOne({_id:userID.userId})
    res.status(200).json({user, userData})
  }

    //  SAVED POSTS
    async savedPosts(req, res) {
      try {
        const clerkUserId = req?.headers?.authorization;
    
        if (!clerkUserId) {
          return res.status(401).json({ message: "Authorization header is missing" });
        }
    
        const userID = getUser(clerkUserId); // Ensure this function works correctly
        if (!userID) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const posts = await userModel.findOne({ _id: userID.userId });
        if (!posts || !posts.savedPosts) {
          return res.status(404).json({ message: "Saved posts not found" });
        }
    
        const savedPosts = await postModel.find({
          _id: { $in: posts.savedPosts },
        });
    
        // console.log("Saved Posts:", savedPosts); // Debugging log
        return res.status(200).json(savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error); // Log full error
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
    

    async myBlog(req,res){
      try {
        const clerkUserId = req.headers.authorization;

        if (!clerkUserId) {
          return res.status(401).json({ message: "Authorization header is missing" });
        }
    
        const userID = getUser(clerkUserId); // Ensure this function works correctly
        if (!userID) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const user = await userModel.findOne({ _id: userID.userId });
        const myBlog = await postModel.find({user: user._id});

        if(!myBlog) return res.status(404).json({ message: "No blog found" });
        
        return res.status(200).json({ message:myBlog});

      } catch (error) {
        console.log("Error :: ",error.message); 
        return res.status(500).json({message: "Internal Server Error", error: error.message});
      }
            }

}

const UserController = new User();

export default UserController;
