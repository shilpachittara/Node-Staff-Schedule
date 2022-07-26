const db = require("../models");
const User = db.user;
const logger = require("../logger");

checkDuplicateEmail = async (req, res, next) => {
  try {
    
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      logger.error(new Error("Email id already exists"));
      return res.status(400).send({
        message: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    logger.error(new Error("Email validation error occured"));
    return res.status(500).send({
      message: error.message
    });
  }
};


const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
