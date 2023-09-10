import React, { useEffect, useState } from "react";
import HighlightCard from "../shared/home/HighlightCard";
import UserLocationWeatherCard from "../shared/home/UserLocationWeatherCard";
import DaysForecastCard from "../shared/home/DaysForecastCard";
import Loader from "../shared/Loader";
import AreaChart from "../shared/AreaChart";
import axios from "axios";
import Location from "../shared/home/Location";
import {GiWindpump,GiInvisible,GiPrayingMantis} from "react-icons/gi";
import {PiWindBold} from "react-icons/pi";
import {WiBarometer,WiHumidity} from "react-icons/wi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() 
{
  const [data, setData] = useState();
  const [forecastDays, setForecastDays] = useState(3);
  let latlong = Location();

  const [cardWidth, setCardWidth] = useState({
    "card 1": "w-[253px]",
    "card 2": "w-[297px]",
  });
  
  const fetchUserData = async (link, setData) => {
    axios
      .get(link)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (latlong) {
      fetchUserData(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${latlong}&days=${forecastDays}`,
        setData
      );
    }
  }, [forecastDays, latlong]);

  const weather = data?.current.condition.text;
  let CurrentWeatherCardColor = "";
  let backgroundImg = "";
  
  switch (weather) 
  {
    case "Partly cloudy":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-yellow-400 to-gray-300";
      backgroundImg = "cloudy.jpg";
      break;

    case "Overcast":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-300 to-gray-700";
      backgroundImg = "cloudy.jpg";
      break;

    case "Light drizzle":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-400 to-gray-600";
      backgroundImg = "light rain.jpg";
      break;

    case "Light rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-500 to-gray-400";
      backgroundImg = "light rain.jpg";
      break;

    case "Moderate rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-500 to-gray-600";
      backgroundImg = "light rain.jpg";
      break;

    case "Heavy rain":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-500 to-gray-600";
      backgroundImg = "heavy rain.jpg";
      break;

    case "Moderate or heavy rain with thunder":
      CurrentWeatherCardColor = "bg-gradient-to-tr from-gray-600 to-gray-700";
      backgroundImg = "storm.jpg";
      break;

    default:
      CurrentWeatherCardColor = "bg-gradient-to-tr from-sky-400 to-gray-300";
      backgroundImg = "weather.jpg";
      break;
  }

  return data ? (
    <div className="flex flex-col">
      <div className="grid xl:grid-cols-5 lg:grid-cols-5 grid-cols-1 xl:gap-4 lg:gap-4 gap-0 text-gray-300 ">
        <div className="relative w-full h-full colspan-2 rounded-xl col-span-1 text-white overflow-hidden xl:mb-0 lg:mb-0 mb-3">
          <div className={` w-full  bg-cover bg-center ${CurrentWeatherCardColor} flex flex-col justify-center items-end h-full`} style={{ backgroundImage: `url('img/background/${backgroundImg}')`,}} > 
            <UserLocationWeatherCard
              data={data}
              bgColor={CurrentWeatherCardColor}
              location={latlong}
            />
          </div>
        </div>
        <div className="relative w-full h-auto rounded-lg col-span-4 overflow-hidden">
          <div className="flex flex-col  h-full">
            <div className="xl:mt:0 lg:mt-0 mt-3">Today's Highlight</div>
            <div className="flex flex-col h-full">
              <div className="flex-none grid xl:grid-cols-6 lg:grid-cols-6 grid-cols-2  gap-3 mt-2">

                <HighlightCard
                  heading="Humidity"
                  measurement={{value: data?.current.humidity,  type: "%",}}
                  icon={<WiHumidity className="text-[20px]" />}
                />

                <HighlightCard
                  heading="Visability"
                  measurement={{value: data?.current.vis_km,  type: "km",}}
                  icon={<GiInvisible className="text-[20px]" />}
                />

                <HighlightCard
                  heading="Pressure"
                  measurement={{value: data?.current.pressure_mb, type: "mb",}}
                  icon = {<WiBarometer className="text-[25px]" />}
                />

                <HighlightCard
                  heading={`Wind`}
                  measurement={{value: data?.current.wind_kph,  type: "kph",}}
                  icon={<PiWindBold className="text-[20px]" />}
                />

                <HighlightCard
                  heading="Wind Direction"
                  measurement={{value: data?.current.wind_dir,type: "",}}
                  icon = {<GiWindpump className="text-[20px]"/>}
                /> 

                <HighlightCard
                  heading="UV"
                  measurement={{value: data?.current.uv,type: "",}}
                  icon ={<GiPrayingMantis className="text-[20px]"/>}
                />
              </div>

              <div className=" flex-1 rounded-lg  pt-1 px-0">
                <div className="relative flex h-full w-full ">
                  {data ? 
                  (
                    <div className="h-auto w-full shadow-lg rounded-lg overflow-hidden grid xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-3">
                      <> 
                        <AreaChart
                          data={data?.forecast.forecastday[0].hour}
                          label={"Temperature"}
                          colorCode={"255,132,0"}
                        />
                        <AreaChart
                          data={data?.forecast.forecastday[0].hour}
                          label={"Rain Chance"}
                          colorCode={"75, 192, 192"}
                        />
                      </>
                    </div>
                  ) : ( <Loader /> )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 grid-cols-1  xl:gap-4 gap-0 h-10 text-gray-300 mt-2 bg pt-0 h-full">
        <div className="flex justify-between">
          <div className="rounded-xl text-gray-300 px-3 mb-1 self-center">
            {forecastDays} Days forecasting ( 3 for free )
          </div>
        </div>
      </div>

      <div className="relative h-auto rounded-lg col-span-4 overflow-hidden">
        <div className="h-auto">
          {data ? ( 
              <Carousel 
                responsive={{
                  superLargeDesktop: {
                    breakpoint: { max: 3000, min: 1200 },
                    items: 5
                  },
                  desktop: {
                    breakpoint: { max: 1200, min: 850 },
                    items: 4
                  },
                  tablet: {
                    breakpoint: { max: 850, min: 550 },
                    items: 3
                  },
                  mobile: {
                    breakpoint: { max: 550, min: 0 },
                    items: 2
                  }}}
              >
                {data?.forecast.forecastday?.map((hourly, index) => {
                  return (
                    <div key={index} style={{ marginLeft:"10px"}} >
                      <DaysForecastCard
                        data={hourly}
                        temperature={[ hourly.day.maxtemp_c, hourly.day.mintemp_c,]}
                      />
                    </div>
                  );
                })}

                {data?.forecast.forecastday?.map((hourly, index) => {
                  return (
                    <div key={index} style={{ marginLeft:"10px" }} >
                      <DaysForecastCard
                        data={hourly}
                        temperature={[ hourly.day.maxtemp_c, hourly.day.mintemp_c,]}
                      />
                    </div>
                  );
                })}
              </Carousel>
          ) : ( <div className={"h-[20rem]"}> <Loader /></div>  )}
        </div>
      </div>
    </div>
  ) : (<Loader />);
}
