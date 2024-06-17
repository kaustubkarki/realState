import jwt from "jsonwebtoken";

export const verify = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Not Authenticated!,Log in now" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    //payload is a varaiable
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    req.userId = payload.id;
    //incase aba paxi user verify garna id chainxa vanera set garirako value
  });
  next();
};
