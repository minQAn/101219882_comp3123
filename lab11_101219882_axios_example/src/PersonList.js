import React, { Component } from 'react'
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './PersonList.css';



export default class PersonList extends Component {

    constructor(props){
        super(props);

        this.state = {
            persons: []
        }
    }
    
    // like useEffect
    componentDidMount(){
        axios.get(`https://randomuser.me/api/?results=10`) // get 10 persons data
        .then(res => {
            console.log(res.data);
            const persons = res.data.results;
            this.setState({ persons });
            // console.log(this.state);
        })
    }
    
    render() {
        return (
            <div>
                {
                    this.state.persons.map(user => (                        
                        <div className="container" key={user.login.uuid}>
                            <p className="user_id"><b>{user.name.title} {user.name.first} {user.name.last} - {user.login.uuid}</b></p>
                            <div className="profile_box">
                                <p className="photo">
                                    <img src={user.picture.large} alt="user_photo" />
                                    <Button variant="primary">Details</Button>
                                </p>
                                <table className="profile_table">
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>User Name:</td>
                                            <td><b>{user.login.username}</b></td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>{user.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Time Zone Description:</td>
                                            <td>{user.location.timezone.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country} - {user.location.postcode}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Birth Date and Age:</td>
                                            <td>{user.dob.date} ({user.dob.age})</td>
                                        </tr>
                                        <tr>
                                            <td>Register Date:</td>
                                            <td>{user.registered.date}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone#:</td>
                                            <td>{user.phone}</td>
                                        </tr>   
                                        <tr>
                                            <td>Cell#:</td>
                                            <td>{user.cell}</td>
                                        </tr>  
                                    </tbody>                                   
                                </table>
                            </div>
                        </div>                        
                    ))
                }                
            </div>
        )
    }
};
