import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { pick } from 'lodash-es';

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatePassword = await User.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(pick(updatePassword, ['__v']));
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export default changePassword;
