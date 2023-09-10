import React from "react";
import Loader from "../Loader";

export default function HighlightCard({
  heading,
  measurement,
  icon,
}) {
  return (
    <div className="relative backdrop-blur-lg bg-white/10 hover:bg-white/30 rounded-lg mb-2 h-30 p-3">
      <div className="flex justify-center">
        <div>{heading} </div>
        <span className="pl-1">{icon}</span>
      </div>
      {measurement.value ? (
        <div className="flex justify-center">
          <div className="flex items-end mt-2">
            <div className="mr-1 text-3xl font-semibold">
              {measurement?.value}
            </div>
            <div>{measurement?.type}</div>
          </div>

        </div>
      ) : ( <div className="p-9"> <Loader/></div> )}
    </div>
  );
}
