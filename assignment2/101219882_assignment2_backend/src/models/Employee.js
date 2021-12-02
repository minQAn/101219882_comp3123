const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('mongoose-validator');

const EmployeeSchema = new Schema({
    firstName: {
        type: String,     
        trim: true,   
        required: [true, "First Name Required"]
    },
    lastName: {
        type: String,   
        trim: true,     
        required: [true, "Last Name Required"]
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate:[
            validator({
                validator: 'isEmail',
                message: 'Please Enter valid email form with @ and . '
            })
        ]
    }
})

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;