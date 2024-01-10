const fs = require("fs")

const usersController = {
    registro: (req, res) => {
        res.render('register', { title: "Registro" })
    },
    register: (req, res) => {
        let errors= validatonResult(req);

        if (!error.isEmpty()) {
                res.render('register', { errors: errors.mapped(), old: req.body, title: "Error" });
            } else {
                res.send("No tenés errores, eaeaeaaaaaa")
                }
        }
    }
module.exports = usersController;











module.exports = usersController;