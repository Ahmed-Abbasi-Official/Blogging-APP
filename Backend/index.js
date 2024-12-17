import express from "express";
import path from "path";
import CONNECT_DB from "./db/CONNECT_DB.js";
import userRouter from "./routes/user.router.js";
import postsRouter from "./routes/posts.router.js";
import commentsRouter from "./routes/comments.router.js";
import webhooksRouter from "./routes/webhook.router.js";
import 'dotenv/config'

const app = express();

//  PORT

const PORT =process.env.PORT || 3000;

//  DATABSE URL

const MONGO=process.env.MONGO || 'mongodb://localhost:27017/blogify' ;

// Middleware to parse form data (urlencoded) and JSON
app.use(express.urlencoded({ extended: false }));
app.use('/webhooks',webhooksRouter)
app.use(express.json());
app.use(express.static('public'));



//  EJS

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


// ROUTES

app.use('/user',userRouter)
app.use('/posts',postsRouter)
app.use('/comments',commentsRouter)

//  ERROR HANDLING

app.use((error,req,res,next)=>{
  res.status(error.status || 500);
  res.json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack:error.stack
  })
}),

// HOME ROUTE
app.get('/',(req,res)=>{res.render('home')})


// SERVER LISTENER

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  CONNECT_DB(MONGO)
});
