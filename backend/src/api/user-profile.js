import User from "../models/user.js";

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id);
    res.json({
      id: user._id,
      name: user.name,
      tokens: user.tokens,
    })
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong"});
  }
}

export default userProfile;
