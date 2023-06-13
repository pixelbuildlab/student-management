import jwt from "jsonwebtoken";
// // import asyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  token = req.get("token");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      // console.error(error);
      res.status(401).json({ error: "Invalid User Token" });
    }
  } else {
    res.status(401).json({ error: "Failed to get Token" });
  }
};

export { protect };
