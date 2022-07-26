const jwt = require("jsonwebtoken");
const db = require("../src/models");
const Schedule = db.schedule;
const User = db.user;

const user1 = {
  id: 1,
  email: "person1@gmail.com",
  password: "person1PASSWORD",
  fullname: "person1",
  role: "staff",
};

const user2 = {
  id: 2,
  email: "person2@gmail.com",
  password: "person2PASSWORD",
  fullname: "person2",
  role: "Admin",
};
const users = [
  user1,
  user2
];

const userSignup = {
  email: "person1@gmail.com",
  password: "person1PASSWORD",
  fullname: "person1",
  role: "staff",
};

const schedules = [
  {
    id: 1,
    date_start: "21-10-2022",
    date_end: "21-10-2022",
    shift_length: "8",
    shift_start: "10:00",
    shift_end: "6:00",
    user_id: user1,
  },
  {
    id: 2,
    date_start: "20-10-2022",
    date_end: "20-10-2022",
    shift_length: "4",
    shift_start: "10:00",
    shift_end: "2:00",
    user_id: user2,
  },
];

module.exports = {
  schedules,
  users,
  userSignup,
};
