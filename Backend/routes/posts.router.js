import express from   'express'
import postController from '../controllers/post.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const postsRouter = express.Router();

postsRouter.get('/upload-auth',postController.uploadAuth)
postsRouter.get('/',postController.getPosts);
postsRouter.get('/:slug',postController.getPost);
postsRouter.post('/',postController.createPost);
postsRouter.delete('/:id',postController.deletePost);

export default postsRouter