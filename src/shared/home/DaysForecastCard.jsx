import moment from "moment";
import React from "react";
import DaysForecastMiniCard from "./DaysForecastMiniCard";

export default function DaysForecastCard({ temperature, data }) {
  const dayData = data.day;
  const forecastDate = moment(data.date).format("ll");
  return (
    <div className="p-2 h-[20rem] w-auto overflow-hidden">
      <div className="flex flex-col h-full backdrop-blur-lg bg-white/10 hover:bg-white/30 hover:bg-white/30 rounded-lg p-3 ">
        <div className="text-xl text-gray-300 font-semibold">
          {forecastDate}
        </div>
        <div className="flex-1 flex flex-col pt-5">
          <div className="flex flex-row h-[5rem]">
            <div>
              <img
                alt={data.day.condition.icon}
                className="pl-3"
                src={data.day.condition.icon}
              />
            </div>

            <div className="flex-1 grid grid-rows-2 pl-5 text-gray-300 text-xl">
              {temperature.map((temp, index) => {
                return (
                  <div key={index} className="flex">
                    <div className="text-xl">{temp}</div>
                    <div className="text-sm ml-1">{`°C`}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-1 grid grid-rows-2 h-full text-gray-300">
            <div className="grid grid-cols-3 gap-2">
              <DaysForecastMiniCard
                heading={"Wind"}
                value={`${dayData.maxwind_kph} kph`}
              />
              <DaysForecastMiniCard
                heading={"Rain"}
                value={`${dayData.daily_chance_of_rain} %`}
              />
              <DaysForecastMiniCard heading={"UV"} value={`${dayData.uv}`} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <DaysForecastMiniCard
                heading={"Visability"}
                value={`${dayData.avgvis_km} km`}
              />
              <DaysForecastMiniCard
                heading={"Humidity"}
                value={`${dayData.avghumidity} %`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
