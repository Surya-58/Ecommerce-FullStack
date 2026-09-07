import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Invalid Authorization Format",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "admin") {
      return res.json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;

    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default adminAuth;