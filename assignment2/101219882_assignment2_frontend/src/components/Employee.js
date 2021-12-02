import React from 'react';
import {Button} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Row = styled.tr`
    vertical-align: middle;

    td{
        white-space:nowrap;
    }

    a{
        margin-right: 10px;
    }    
    
`;

function Employee(props) {
    const {firstName, lastName, emailId, _id} = props.user;   
        
    return (
        <Row>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{emailId}</td>
            <td>
                <Link to={{pathname: `/view-employee/${_id}`}} className="btn btn-primary">View</Link>
                <Link to={{pathname: `/add-employee/${_id}`}} className="btn btn-primary">Update</Link>
                <Button className="btn btn-danger" onClick={() => props.btnDeleteUser(_id)}>Delete</Button>
            </td>
        </Row>
    )
}

export default Employee;
