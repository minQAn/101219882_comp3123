import React, { useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import Employee from './Employee';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    text-Decoration: none;
    background-color: #D4F1F4;
    display: inline-block;
    padding: 10px 15px;
    border-radius: 10px;
    color: #189AB4;    
    margin-bottom: 10px;
    font-weight: bold;
    &:hover{
        background-color: #75E6DA;
        color: #05445E;        
    }
    transition: 0.3s;
`;  


function EmployeeList() {

    let [employees, setEmployees] = useState([]);    

    const getEmployees = async() => {
        await axios.get('/api/v1/employees')
        .then(response => {            
            setEmployees(response.data); 
            // console.log(response.data);                  
        })
        .catch(err => console.log(`Error----------- ${err}`));
    }

    useEffect(() => {
       getEmployees();
    },[]);

    
    //delete
    const deleteEmployee = async(_id) => {
        await axios.delete(`/api/v1/employees/${_id}`)
            .then(response => {
                const data = employees.filter(user => user._id !== _id); //delete users by filter
                setEmployees(data);
                alert(response.data);                
            })
            .catch(err => {
                alert(err.response.data.message);
            });        
    }
   

    return (
        <div className="Employee_list_box">
            <h4 style={{textAlign:'center', margin:30}}>Employee List</h4>
            
            <StyledLink to="/add-employee/_add">Add Employee</StyledLink>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>    
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((user) => (
                            <Employee user={user} key={user._id} btnDeleteUser={deleteEmployee}/>
                        ))
                    }                                    
                </tbody>
            </Table>
        </div>
    )
}

export default EmployeeList;
