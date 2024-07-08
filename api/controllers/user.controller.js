export const getUsers = async (req, res) => {
  try {
    res.status(200).json({
      message: "getUsers passed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const getUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "getUser passed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const updateUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "updateUser passed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    res.status(200).json({
      message: "deleteUser passed",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get users" });
  }
};
