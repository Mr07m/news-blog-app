import React, { useEffect, useState } from "react";
import "./Weather.css";
import { FaLocationDot } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdWbSunny } from "react-icons/md";
import axios from "axios";
import { IoCloudSharp } from "react-icons/io5";
import { IoMdRainy } from "react-icons/io";
import { IoThunderstorm } from "react-icons/io5";
import { FaRegSnowflake } from "react-icons/fa";
import { BsCloudHaze2Fill } from "react-icons/bs";
import { TbFaceIdError } from "react-icons/tb";

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  useEffect(() => {
    const featchDefaultLocatio = async () => {
      const defaultLocation = "Mumbai";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&units=Metric&appid=${W_API}
`;
      const res = await axios.get(url);
      setData(res.data);
    };
    featchDefaultLocatio();
  }, []);

  const W_API = `7febda4d181a91e8df8e44d97e207193`;

  const search = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},IN&units=Metric&appid=${W_API}`;
    try {
      const res = await axios.get(url);
      if (res.data.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(res.data);
        setLocation("");
      }
    } catch (e) {
      if (e.res && e.res.status === 404) {
        setData({ notFound: true });
      } else {
        console.error("An Uninterupted Error", e);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Clear":
        return <MdWbSunny />;
      case "Clouds":
        return <IoCloudSharp />;
      case "Rain":
        return <IoMdRainy />;
      case "Thunderstorm":
        return <IoThunderstorm />;
      case "Snow":
        return <FaRegSnowflake />;
      case "Haze":
      case "Mist":
        return <BsCloudHaze2Fill />;
      default:
        return <IoCloudSharp />;
    }
  };

  return (
    <div className="weather">
      <div className="search">
        <div className="search-top">
          <span>
            <FaLocationDot />
          </span>
          <div className="location">{data.name}</div>
        </div>
        <div className="search-location">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter Location"
            name=""
            id=""
            onKeyDown={handleKeyDown}
          />
          <span className="search-button" onClick={search}>
            <CiSearch />
          </span>
        </div>
      </div>
      {data.notFound ? (
        <div>
          Not Found <TbFaceIdError />{" "}
        </div>
      ) : (
        <div className="weather-data">
          <span>
            {data.weather &&
              data.weather[0] &&
              getWeatherIcon(data.weather[0].main)}
          </span>
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.ceil(data.main.temp)} °C` : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
