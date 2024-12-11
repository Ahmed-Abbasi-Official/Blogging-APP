import {Router} from 'express'
import { signIn, signUp } from '../controllers/user.controllers.js'

const userRouter=Router()

userRouter.get('/signin',(req,res)=>{res.render('signin')})
userRouter.get('/signup',(req,res)=>{res.render('signup')})
userRouter.post('/signup',signUp)
userRouter.post('/signin',signIn)


export default userRouter