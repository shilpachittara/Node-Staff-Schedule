const db = require("../src/models");

const User = db.user
const Schedule = db.schedule;
const {schedules, addscheduleItems, users,  addDummyUsers} = require('./seed')
var chai = require('chai')
var expect = chai.expect

const controller = require("../src/controllers/user.controller");