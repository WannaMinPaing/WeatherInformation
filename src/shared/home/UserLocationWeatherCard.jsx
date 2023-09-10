import React from "react";
import { HiSearch } from "react-icons/hi";
import { WiDayRain, WiCloud } from "react-icons/wi";
import { CiLocationOn, CiCalendar } from "react-icons/ci";
import moment from "moment/moment";
import Loader from "../Loader";

export default function UserLocationWeatherCard({ data, location }) {

  let currentTime = "";
  const wealtherIcon = () => {
    if (data) {
      switch (data.current.condition.text) {
        case "Moderate rain": 
          return <WiDayRain />;
        case "Light rain":
          return <WiDayRain />;
        case "Heavy rain":
          return <WiDayRain />;
        case "Overcast":
          return <WiCloud />;
        default:
          return <WiCloud />;

      }
    }
  };
  if (data) {
    currentTime = moment(data.current.last_updated)
      .format("MMMM Do YYYY, h:mm:ss a")
      .split(",");
  }
  return (
    <>
      <div className=" w-full h-full p-3 pb-3 pt-2 mt-[2rem]">
        {data ? (
          <div className="backdrop-blur-lg bg-white/10 rounded-lg p-2">
            <div className="mb-1 flex flex-col">
              <div className="w-24 h-15 rounded-lg ">
                <img
                  alt={data.current.condition.icon}
                  className="w-25 h-20"
                  src={data.current.condition.icon}
                />
              </div>
              <div className="flex w-24">
                <div className="text-5xl">{data.current.temp_c}</div>
                <div className="text-xl">°C</div>
              </div>
            </div>
            <div className="my-2 flex">
              <div className="text-3xl mr-2">{wealtherIcon()}</div>
              <p className="flex items-center">{data.current.condition.text}</p>
            </div>
            <hr className="divide-y divide-blue-200 my-4" />

            <div className="my-3 flex-row">
              <div className="flex my-3">
                <div className="text-2xl mr-2">
                  <CiLocationOn />
                </div>
                <div className="text-sm">{`${data.location.name}, ${data.location.country}`}</div>
              </div>
              <div className="flex my-3">
                <div className="text-2xl mr-2">
                  <CiCalendar />
                </div>
                <div className="text-sm flex">
                  <div>{currentTime[0]}</div>
                  <span className="ml-2 font-semibold">{currentTime[1]}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader/>
        )}
      </div>
    </>
  );
}
