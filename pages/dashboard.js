/* eslint-disable @next/next/no-img-element */
import React from "react";
import Corousel from "./components/Corousel";
import ContentLeft from "./components/ContentLeft";
import ContentRight from "./components/ContentRight";
import NavBar from "./components/NavBar";
export default function dashboard() {
  return (
    // container responsive
    <div className="container mx-auto">
      {/* navbar */}
      <NavBar />
      {/* corousel */}
      <Corousel />
      {/* content */}
      {/* ketika table jadi column */}
      <div className="flex flex-col md:flex-row w-11/12 mx-auto">
        <div className="w-6/12 h-full flex justify-start items-center">
          {/* content kiri */}
          <ContentLeft />
        </div>
        <div className="w-full h-full flex justify-start items-center md:w-6/12">
          {/* content kanan */}
          <ContentRight />
        </div>
      </div>
    </div>
  );
}
