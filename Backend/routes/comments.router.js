import express from "express";
import CommentController from "../controllers/comment.controller.js";
const commentsRouter = express.Router();

commentsRouter.get('/:postId',CommentController.getPostsComments)
commentsRouter.post('/:postId',CommentController.addComment)
commentsRouter.delete('/:id',CommentController.deleteComment)

export default commentsRouter;
