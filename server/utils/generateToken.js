import jwt from "jsonwebtoken";
// import nookies from "nookies";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3m",
  });

  return token;
};

export default generateToken;
