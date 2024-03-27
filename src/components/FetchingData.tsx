import { useState, useEffect } from "react";
import DisplayWeather from "./DisplayWeather";

interface Props {
  location: string;
}

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
const FetchingData: React.FC<Props> = (props) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = props.location;
  const api = {
    key: "1e3818a62b9810ded0c4f4aed9cf337a",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  useEffect(() => {
    async function search(): Promise<void> {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${api.base}weather?q=${location}&units=metric&APPID=${api.key}`
        );
        if (!response.ok) {
          throw new Error("Invalid Input");
        }
        const data = (await response.json()) as WeatherData;
        if (data) {
          setError(null);
          setWeather(data);
        }

        console.log(data);
      } catch (err) {
        let error = err as Error;
        setError(error.message);
      }
      setIsLoading(false);
    }

    search();
  }, [location]);

  return (
    <>
      <DisplayWeather weather={weather} error={error} loading={isLoading} />
    </>
  );
};

export default FetchingData;
