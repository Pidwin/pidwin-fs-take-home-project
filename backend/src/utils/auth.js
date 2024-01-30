import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    // Remove Bearer from string
    token = token.split("Bearer ")[1];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, "test");
    req.id = decoded._id;
    return next();
  } catch (err) {
    return res.status(401).json("Invalid Token");
  }
};

export default auth;
