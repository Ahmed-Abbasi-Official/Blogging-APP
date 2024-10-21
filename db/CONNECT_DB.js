import mongoose from "mongoose";

async function CONNECT_DB(url) {
    try {
       await mongoose.connect(url) 
       console.log(( "DATABASE is Connect"));
       
    } catch (error) {
        console.log(`Error in DATABASE CONNECTION ::: ${error}`);
        
    }
}

export default CONNECT_DB