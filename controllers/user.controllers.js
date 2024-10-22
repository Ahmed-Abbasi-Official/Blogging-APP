import USER from "../models/user.model.js";

        // SIGNUP

export async function signUp(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const newUser = await USER.create({
      fullname,
      email,
      password,
    });
    console.log("FullNAME",newUser);
    
    return res.redirect("/");
  } catch (error) {
    console.log(`Error in SignUP ${error}`);
    res.redirect('/user/signup')
  }
}

        // SIGNIN

export async function signIn(req, res) {
  try {
    const {email,password}=req.body
    const user=await USER.matchPassword(email,password)
    console.log(user);
    res.redirect('/')
    
  } catch (error) {
    console.log(`Error in SignIn ::: ${error}`);
    res.redirect('/user/signin')
  }
}
