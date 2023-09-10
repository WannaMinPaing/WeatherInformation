import React from "react";

export default function DaysForecastMiniCard({ heading, value }) {
  return (
    <div className="flex flex-col items-center backdrop-blur-lg bg-black/50 rounded-lg  h-auto p-2">
        <div className="font-semibold">{heading}</div>
        <div className=" text-sm">{value}</div>
    </div>
  );
}
