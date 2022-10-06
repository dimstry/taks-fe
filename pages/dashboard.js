/* eslint-disable @next/next/no-img-element */
import React from "react";
import Corousel from "./components/Corousel";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import NavBar from "./components/NavBar";
export default function dashboard() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      {/* navbar */}
      <NavBar />
      {/* corousel */}
      <Corousel />
      {/* content */}
      <div className="flex justify-center w-full px-6">
        <div className="w-6/12 h-full flex justify-start items-center">
          {/* content kiri */}
          <ContentLeft />
        </div>
        <div className="w-6/12 h-full flex justify-start items-center">
          {/* content kanan */}
          <ContentRight />
        </div>
      </div>
    </div>
  );
}
