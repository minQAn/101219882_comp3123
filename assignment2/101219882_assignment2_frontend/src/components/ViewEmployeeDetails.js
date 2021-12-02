import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {ListGroup} from 'react-bootstrap';

function ViewEmployeeDetails() {

    const {id} = useParams();   // to get id
    // console.log(id);

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        emailId: ''
    });    
    
    const getEmployee = async() => {
        await axios.get(`/api/v1/employees/${id}`)
            .then(response => {                
                setEmployee(response.data);
            }).catch(err => {
                alert(err.response.data.message);
            })
    }

    useEffect(() => {
        getEmployee();
    }, []); // [] is to prevent infinite loop...

    return (
        <div className="employee_details_box" style={{padding:20}}>
            <h3 style={{textAlign:'center', marginBottom:30}}>View Employee Details</h3>
            <ListGroup style={{width:500, margin:'0 auto'}}>
                <ListGroup.Item><span style={{display:'inline-block', minWidth:160}}>Employee First Name:</span> <b>{employee.firstName}</b></ListGroup.Item>
                <ListGroup.Item><span style={{display:'inline-block', minWidth:160}}>Employee Last Name:</span> <b>{employee.lastName}</b></ListGroup.Item>
                <ListGroup.Item><span style={{display:'inline-block', minWidth:160}}>Employee Email ID:</span> <b>{employee.emailId}</b></ListGroup.Item>     
            </ListGroup>
            <Link to='/api/v1/employees' className="btn btn-primary" style={{margin:'20px auto', display: 'block', width:150}}>Back to Home</Link>
        </div>
    )
}

export default ViewEmployeeDetails;
