const fs = require ('fs');
const path = require('path');
const { check } = require('express-validator');

const validateRegister=[ 
    check("name").notEmpty().withMessage("Complete este campo").bail()
    .isLength({min:3, max:12}),
    check("apellido").notEmpty().withMessage("Complete este campo").bail()
    .isLength({min:3, max:12}),
    check("email").notEmpty().withMessage("Complete este campo").bail()
    .isEmail().withMessage("Complete con un email valido"),
    check("pasword").notEmpty().withMessage("Complete este campo").bail()
    .isLength({min:6, max:12})
]
router.post('/registro', validateRegister,controller.registrar);

module.exports= router