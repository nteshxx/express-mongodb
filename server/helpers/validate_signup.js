const Joi = require('Joi')

const authSchema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string()
        .email()
        .required(),
    password: Joi.string()
        .required()
        .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{10,15}$")),
    about: Joi.string()
        .required(),
    mobile: Joi.number()
        .min(1000000000)
        .max(9999999999)
        .required()
})

module.exports = {
    authSchema
}