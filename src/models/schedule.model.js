module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    date_start: {
      type: Sequelize.STRING,
    },
    date_end: {
      type: Sequelize.STRING,
    },
    shift_length: {
      type: Sequelize.STRING,
    },
    shift_start: {
      type: Sequelize.STRING,
    },
    shift_end: {
      type: Sequelize.STRING,
    },
  });

  return Schedule;
};
