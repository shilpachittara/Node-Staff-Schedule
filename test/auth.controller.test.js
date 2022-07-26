const db = require("../src/models");
const sinon = require("sinon");
var chai = require('chai')
var expect = chai.expect

const controller = require("../src/controllers/auth.controller");
const User = db.user;
const { users, userSignup } = require("./seed");

describe("POST /api/auth/signup", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        email: "person1@gmail.com",
        password: "person1PASSWORD",
        fullname: "person1",
        role: "staff",
      },
    };
    var res = {
        sendCalledWith: '',
        send: function(arg) { 
                 this.sendCalledWith = arg;
               },
       json: function(err){
               console.log("\n : " + err);
               },
        status: function(s) {this.statusCode = s; return this;}
      };
    await controller.signup(req, res);
    console.log("res : ", res.status);
    expect(res.statusCode).to.equal(200)
  });

  it("should not create user with invaild body data", async() => {
    const req = {
        body: {
        },
      };
      const res = { status: 200 };
      await controller.signup(req, res);
      console.log("res : ", res.status);
      sinon.assert.calledWith(res.status, "");
    });
  });
