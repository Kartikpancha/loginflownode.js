const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    database: "logindb",
    user: "root",
    password: ""
})

connection.connect((error)=>{
    if(error){
        console.log("error")
    } else{
        console.log("success")
    }
})

module.exports = connection