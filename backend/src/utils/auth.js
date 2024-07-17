import jwt from "jsonwebtoken";
import { get } from 'lodash-es';

const auth = async (req, scopes, schema) => {
  try {
    const token = req.headers.authorization.split(" ")[1] || '';
    const isCustomAuth = token.length < process.env.CUSTOM_AUTH_LENGTH;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decodedData?._id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = get(decodedData, 'sub');
    }

    return req.userId ? true : false;
  } catch (error) { }
};

export default auth;
