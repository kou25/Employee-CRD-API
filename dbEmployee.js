import mongoose from 'mongoose'
import Joi from 'joi'

const employeeSchema=mongoose.Schema({
    name: String,
    email: String,
    phone:  String,
    company: String,
    current_employee: Boolean
});


export function validateEmployee(employee){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required(),
        company: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(50).required(),
        current_employee: Joi.boolean()
        };

        return Joi.validate(employee, schema);
}

export default mongoose.model('employeecontents', employeeSchema)
