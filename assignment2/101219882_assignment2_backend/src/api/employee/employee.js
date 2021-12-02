const express = require('express');
const mongoose = require('mongoose');
const app = express();
const employeeModel = require('../../models/Employee');

// Employee Home
// // /api/v1/
app.get('/', (req, res) => {
    res.send('employees Page');
});


// List employees
/* 
    GET /api/v1/employee
*/
app.get('/employees', async(req, res) => {
    const employees = await employeeModel.find();   //return array

    if(employees.length == 0){
        res.status(404).send("Found Nothing, please create a employee info.");
        return;
    }

    try{
        res.send(employees);
    }catch(err){
        res.status(500).send(err);
    }

});



// Create New Record 
/*
    POST /api/v1/employee
    {
        "employee":{
            "firstname": 
            "lastname":
            "emailId":
        }
    }
*/
app.post('/employees', async (req, res) => {    
    // Validate
    if(!req.body.new_user){
        res.status(400).send("The Employee info you sent is EAMPTY");
        return;
    }

    // Create a Employee Record
    const employee = new employeeModel(req.body.new_user);

    try{
        await employee.save();        
        res.status(201).send("Successfully saved."); // 201 created
    } catch(err){
        res.status(500).send(err);
    }
});



// Find a Employee
/* 
    GET /api/v1/employee/:id
*/
app.get('/employees/:id', async(req, res) => {

    const id = req.params.id;

    //validate ID type (mongoose)
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(500).send("The ID type you requested is wrong.");
        return;
    }

    const employee = await employeeModel.findById(id);

    if(!employee){
        res.status(400).send("Not Found.");
        return;
    }

    // console.log(employee);
    res.status(200).json(employee); // res.json == res.send
});



// Update a Employee
/*     
    PUT /api/v1/employee/:id
    *** Put will remove other data if not defined, so PATCH is be better.
*/
app.put('/employees/:id', async (req, res) => {
    
    const id = req.params.id;    

    // Validates
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(500).send("The ID type you requested is wrong.");  
        return;      
    }

    if(!req.body.user){
        res.status(400).send("The Employee info you sent for update is EAMPTY");
        return;
    }

    try{
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, req.body.user);
        if(!updatedEmployee){
            res.status(404).send("No data found.");
            return;            
        }
        await updatedEmployee.save();     
        res.status(200).send("Successfully updated.");
    }catch(err){
        res.status(500).send(err);
    }

});


// Delete a Employee
/*     
    DELETE /api/v1/employees/:id    
*/
app.delete('/employees/:id', async (req, res) => {  
    
    const id = req.params.id;

    // Validates
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(500).send("The ID type you requested is wrong.");  
        return;      
    }


    try{
        const employee = await employeeModel.findByIdAndDelete(id);

        if(!employee){
            res.status(404).send("No data found.");
            return;
        }
        
        res.status(200).send("Susseccfully deleted."); // if status 204 => will not construct an unnecessary reponse body that won't be sent.
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = app;
