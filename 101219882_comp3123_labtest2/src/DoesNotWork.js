import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

import test_data from './weather_api_output.json';



function App() {
  let apiKey = 'b87459eaf0e621802ac65bc5b24871c6';
  let city = 'Toronto';
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  let [weatherData, setWeatherData] = useState({});
  let {name, dt} = weatherData;
  const {temp, humidity} = weatherData.main;
  // let {speed} = weatherData.wind;
  // let {icon, main} = weatherData.weather;
  // let {sunset} = weatherData.sys;


  useEffect(() => {
    // axios.get(apiURL)
    //   .then(res => {
    //     setWeatherData(res.data)
    //     console.log(res.data);
    //   })      
    //   .catch(err => console.log(`------${err}------`));  
        
    setWeatherData(test_data);
  },[apiURL]);



  function convertToFormattedTime(unixTime){
    let unix_time = unixTime;
    let date = new Date(unix_time * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let result = `${hours} : ${minutes}`;
    return result;
  }
  
  function convertKelvinToCelsius(kelvin){
    const toCelsius = 273.15;
    let result = (kelvin - toCelsius).toFixed(0);
    return result;
  }  

  function convertMPStoKPH(mps){
    const toKPH = 3.6;
    let result = (mps * toKPH).toFixed(1);
    return result;
  }

  
  return (    
    <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-sm-12 col-xs-12">
                <div className="card p-5">
                    <div className="d-flex">

                      {/* city name */}
                      <h6 className="flex-grow-1">{name}</h6> 

                      {/* current time */}
                      <h6>{convertToFormattedTime(dt)}</h6>  

                    </div>
                    <div className="d-flex flex-column temp mt-3 mb-3"> 
                        <h1 className="mb-2 font-weight-bold" id="heading"> 

                          {/* temp(celsius) */}
                          {/* {convertKelvinToCelsius(temp)}° C   */}

                        </h1> 
                        <span className="small grey" style={{fontSize:16, fontWeight:'bold'}}>

                          {/* weather main status like Sunny */}
                          {/* {main}   */}

                        </span> 
                    </div>
                    <div className="d-flex">
                        <div className="temp-details flex-grow-1">
                            <p className="my-1"> 
                              <img src="https://i.imgur.com/B9kqOzp.png" height="17px" alt="wind" /> 
                              
                              {/* wind speed */}
                              {/* Wind: <span style={{fontSize:16, marginRight: '1rem'}}> {convertMPStoKPH(speed)} km/h </span>  */}

                            </p>
                            <p className="my-1"> 
                              <img src="https://previews.123rf.com/images/olgachirkova/olgachirkova1311/olgachirkova131100015/23471737-%EB%AC%BC%EB%B0%A9%EC%9A%B8-.jpg" height="17px" alt="humidity" /> 
                              
                              {/* humidity */}
                              {/* Humidity: <i className="fa fa-tint mr-2" aria-hidden="true"></i> <span style={{fontSize:16, marginRight: '1rem'}}> {humidity} % </span>  */}
                            </p> 
                            
                            <p className="my-1"> 
                              <img src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Weather-Sunset-icon.png" height="17px" alt="sunset" /> 
                              
                              {/* sunset time */}
                              {/* Sunset: <span style={{fontSize:16, marginRight: '1rem'}}> {convertToFormattedTime(sunset)} </span> */}
                            </p>  
                          
                        </div>
                        <div> 
                          {/* Weather Icon */}
                          {/* <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} width="100px" alt="weatherIcon" />  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>     
  );
}

export default App;
