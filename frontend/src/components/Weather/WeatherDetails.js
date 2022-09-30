
import moment from "moment";
import classNames from 'classnames/bind'
import styles from "./WeatherDetails.module.scss";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)
moment().format()
function WeatherDetails({ weather }) {
    return (
        <div className={cx('weather-container')}>
            <div className={cx('container-top')}>
                <FontAwesomeIcon icon={faLocationDot} className={cx('weather-icon-location')}/>
                <p className={cx('paragraph')}>
                    {weather?.location.name} ({weather?.location.country})
                </p>
            </div>

            <div className={cx('container-mid')}>
                <img
                    className={cx('weather-icon')}
                    src={weather?.current.condition.icon}
                    alt={`Icon of ${weather?.location.country}`}
                />
                <h1 className={cx('weather-temp-main')}>
                    {weather?.current.temp_c} °C
                </h1>
                <h4>Feel like</h4>
                <span className={cx('paragraph')}>
                    {weather?.current.feelslike_c}°C
                </span>
                <div className={cx('line')}></div>
                <div className={cx('addition')}>
                    <div>
                        <h4>Humidity</h4>
                        <div className={cx('paragraph')}>
                            {weather?.current.humidity}
                        </div>
                    </div>
                    <div>
                        <h4>Wind</h4>
                        <div className={cx('paragraph')}>
                            {weather?.current.wind_kph}km/h
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container-bot')}>
                <h1 className={cx('weather-title')}>
                    Today ({moment(new Date(weather?.location.localtime)).format("MM-DD-YYYY")})
                </h1>
                <p className={cx('paragraph')}>
                    {moment(new Date(weather?.location.localtime)).format("h:mm a")}
                </p>
                
            </div>
            
        </div>
    );
}

export default WeatherDetails
