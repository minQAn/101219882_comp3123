import React from "react";
import axios from 'axios';
// import useState from 'react';

export default class app extends React.Component{

    state = {
      name: [],
      dt:[],
      temp: [],
      humidity: [],    
      main: [],
      windSpeed: [],
      sunset: [],
      icon: [],
    };

    city = 'Toronto';
    apiKey = 'b87459eaf0e621802ac65bc5b24871c6';
    apiURL = `http://api.openweathermap.org/data/2.5/weather?units=metric&q=${this.city}&appid=${this.apiKey}`;

    componentDidMount(){
        axios.get(this.apiURL)
        .then(res => {
            console.log(res);
            this.setState({name: res.data.name})
            this.setState({temp: res.data.main.temp.toFixed(0)})
            this.setState({main: res.data.weather[0].main})
            this.setState({humidity: res.data.main.humidity})
            this.setState({dt: res.data.dt})
            this.setState({tmp: res.data.rain})
            this.setState({windSpeed: res.data.wind.speed})
            this.setState({sunset: res.data.sys.sunset})
            this.setState({icon: res.data.weather[0].icon})
        })
    };


    convertToFormattedTime(unixTime){
      let unix_time = unixTime;
      let date = new Date(unix_time * 1000);
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let result = `${hours} : ${minutes}`;
      return result;
    }
    
    // convertKelvinToCelsius(kelvin){
    //   const toCelsius = 273.15;
    //   let result = (kelvin - toCelsius).toFixed(0);
    //   return result;
    // }  
  
    convertMPStoKPH(mps){
      const toKPH = 3.6;
      let result = (mps * toKPH).toFixed(1);
      return result;
    }

    render(){
        return(        
          <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="card p-5">
                        <div className="d-flex">

                          {/* city name */}
                          <h6 className="flex-grow-1">{this.state.name}</h6> 

                          {/* current time */}
                          <h6>{this.convertToFormattedTime(this.state.dt)}</h6>  

                        </div>
                        <div className="d-flex flex-column temp mt-3 mb-3"> 
                            <h1 className="mb-2 font-weight-bold" id="heading"> 

                              {/* temp(celsius) */}
                              {this.state.temp}° C  

                            </h1> 
                            <span className="small grey" style={{fontSize:16, fontWeight:'bold'}}>

                              {/* weather main status like Sunny */}
                              {this.state.main}  

                            </span> 
                        </div>
                        <div className="d-flex">
                            <div className="temp-details flex-grow-1">
                                <p className="my-1"> 
                                  <img src="https://i.imgur.com/B9kqOzp.png" height="17px" alt="wind" /> 
                                  &nbsp;
                                  {/* wind speed */}
                                  Wind: <span style={{fontSize:16, marginRight: '1rem'}}> {this.convertMPStoKPH(this.state.windSpeed)} km/h </span> 

                                </p>
                                <p className="my-1"> 
                                  <img src="https://previews.123rf.com/images/olgachirkova/olgachirkova1311/olgachirkova131100015/23471737-%EB%AC%BC%EB%B0%A9%EC%9A%B8-.jpg" height="17px" alt="humidity" /> 
                                  &nbsp;
                                  {/* Humidity */}
                                  Humidity: <i className="fa fa-tint mr-2" aria-hidden="true"></i> <span style={{fontSize:16, marginRight: '1rem'}}> {this.state.humidity} % </span> 
                                </p> 
                                
                                <p className="my-1"> 
                                  <img src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Weather-Sunset-icon.png" height="17px" alt="sunset" /> 
                                  &nbsp;
                                  {/* sunset time */}
                                  Sunset: <span style={{fontSize:16, marginRight: '1rem'}}> {this.convertToFormattedTime(this.state.sunset)} </span>
                                </p>  
                              
                            </div>
                            <div> 
                              {/* Weather Icon */}
                              <img src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`} width="120px" alt="weatherIcon" /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        )
    }

}
