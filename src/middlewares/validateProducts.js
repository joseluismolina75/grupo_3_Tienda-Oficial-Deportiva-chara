const { body } = require('express-validator')

module.exports = [
    body('name')
    .notEmpty().withMessage('Debes ingresar un nombre').bail(),
    body('price')
    .notEmpty().withMessage('Ingresa un precio').bail()
    .isNumeric().withMessage('El precio debe ser un numero'),
    body('description')
    .notEmpty().withMessage('Ingresa una descripción')
    .isAlphanumeric().withMessage('Debe ser un texto'),
    body('password')
    .notEmpty().withMessage('Ingresa una contraseña').bail()
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
]