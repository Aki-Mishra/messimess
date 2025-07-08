import Joi from "joi";
const schema = //Insert your joi schema here 
    Joi.object({
        name: Joi.string()
            .min(4)
            .required()
            .messages({
                'string.base': 'Time should be a type of text',
                'string.empty': 'meal Name cannot be empty',
                'string.min': 'name must be {#limit} charecters long',
                'any.required': 'Username is a required field'
              }),

        password: Joi.string()
            .min(7)
            .required()
            .messages({
                'string.empty': "password cannot be empty",
                'string.min': 'passoward must be 7 charecters long'
            })


    })

export default schema;