import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ message: "Token is required for authentication" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token is required for authentication" });
  }

  const isCustomAuth = token.length < 500;

  let decodedData;
  try {
    if (token && isCustomAuth) {
      decodedData = verifyToken(token);
      if (!decodedData || !decodedData?._id) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      if (!decodedData || !decodedData?.sub) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.userId = decodedData?.sub;
    }
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }

  next();
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "test");
    return decoded; // Returns decoded payload, which contains the user ID
  } catch (err) {
    console.error("Decoding Token failed:", err);
    return null;
  }
};

export { auth, verifyToken };
