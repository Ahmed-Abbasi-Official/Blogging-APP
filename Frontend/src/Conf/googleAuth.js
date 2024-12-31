import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
const provider = new GoogleAuthProvider();

export const googleSignup=async ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);

   const data = {
        username: user.email.split(' ').slice(0,9) || "USername",
        fullname:user.displayName || "fullname",
        email: user.email || "eamil",
        img: user.photoURL || "img",
        isVerified: user.emailVerified || "fale",
      };
      console.log(data);
      
      
      return data
    
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}