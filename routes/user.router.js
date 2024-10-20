import {Router} from 'express'
import { signIn, signUp } from '../controllers/user.controllers.js'

const router=Router()

router.get('/signin',(req,res)=>{res.render('signin')})
router.get('/signup',(req,res)=>{res.render('signup')})
router.post('/signup',signUp)
router.post('/signin',signIn)


export default router