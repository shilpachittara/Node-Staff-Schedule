const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const logger = require("../logger");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: req.body.role,
    });

    if (user) {
      logger.debug("User registered successfully");
      res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    logger.error(new Error("user registration failed"));
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      logger.error(new Error("User not found"))
      return res.status(404).send({ message: "Email or password is incorrect!" });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      logger.error(new Error("password incorrect"));
      return res.status(404).send({
        message: "Email or password is incorrect!!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;
    logger.debug("Login Succesful");
    return res.status(200).send({
      id: user.id,
      token: token,
      email: user.email,
      roles: user.roles,
    });
  } catch (error) {
    logger.error("Login Failed");
    return res.status(500).send({ message: error.message });
  }
};

