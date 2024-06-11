import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}){
    let [city, setCity]= useState("");
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = ""; //add API KEY

    let getWeatherInfo = async()=>{
        let response =  await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        let result = {
            city:city,
            temp : jsonResponse.main.temp,
            tempMin : jsonResponse.main.temp_min,
            tempMax : jsonResponse.main.temp_max,
            humidity : jsonResponse.main.humidity,
            feelsLike : jsonResponse.main.feels_like,
            weather : jsonResponse.weather[0].description,
        }
        console.log(result);
        return result;
    }

    let handleChange = (evt)=>{
        setCity(evt.target.value);
    };

    let handleSubmit = async(evt)=>{
        evt.preventDefault();
        console.log(city);
        setCity("");
        let newInfo = await getWeatherInfo();
        updateInfo(newInfo);
    };

    return (
        <div className='SearchBox'>
            <h3>Search for Weather</h3>
            <form onSubmit={handleSubmit}>
            <TextField id="city" label="City Name" variant="outlined"  value={city} onChange={handleChange} required/><br></br><br></br>
            <Button variant='contained' type="submit" >Search</Button>
            </form>
        </div>
    )
}