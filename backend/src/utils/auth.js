import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    
    console.log(`isCustomAuth: ${isCustomAuth}`)

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      console.log(`decodedData: ${decodedData}`)
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) { 
    res.status(500).json({ message: `Something went wrong. Error: ${error.message}` });
  }
};

export default auth;
