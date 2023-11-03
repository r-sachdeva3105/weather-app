import React, { useState } from 'react'
import './Weather.css';

import searchIcon from '../assets/search.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

const Weather = () => {

    let element = document.getElementsByClassName('cityInput');
    const apiKey = '236f7eafe546027cee2a3e0019705caa';
    let weatherIcon;
    const [wicon, setWicon] = useState(weatherIcon);


    const search = async () => {
        if (element[0]?.value === '') {
            return 0;
        }
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${element[0]?.value}&units=Metric&appid=${apiKey}`
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);

        const temperature = document.getElementsByClassName('weatherTemp');
        const location = document.getElementsByClassName('weatherLocation');
        const humidity = document.getElementsByClassName('humidityValue');
        const wind = document.getElementsByClassName('windValue');

        weatherIcon = `https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`;

        setWicon(weatherIcon);

        temperature[0].innerHTML = `${data?.main?.temp}&deg;c`;
        location[0].innerHTML = `${data?.name}`;
        humidity[0].innerHTML = `${data?.main?.humidity}%`;
        wind[0].innerHTML = `${data?.wind?.speed} km/h`;
    }

    return (
        <div className='container'>
            <div className='topBar'>
                <input type="text" className='cityInput' placeholder='Enter a city...' />
                <div className='searchIcon' onClick={() => { search() }}>
                    <img src={searchIcon} alt='search icon' />
                </div>
            </div>
            <div className='weatherImage'>
                <img src={wicon} alt='weather icon' />
            </div>
            <div className="weatherTemp">--&deg;c</div>
            <div className="weatherLocation">--</div>
            <div className="dataContainer">
                <div className="element">
                    <img src={humidityIcon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidityValue dataValue">--%</div>
                        <div className="humidityText dataText">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windIcon} alt="" className='icon' />
                    <div className="data">
                        <div className="windValue dataValue">-- km/h</div>
                        <div className="windText dataText">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;