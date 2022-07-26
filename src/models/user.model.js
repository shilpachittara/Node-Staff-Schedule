module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    fullname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    roles: {
      type: Sequelize.ENUM("admin", "staff"),
      defaultValue: "staff"
    }
  });

  return User;
};
