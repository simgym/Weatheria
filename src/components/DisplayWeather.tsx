import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { classAction } from "../store/redux";
import "./DisplayWeather.css";

interface WeatherData {
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

interface Props {
  weather: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const DisplayWeather: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const appClassName = useAppSelector((state) => state.weather.appClassName);

  const isLoading = props.loading;

  const weather = props.weather;
  let error = props.error;

  const datBuilder = (value: Date) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[value.getDay()];
    const year = value.getFullYear();
    const date = value.getDate();
    const month = months[value.getMonth()];

    return `${day} ${date} / ${month} / ${year}`;
  };

  useEffect(() => {
    if (weather && weather.main && weather.weather[0]) {
      if (
        weather.weather[0].main === "Rain" ||
        weather.weather[0].main === "thunderstorm" ||
        weather.weather[0].main === "Drizzle"
      ) {
        dispatch(classAction.rain());
      } else if (weather.weather[0].main === "Haze") {
        dispatch(classAction.haze());
      } else if (weather.weather[0].main === "Clouds") {
        dispatch(classAction.cloud());
      } else if (weather.weather[0].main === "Clear") {
        dispatch(classAction.clear());
      } else if (weather.weather[0].main === "Mist") {
        dispatch(classAction.mist());
      }

      error = null;
    }
  }, [weather]);

  return (
    <>
      <div>
        <main>
          {error === null ? (
            weather && weather.main ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name},{weather.sys.country}
                  </div>
                  <div className="date">{datBuilder(new Date())}</div>
                </div>
                <div className="Weather-box">
                  <div className="temp">{weather.main.temp}°C</div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
                <div className="weather_values">
                  <div className="humidity">Humidity:</div>
                  <div className="humidity_value">{weather.main.humidity}%</div>
                  <div className="pressure">Pressure:</div>
                  <div className="pressure_value">
                    {weather.main.pressure}mbar
                  </div>
                  <div className="feels">Real feel:</div>
                  <div className="feels_value">{weather.main.feels_like}°</div>
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            <p className="error">{error}</p>
          )}
        </main>
      </div>

      {isLoading && <p>Loading...</p>}
    </>
  );
};

export default DisplayWeather;
