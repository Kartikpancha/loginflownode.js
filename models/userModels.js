const db = require("../config/db");
const jwt = require("jsonwebtoken");

var user = () => {};

user.register = async (body) => {
  return new Promise((resolve, reject) => {
    var queryString = `INSERT INTO admin SET ?`;
    var values = {email:body?.email, password:body?.password};
    db.query(queryString, values,function (err, res) {
      if (err) {
        console.log("erty", err);
        return reject(err);
      } else {
        // console.log("res",res);
        return resolve(res);
      }
    });
  });
};

user.login = async (body) => {
  return new Promise((resolve, reject) => {
    var queryString = "SELECT * FROM admin Where email = ? AND password = ?";
    var filter = [body.email, body.password];
    db.query(queryString, filter, function (err, res) {
      if (err) {
        console.log("erty", err);
        return reject(err);
      } else {
        var data = {};
        if (res.length) {
          data = res[0];
        }
        return resolve(data);
      }
    });
  });
};

user.sessionToken = async (data) => {
  //    return console.log(data, 2345)
  return new Promise((resolve, reject) => {
    var tokenData = { id: data.id, email: data.email, password: data.password };
    var token = jwt.sign(
      { tokenData },
      "HELLOBHAIKYAHALCHALHAIORSABBADHIYAHAINABHEEDULOG",
      { algorithm: "HS256" }
    );
    // console.log(token, 34567)
    data.sessionToken = token;
    var queryString = `UPDATE admin SET token= ? WHERE id = '${data.id}' `;
    var filter = [data.sessionToken];
    console.log(filter, 234567);
    db.query(queryString, filter, function (err, res) {
      if (err) {
        console.log("erty", err);
        return reject(err);
      } else {
        // console.log(res, "2345678")
        return resolve(res);
      }
    });
  });
};

module.exports = user;
