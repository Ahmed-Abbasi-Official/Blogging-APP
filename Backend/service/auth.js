import jwt from 'jsonwebtoken';
import 'dotenv/config'

const secretKey=process.env.JWT_SECRET_KEY;

export function setUser(user, res) {
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return token;
  }
  

  export function getUser(authHeader) {
   
    const token = authHeader; // Extract the token
    return jwt.verify(token, secretKey);
  }
  