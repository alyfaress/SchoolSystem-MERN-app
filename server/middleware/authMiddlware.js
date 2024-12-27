import jwt from 'jsonwebtoken'
import User from '../models/User.js';
 
const verifyUser = async (req, res, next) => {//next (function to move to the next middleware or route handler).
    try {
        const token = req.headers.authorization.split(' ')[1];/*Accesses the authorization header from the incoming request. This header typically contains a token prefixed by "Bearer".
                                               ".split(' ')[1]" Splits the header value by a space and retrieves the second part, since infrontend (authContext.jsx) we sent the token to this route as `Bearer ${token}` we left space between both of them onpurpose in order to split them here and take the second element in the string[1],the first one  string[0]=Bearer.
 */
        if(!token) {
            return res.status(404).json({success: false, error: "Token Not Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)// the main purpose if this page is here ,to take token sent from front-side and compare it with JWT_KEY to :
        /*Authentication: Ensures that the user making the request is authenticated by verifying the JWT.
          Authorization: Validates that the token belongs to a legitimate user who exists in the system.
          Security: Protects sensitive routes by allowing only verified users to access them.*/
            //ver very imp:If the token is valid, decoded will contain the payload data embedded in the token (e.g., user ID).
        if(!decoded) {
            return res.status(404).json({success: false, error: "Token Not Valid"})
        }

        const user = await User.findById({_id: decoded._id}).select('-password') //Retrieves the user document from the database using the user ID (decoded._id) extracted from the JWT payload. The select('-password') part excludes the user's password field from the retrieved data for security reasons.

        if(!user) {
            return res.status(404).json({success: false, error: "User not found"})
        }

        req.user = user  //Attaches the retrieved user object to the req object, making it accessible in subsequent middleware or route handlers.
        next()   //Calls the next() function to pass control to the next middleware or route handler in the pipeline.
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "server error"+error})
    }
}

export default verifyUser