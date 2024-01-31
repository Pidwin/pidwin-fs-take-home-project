const logout = async (req, res) => {
  try {
    res.clearCookie('token');
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default logout;
