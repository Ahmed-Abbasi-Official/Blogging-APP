import ImageKit from "imagekit";
import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";

class Post {
  //  ALL POSTS
  async getPosts(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const allPosts = await postModel
            .find()
            .populate("user", "fullName")
            .limit(limit)
            .skip((page - 1) * limit);
        const totalPosts = await postModel.countDocuments();
        const hasMore = page * limit < totalPosts;
        res.status(200).json({ allPosts, hasMore });
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error });
    }
}


  //  SINGLE POST
  async getPost(req, res) {
    const singlePost = await postModel.findOne({ slug: req.params.slug }).populate("user","username fullName");
    res.status(200).json(singlePost);
  }

  //  CREATE POST
  async createPost(req, res) {
    try {
      const clerkUserId = req?.auth?.userId;
      // console.log("ReqAuth=============>>>",req.auth);

      // console.log("ClerkID",clerkUserId);

      // console.log(req.headers);

      if (!clerkUserId) {
        return res.status(401).json("Not authenticated!");
      }

      const user = await userModel.findOne({ clerkUserId });

      if (!user) {
        return res.status(404).json("User not found!");
      }

      //  SLUG LOGIC

      let slug = req.body.title.replace(/ /g, "-").toLowerCase();
      let existSlug = await postModel.findOne({ slug });
      let counter = 2;

      while (existSlug) {
        slug = `${slug}-${counter}`;
        existSlug = await postModel.findOne({ slug });
        counter++;
      }

      const newPost = new postModel({
        ...req.body,
        user: user._id,
        slug,
      });

      const post = await newPost.save();
      res.status(200).json({
        message: "Post created",
        post: post,
      });
    } catch (error) {
      console.log(error);
    }
  }

  //  DELETE POST
  async deletePost(req, res) {
    const clerkUserId=req.auth.userId;
    const postId=req.params.id;
    if(!clerkUserId){
      return res.status(401).json("Not authenticated!")
    }

    const user = await userModel.findOne({ clerkUserId });
    const deletePost = await postModel.findByIdAndDelete({
      _id: postId,
      user: user._id,
    });
    if (!deletePost) {
      return res.status(403).json("You can delete only your Post");
    }
    res.status(200).json({
      message: "Post deleted",
      post: deletePost,
    });
  }

  //  UPLOAD AUTH

  async uploadAuth(req, res) {
    try {
      const imagekit = new ImageKit({
        urlEndpoint: process.env.IK_URL_ENDPOINT,
        publicKey: process.env.IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,
      });
      const result = imagekit.getAuthenticationParameters();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).json({
        message: "Error uploading Auth",
        error: error.message,
      });
    }
  }
}

const postController = new Post();

export default postController;
