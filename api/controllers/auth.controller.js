export const register = (req, res) => {
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
