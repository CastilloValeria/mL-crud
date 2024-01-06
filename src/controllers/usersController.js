const { lectura, escritura } = require("../utility/moduloProp");
const fs = require('fs');
const {validationResult} = require("express-validator");

const userController={
    register:(req,res,)=>{
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            // No hay errores, seguimos adelante.
            } else {
                res.render('register', { errors: errors.mapped(), old: req.body });
            }
            },
            
    }





module.exports= userController