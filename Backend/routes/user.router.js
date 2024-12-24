import {Router} from 'express'
import UserController from '../controllers/user.controller.js'

const userRouter=Router()


userRouter.get('/saved',UserController.getUserSavedPosts)
userRouter.patch('/save',UserController.savePost)
userRouter.get('/',UserController.getUser)
userRouter.get('/saved-posts',UserController.savedPosts);


export default userRouter