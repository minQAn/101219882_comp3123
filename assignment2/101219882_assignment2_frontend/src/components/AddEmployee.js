import React, {useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import styled from 'styled-components';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const StyledForm = styled(Form)`
    width: 60%;    
    margin: 0 auto;
    border: 2px solid gray;
    border-radius: 10px;
    padding: 3rem;

    .mb-3{
        margin: 0 !important;
    }    

    small{
        padding: 2px 0.9rem;
    }

    .button-group{
        display: flex;
        margin-top: 0.5rem;
        Button{
            margin-right: 0.5rem;
            
        }

        a{
            text-decoration: none;
            padding: 0.5rem;
            background-color: pink;
            border-radius: 5px;
            display: inline-block;  
            color: gray;   
            transition: 0.2s;
            &:hover{
                background-color: red;
                color:white;                
            }      
        }
    }
    
`;

function AddEmployee(props) {

    // To Update
    // to determine.. if id exists => update, if not, add page
    let {id} = useParams();
    // console.log(id);

    let navigate = useNavigate(); //to redirect after submit

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        emailId: ''             
    });

    const handleInputChange = event => {
        const {name, value} = event.target;
        setEmployee({      
            ...employee,                  
            [name]: value            
        })        
    }

    function validateEmail(email) {
        const re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        return re.test(String(email).toLowerCase());
    }

    const submitNewUser = async (event) => {
        event.preventDefault();
        
        // frontend validator
        if(employee.firstName.trim() === "" || employee.lastName.trim() === "" || !validateEmail(employee.emailId)){
            alert("Must follow the form");
            return;
        }                

        let new_user = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId            
        }                
        
        await axios.post('/api/v1/employees', {
            new_user
        }).then(res => {
            // console.log(res);
            alert(res.data);
            navigate('/api/v1/employees'); //redirect
        }).catch(err => {            
            alert(err.response.data.message);
            console.log(`error: ${err.response.data.message}`);            
        })               
    }

    const updateUser = async (event) => {
        event.preventDefault();

        // frontend validator
        if(employee.firstName.trim() === "" || employee.lastName.trim() === "" || !validateEmail(employee.emailId)){
            alert("Must follow the form");
            return;
        }     

        let user = {
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId            
        }
            
        await axios.put(`/api/v1/employees/${id}`, {
            user
        }).then(res => {
            // console.log(res);
            alert(res.data);
            navigate(`/view-employee/${id}`); //redirect
        }).catch(err => {            
            alert(err.response.data.message);
            console.log(`error: ${err.response.data.message}`);            
        })               
    }


    // to update
    const fetchData = async(id) => {        
        await axios.get(`/api/v1/employees/${id}`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(err => {
                alert(err);
            });        
    }

    useEffect(() => {  
        if(id){
            fetchData(id);           
        }
    }, [id])

    return (
        <StyledForm onSubmit={id ? updateUser : submitNewUser}>
            <h3 style={{textAlign:'center', marginBottom:30}}>
                {id ? "Update Employee" : "Add Employee"}
            </h3>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control name="firstName" onChange={handleInputChange} type="text" placeholder="Enter First Name" value={employee.firstName} />                
                <Form.Text className="text-danger">
                    {employee.firstName.trim() === "" && "*required"}
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control name="lastName" onChange={handleInputChange} type="text" placeholder="Enter Last Name" value={employee.lastName} />
                <Form.Text className="text-danger">
                    {employee.lastName.trim() === "" && "*required"}
                </Form.Text>
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email ID:</Form.Label>
                <Form.Control name="emailId" onChange={handleInputChange} type="email" placeholder="Enter Email Address" value={employee.emailId} />
                <Form.Text className="text-danger">
                    {!validateEmail(employee.emailId) && "* must follow the email form with @ and . ex) blah@blah.ca "}
                </Form.Text>
            </Form.Group>
            
            <div className="button-group">
                <Button variant="primary" type="submit">
                    Save
                </Button>
                <Link to="/">
                    Cancel
                </Link>
            </div>
        </StyledForm>
    )
}

export default AddEmployee;