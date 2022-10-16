import { useState } from "react";
import ApiService from '../services/Api.service';
import loaderimage from '../assets/images/loader.gif';

const Weather = () => {
    const [cityName, setCityName] = useState('');
    const [weatherData, setWeatherData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const onInputChange = (event) => {
        setCityName(event.target.value);
    };

    const searchHandler = async (e) => {
        try {
            if (cityName && e.key === 'Enter') {
                setLoading(true);
                setWeatherData({});
                const responseData = await ApiService.httpGet(cityName);
                setWeatherData(responseData);
                setLoading(false);
                setCityName('');
                setError(false);
            }
        } catch (error) {
            setLoading(false);
            setCityName('');
            setError(true);
        }
    };

    return (
        <>
            <input
                type="text"
                className='search'
                placeholder="Enter a City"
                onChange={onInputChange}
                value={cityName}
                onKeyPress={searchHandler}
            />

            {/* Loader */}
            {loading && <div> <img src={loaderimage} alt="Loading..." /></div>}

            {/* Error handler */}
            {error && !loading && <p className="error-container">City not found.</p>}

            {/* Weather Details */}
            {Object.keys(weatherData).length > 0 &&
                <div className="city-container">
                    <h2 className="city-name">
                        <span>{weatherData?.name}</span>
                    </h2>
                    <div className="temperature">
                        {Math.round(weatherData?.main?.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <p>{weatherData.weather && weatherData.weather.length ? weatherData.weather[0]?.description : ''}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default Weather;