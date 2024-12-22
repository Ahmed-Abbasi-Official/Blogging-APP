import {Router} from 'express'
import UserController from '../controllers/user.controller.js'

const userRouter=Router()


userRouter.get('/saved',UserController.getUserSavedPosts)
userRouter.patch('/save',UserController.savePost)


export default userRouter