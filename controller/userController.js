var db = require('../config/db');
var user = require('../models/userModels')

exports.login = async (req, res) =>{
    try {
        db.beginTransaction()
        var loginData = await user.login(req.body)
        // console.log(loginData, 9999)

        if(loginData.id!=undefined){
            var generateToken = user.sessionToken(loginData)
            console.log(generateToken, "dfghjkl");
            db.commit();
            res.json({message: "User Successfull", UserData : loginData})

        }else{
            db.rollback();
            res.status(401).json({error : "Datas Error"})
        }

    } catch (error) {
        db.rollback();
        res.status(401).json({error : "Data Error"})
    }
}

exports.register = async (req, res) =>{
    try {
        db.beginTransaction()
        var registerData = await user.register(req.body)        
        if(registerData.insertId){
            db.query(`SELECT * FROM admin Where id = ${registerData.insertId}`, function (eror, rese){
                if (eror) throw eror;
                console.log(res, "sdcfvgbhjnkm")
                res.json({message: "User Registerd Successfull", UserData : rese})
            })
            db.commit();
            // res.json({message: "User Registerd Successfull", UserData : res})
            
        }else{
            db.rollback();
            res.status(401).json({error : "Datas Error"})
        }

    } catch (error) {
        db.rollback();
        res.status(401).json({error : "Data Error"})
    }
}

