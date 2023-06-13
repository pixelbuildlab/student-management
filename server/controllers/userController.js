import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("requested");
  const user = await User.findOne({ email });
  if (user === null) {
    res.status(401).json({ message: "User Does Not Exist" });
  } else {
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);

      res.status(200).json({
        userId: user.id,
        email: user.email,
        username: user.username,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  }
};
const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.clearCookie("sessionData");
    res.status(200).json({ message: "Success" });
  });
};
export { loginUser, logoutUser };
