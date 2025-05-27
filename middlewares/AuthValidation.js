const joi = require("joi");

// Signup Validation Middleware
const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body); // Fixed typo (req.boby -> req.body)
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message, // Provide only the error message
        });
    }

    next();
};

// Login Validation Middleware
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required()
    });

    const { error } = schema.validate(req.body); // Fixed typo (req.boby -> req.body)
    if (error) {
        return res.status(400).json({
            message: "Bad Request",
            error: error.details[0].message, // Provide only the error message
        });
    }

    next();
};

module.exports = {
    signupValidation, // Fixed typo (sinupValidation -> signupValidation)
    loginValidation
};
