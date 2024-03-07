import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import { UserModel } from "../../models/user";

const changePassword: RequestHandler = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist" });
    }

    if (!req.params.userId) {
      return res.json({ message: "Unauthenticated" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatePassword = await UserModel.findByIdAndUpdate(
      existingUser._id,
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatePassword);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default changePassword;
