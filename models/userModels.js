const db = require('../config/db')

var user = () => {

}

user.login = async (body) => {
    return new Promise((resolve, reject) => {
        var queryString = "SELECT * FROM admin Where email = ? AND password = ?"
        var filter = [body.email, body.password]
        db.query(queryString, filter, function (err, res) {
            if (err) {
                console.log(err)
                return reject(err);
            } else {
                var data = {}
                if(res.length){
                    data = res[0]
                }
                // console.log(data,888);
                return resolve(data)
            }
        })
    })
}

module.exports = user