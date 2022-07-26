const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Staff API 

  app.get(
    "/api/staff/schedule/:id",
    [authJwt.verifyToken, authJwt.isStaff],
    controller.getScheduleByUserId
  );

  app.get(
    "/api/staff/all/schedule/:id",
    [authJwt.verifyToken, authJwt.isStaff],
    controller.getScheduleAllStaff
  );

  // Admin API 

  app.get(
    "/api/admin/all/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllStaff
  );

  app.put(
    "/api/admin/user/:id/:user_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUser
  );

  app.delete(
    "/api/admin/user/:id/:user_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUser
  );

  app.get(
    "/api/admin/all/schedule/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getScheduleAllStaff
  );

  app.post(
    "/api/admin/schedule/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addSchedule
  );

  app.put(
    "/api/admin/schedule/:id/:schedule_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.updateUserSchedule
  );

  app.delete(
    "/api/admin/schedule/:id/:schedule_id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteUserSchedule
  );

  app.get(
    "/api/admin/all/user/schedule/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getScheduleAllStaffByTotalTime
  );
};
