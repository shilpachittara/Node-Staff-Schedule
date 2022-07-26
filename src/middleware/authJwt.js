const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const logger = require("../logger");

verifyToken = (req, res, next) => {
  let token = req.session.token;

  if (!token) {
    logger.error(new Error("No Token"));
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      logger.error(new Error("Incorrect Token"));
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user.roles === "admin") {
      logger.info("User is admin");
      return next();
    }
    logger.error("User role not admin");
    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    logger.error("Unable to validate User role!");
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isStaff = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user.roles === "staff") {
      logger.info("User is staff");
      return next();
    }

    logger.error("User role not admin");
    return res.status(403).send({
      message: "Require Staff Role!",
    });
  } catch (error) {
    logger.error("Unable to validate User role!");
    return res.status(500).send({
      message: "Unable to validate Moderator role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isStaff
};
module.exports = authJwt;
