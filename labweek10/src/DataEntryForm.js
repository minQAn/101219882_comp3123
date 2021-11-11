import React, { Component } from 'react'
import './DataEntryForm.css';
import {Button} from 'react-bootstrap';
import ResultData from './ResultData';
// import Select from 'react-select';

            

export default class DataEntryForm extends Component {

    constructor(){
        super();

        this.provinces = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];

        this.state = {                      
            email:"",
            name:"",
            address:"",
            address2:"",
            city:"",
            province:"",
            postal_code:"",
            agree_terms: false,

            result:{},

            isSubmitted:false
        }    
        
        
        this.submitFormValues = this.submitFormValues.bind(this);
    }

   
    toUppercase(params) {
        return params[0].toUpperCase() + params.slice(1);
    }

    readValue = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })

        // console.log(e.target.value);
    }

    toggleAgreeTerms(curState){    
        this.setState({
            ...this.state,
            agree_terms: curState
        })      
        // console.log(curState);
    }

    submitFormValues = e => {   // (){} 형식으로 하면 파라미터로 보낼때 (e) => {this.submitFormValues(e)}로 보내야함..
        e.preventDefault(); // to stop reload
        // console.log(JSON.stringify(this.state));
        
        this.setState({
            ...this.state,
            result:{
                email: this.state.email,
                name: this.state.name,
                address: this.state.address,
                address2: this.state.address2,
                city: this.state.city,
                province: this.state.province,
                postal_code: this.state.postal_code,
                agree_terms: this.state.agree_terms
            },
            isSubmitted: true,           
        });
        
        // reset     
        document.getElementById('email').value = "";
        document.getElementById('name').value = "";
        document.getElementById('address').value = "";
        document.getElementById('address2').value = "";
        document.getElementById('city').value = "";
        // selectedIndex doesn't work in react
        document.getElementById('province').selectedIndex = 0; // not working
        document.getElementById('postal_code').value = "";
        document.getElementById('checkBox').checked = false;                


        // used Ref to focus
        this.emailInput.focus();    

        
    }

    render() {
        
        return (
            <>
                <form className="container" onSubmit={(e) => this.submitFormValues(e)}>
                    <h3>Data Entry Form</h3>
                    <div className="email_name_box">
                        <p className="email">
                            <label name="email" htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" placeholder="Enter email" onChange={this.readValue} ref={ref => this.emailInput = ref}></input>
                        </p>
                        <p className="name">
                            <label name="name" htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" placeholder="Full Name" onChange={this.readValue}></input>
                        </p>
                    </div>

                    <div className="address">
                        <label name="address" htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder="1234 Main St" onChange={this.readValue}></input>
                    </div>

                    <div className="address2">
                        <label name="address2" htmlFor="address2">Address 2</label>
                        <input type="text" name="address2" id="address2" placeholder="Apartment, studio, or floor" onChange={this.readValue}></input>
                    </div>

                    <div className="city_province_postal">
                        <p className="city">
                            <label name="city" htmlFor="city">City</label>
                            <input type="text" name="city" id="city" onChange={this.readValue}></input>
                        </p>
                        <p className="province">
                            <label name="province" htmlFor="province">Province</label>
                            <select name="province" id="province" value={this.state.province} onChange={this.readValue}>   {/* way of using onChange for select */}
                                <option value="none">Choose...</option>
                                {                            
                                    this.provinces.map((pro, index) => (                                    
                                        <option value={pro} key={index}>{this.toUppercase(pro)}</option>
                                    ))
                                }
                            </select>
                        </p>
                        <p className="postal_code">
                            <label name="postal_code" htmlFor="postal_code">Postal Code</label>
                            <input type="text" name="postal_code" id="postal_code" onChange={this.readValue}></input>
                        </p>
                    </div>

                    <div className="checkBox">
                        <input type="checkbox" id="checkBox" />
                        <label htmlFor="checkBox" onClick={() => this.toggleAgreeTerms(!this.state.agree_terms)}>Agree Terms &amp; Condition?</label>
                    </div>
                    
                    <Button type="submit" className="btn btn-success">Submit</Button>
                </form>
                
                {
                    this.state.isSubmitted && <ResultData resultData={this.state.result} />
                }                
            </>
        )
    }
}
