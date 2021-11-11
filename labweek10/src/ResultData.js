import React, { Component } from 'react'
import './ResultData.css';

export default class ResultData extends Component {

    render() {
        return (
            <div className="result_box">
                <p><b>Email: </b>{this.props.resultData.email}</p>                
                <p><b>Full Name: </b>{this.props.resultData.name}</p>                
                <p><b>Address: </b>{this.props.resultData.address} {this.props.resultData.address2}</p>                
                <p><b>City: </b>{this.props.resultData.city}</p>                
                <p><b>Province: </b>{this.props.resultData.province}</p>                
                <p><b>Postal Code: </b>{this.props.resultData.postal_code}</p>                
            </div>
        )
    }
}
