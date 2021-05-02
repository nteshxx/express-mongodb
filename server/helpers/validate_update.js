const Joi = require('Joi')

const authUpdate = Joi.object({
    name: Joi.string(),
    email: Joi.number(),
    password: Joi.string()
        .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{10,15}$")),
    about: Joi.string(),
    mobile: Joi.number()
        .min(1000000000)
        .max(9999999999),
})

module.exports = {
    authUpdate
}