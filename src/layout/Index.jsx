import React from "react";
import { Outlet } from "react-router-dom";

function index() {
  return (
    <div>
      <div className=" bg-a flex flex-col">
        <div className="flex flex-row h-screen  ">
          <div className="flex-1 w-full  overflow-y-auto scrollbar p-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
