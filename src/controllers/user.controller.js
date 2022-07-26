const { Console } = require("winston/lib/winston/transports");
const logger = require("../logger");
const db = require("../models");
const Schedule = db.schedule;
const User = db.user;
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;
const col = db.Sequelize.col;
// Staff detail api
exports.getScheduleByUserId = (req, res) => {
  try {
    return Schedule.findAll({
      where: {
        user_id: req.params.id,
        include:[{
          model: User, as: "user"
        }]
      },
    })
      .then((common) => {
        if (!common) {
          logger.info("No Schedule found for this user");
          return res.status(404).send({
            message: "No Schedule added for this user",
          });
        }
        return res.status(200).json({ data: common });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    logger.error(new Error("Get schedule for staff error occured"));
    return res.status(400).json({ message: error.message });
  }
};

exports.getScheduleAllStaff = (req, res) => {
  try {
    return Schedule.findAll({
      include:[{
        model: User, as: "user"
      }]
    })
      .then((common) => {
        if (!common) {
          logger.info("No Schedule ");
          return res.status(404).send({
            message: "No Schedule",
          });
        }
        return res.status(200).json({ data: common });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    logger.error(new Error("Get schedule for all staff error occured"));
    return res.status(400).json({ message: error.message });
  }
};

// Admin API

exports.getScheduleAllStaffByTotalTime = (req, res) => {
  try {
    return Schedule.findAll({
      attributes: [
        [fn('sum', col('shift_length')), 'total_shift_length'],
      ],
      group: ['user_id'],
      include:[{
        model: User, as: "user"
      }]
     })
      .then((common) => {
        if (!common) {
          logger.error("No User Found");
          return res.status(404).send({
            message: "No User Found",
          });
        }
        return res.status(200).json({ data: common });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    logger.error(new Error("Get all uset error occured"));
    return res.status(400).json({ message: error.message });
  }
};

exports.getAllStaff = (req, res) => {
  try {
    return User.findAll({ })
      .then((common) => {
        if (!common) {
          logger.error("No User Found");
          return res.status(404).send({
            message: "No User Found",
          });
        }
        return res.status(200).json({ data: common });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } catch (error) {
    logger.error(new Error("Get all uset error occured"));
    return res.status(400).json({ message: error.message });
  }
};

exports.updateUser = (req, res) => {
  try {
    return User.findByPk(req.params.user_id)
      .then((common) => {
        if (!common) {
          logger.error(new Error("No User Found"));
          return res.status(404).send({
            message: "No User Found",
          });
        }

        const data = {};
        if (req.body.role) {
          data.role = req.body.role;
        }
        if (req.body.fullname) {
          data.fullname = req.body.fullname;
        }

        logger.info("User updated Succesfully");
        return common
          .update(data)
          .then(() => res.status(200).json({ data: common }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    logger.error(new Error("User Updation fails"));
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = (req, res) => {
  try {
    return User.findByPk(req.params.user_id)
      .then((common) => {
        if (!common) {
          logger.error(new Error("No User Found"));
          return res.status(400).send({
            message: "User Not Found",
          });
        }
        logger.info("User deleted Successfully");
        return common
          .destroy()
          .then(() => res.status(204).json({ message: "Success" }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    logger.error(new Error("User deletion fails"));
    return res.status(400).json({ message: error.message });
  }
};

exports.addSchedule = (req, res) => {

    const require_fields = [
      "date_start",
      "date_end",
      "shift_length",
      "shift_start",
      "shift_end",
      "user_id",
    ];
    try {
      if (require_fields.some((key) => !req.body[key])) {
        return res
          .status(404)
          .json({ message: "Require parameters not found." });
      }
    let data = {};
    require_fields.forEach((key) => {
      if (typeof req.body[key] !== "undefined") {
        data = { ...data, [key]: req.body[key] };
      }
    });
    logger.info("Schedule add Succesfully");
    return Schedule.create(data)
        .then((common) =>
          res.status(201).json({ data: common, message: "Add Schedule success." })
        )
        .catch((error) => res.status(400).send(error));
  } catch (error) {
    logger.error(new Error("Schedule add fails"));
    return res.status(400).json({ message: error.message });
  }
};

exports.updateUserSchedule = (req, res) => {
  try {
    return Schedule.findByPk(req.params.schedule_id)
      .then((common) => {
        if (!common) {
          logger.error(new Error("No Schedule Found"));
          return res.status(404).send({
            message: "No Schedule Found",
          });
        }

        let data = {};
        if (req.body.date_start) {
          data.role = req.body.date_start;
        }
        if (req.body.date_end) {
          data.role = req.body.date_end;
        }
        if (req.body.shift_length) {
          data.role = req.body.shift_length;
        }
        if (req.body.shift_start) {
          data.role = req.body.shift_start;
        }
        if (req.body.shift_end) {
          data.role = req.body.shift_end;
        }
        if (req.body.user_id) {
          data.role = req.body.user_id;
        }

        logger.info("Schedule updated Succesfully");
        return common
          .update(data)
          .then(() => res.status(200).json({ data: common }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    logger.error(new Error("Schedule Updation fails"));
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteUserSchedule = (req, res) => {
  try {
    return Schedule.findByPk(req.params.schedule_id)
      .then((common) => {
        if (!common) {
          logger.error(new Error("No Schedule Found"));
          return res.status(400).send({
            message: "Schedule Not Found",
          });
        }
        logger.info("Schedule deleted Successfully");
        return common
          .destroy()
          .then(() => res.status(204).json({ message: "Success" }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  } catch (error) {
    logger.error(new Error("Schedule deletion fails"));
    return res.status(400).json({ message: error.message });
  }
};
