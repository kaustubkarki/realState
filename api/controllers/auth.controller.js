import bcrypt from "bcrypt";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Create a New User
  res.status(200).json({
    success: true,
    message: "register page",
  });
};

export const login = (req, res) => {
  res.status(200).json({
    success: true,
    message: "login page",
  });
};

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "logout page",
  });
};
