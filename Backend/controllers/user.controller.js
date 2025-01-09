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
      // console.log(user);
      

      const savedPosts = user.savedPosts || [];
      // console.log("Saved Posts:", savedPosts);

      return res.status(200).json({ savedPosts });
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  //  UPDATE USER
  async savePost(req, res) {
    try {
      // Extract the Clerk user ID from the authorization header
      const clerkUserId = req?.headers?.authorization;
      if (!clerkUserId) {
        return res.status(401).json({ message: "Not authenticated!" });
      }
  
      // Extract the post ID from the request body
      const postId = req.body.postId;
      if (!postId) {
        return res.status(400).json({ message: "Post ID is required!" });
      }
  
      // Retrieve the user ID associated with the Clerk user ID
      const userID = getUser(clerkUserId); // Assuming this function retrieves user details
      if (!userID?.userId) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Fetch the user from the database
      const user = await userModel.findOne({ _id: userID.userId });
      if (!user) {
        return res.status(404).json({ message: "User not found in the database!" });
      }
  
      // Check if the post is already saved
      const isSaved = user.savedPosts.includes(postId);
      // console.log(isSaved);
      
  
      // Update the saved posts based on the current state
      const updateOperation = isSaved
        ? { $pull: { savedPosts: postId } } // Remove post from savedPosts
        : { $push: { savedPosts: postId } }; // Add post to savedPosts
  
      // Update the user document
      const updatedUser = await userModel.findByIdAndUpdate(
        user._id,
        updateOperation,
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(500).json({ message: "Failed to update user!" });
      }
  
      // Determine the updated state of the post
      const updatedIsSaved = updatedUser.savedPosts.includes(postId);
  
      // Delay response to simulate processing
      
        res.status(200).json({
          message: updatedIsSaved ? "Post Saved" : "Post Unsaved",
          savedPosts: updatedUser.savedPosts, // Optional: Return updated savedPosts
        });
      
    } catch (error) {
      console.error("Error in savePost:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  

  //  GET USER

  async getUser(req, res) {
    try {
      const clerkUserId = req?.headers?.authorization;

      if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
      }
      const userID = getUser(clerkUserId);
      const user = await userModel.findOne({ role: "admin" });
      const userData = await userModel.findOne({ _id: userID.userId });
      res.status(200).json({ user, userData });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }

  //  SAVED POSTS
  async savedPosts(req, res) {
    try {
      const clerkUserId = req?.headers?.authorization;

      if (!clerkUserId) {
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
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

  async myBlog(req, res) {
    try {
      const clerkUserId = req.headers.authorization;

      if (!clerkUserId) {
        return res
          .status(401)
          .json({ message: "Authorization header is missing" });
      }

      const userID = getUser(clerkUserId); // Ensure this function works correctly
      if (!userID) {
        return res.status(404).json({ message: "User not found" });
      }

      const user = await userModel.findOne({ _id: userID.userId });
      const myBlog = await postModel.find({ user: user._id });

      if (!myBlog) return res.status(404).json({ message: "No blog found" });

      return res.status(200).json({ message: myBlog });
    } catch (error) {
      console.log("Error :: ", error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

const UserController = new User();

export default UserController;
