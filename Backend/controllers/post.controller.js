import postModel from "../models/post.model.js";

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
      const newPost = new postModel(req.body);
      const post = await newPost.save();
      res.status(200).json(post);
  }

  //  DELETE POST
  async deletePost(req, res) {
      const deletePost = await postModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Post deleted");
  }
}

const postController = new Post();

export default postController;
