import { prisma } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    // validate user
    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      req.user = user;
      next();
    }
  }
};

export const adminAuthMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    res
      .status(401)
      .json({
        errors: "Unauthorized",
      })
      .end();
  } else {
    // validate user
    const user = await prisma.user.findFirst({
      where: {
        token: token,
        role: "ADMIN",
      },
    });
    if (!user) {
      res
        .status(401)
        .json({
          errors: "Unauthorized",
        })
        .end();
    } else {
      if (user.role != "ADMIN") {
        res
          .status(401)
          .json({
            errors: "Unauthorized",
          })
          .end();
      }
      req.user = user;
      next();
    }
  }
};
