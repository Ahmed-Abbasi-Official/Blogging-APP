import express from "express";
import path from "path";
import CONNECT_DB from "./db/CONNECT_DB.js";
import userRouter from "./routes/user.router.js";

const app = express();

const PORT = 8000;

// Middleware to parse form data (urlencoded) and JSON
app.use(express.urlencoded({ extended: false }));




app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

  // ROUTERS
  app.use('/user',userRouter)
app.get('/',(req,res)=>{res.render('home')})


  // SERVER LISTENER

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  CONNECT_DB('mongodb://localhost:27017/blogify')
});
