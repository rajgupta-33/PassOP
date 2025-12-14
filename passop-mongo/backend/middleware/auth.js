import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });

  const decoded = jwt.verify(token, "SECRET_KEY");
  req.user = decoded;
  next();
};

export default auth;
