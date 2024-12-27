import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {

   const { email, password } = req.body;
    const user = await User.findOne({ email });//1st comment in this page:find use by email and store him in var "user",no need to get password here as we can get it by user.password in future
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);//we use "bycryt.compare" to match the provided password with the hashed password stored in the database. afeter decryting the second one
                                                                  //outcome "bcrypt.compare" is boolean ,store it in isMatch var 
    if (!isMatch) {//if isMatch is false
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }
//after checking both email & pass create a token ,By signing the token with a secret key (process.env.JWT_KEY), the server ensures its integrity, Sending the token to the client allows the client to prove its identity on subsequent requests without requiring repeated logins. The frontside stores the token and includes it in headers for API requests  to authenticate
const token = jwt.sign(//the sequence of the following 3 is imp otherwise error will be dispalyed,first payload{ _id: user._id, role: user.role } then process.env.JWT_KEY, then  { expiresIn: "10d" }
                         { _id: user._id, role: user.role },// By embedding user data (e.g., _id, role) in the token, the server doesn’t need to repeatedly query the database for user information in subsequent requests,also to be verify on the server the identify the user making the request
                         process.env.JWT_KEY,
                         { expiresIn: "10d" }
);
    return res
      .status(200)
      .json({
        success: true, 
        token,
        user: { _id: user._id, name: user.name, role: user.role },
      });
  } catch (error) {
    res.status(500).json({success: false, error: error.message})
  }
};

const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}

export { login, verify };
