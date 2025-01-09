import express from "express";
import path from "path";
import CONNECT_DB from "./db/CONNECT_DB.js";
import userRouter from "./routes/user.router.js";
import postsRouter from "./routes/posts.router.js";
import commentsRouter from "./routes/comments.router.js";
import webhooksRouter from "./routes/webhook.router.js";
// import { clerkMiddleware } from '@clerk/express'
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser";


const app = express();

const allowedOrigins = [process.env.AllowedOrigin1, process.env.AllowedOrigin2];

// CORS configuration

const corsOptions = {
    origin: (origin, callback) => {
      console.log("origin ==>", origin);
      
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            console.error(`Blocked by CORS: ${origin}`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET, POST, PUT,'PATCH', DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

//  PORT

const PORT =process.env.PORT || 3000;

//  DATABSE URL

const MONGO=process.env.MONGO;
console.log(MONGO);


// Middleware to parse form data (urlencoded) and JSON

app.use(express.urlencoded({ extended: true }));
// app.use(clerkMiddleware())
app.use(cookieParser())
app.use(express.json());  
app.use(express.static('public'));



// ALLOW CROSS-ORIGIN REQUEST

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



//  EJS

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))


// ROUTES

app.use('/user',userRouter)
app.use('/posts',postsRouter)
app.use('/comments',commentsRouter)
app.use('/webhooks',webhooksRouter)

//  ERROR HANDLING

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error); // Delegate to Express default error handler
  }
  res.status(error.status || 500).json({
    message: error.message || "Something went wrong!",
    status: error.status,
    stack: process.env.NODE_ENV === 'development' ? error.stack : null, // Hide stack trace in production
  });
});

// HOME ROUTE
app.get('/',(req,res)=>{res.render('home')})


// SERVER LISTENER

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  CONNECT_DB(MONGO)
});
