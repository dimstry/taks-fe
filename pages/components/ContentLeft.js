import React from "react";

export default function ContentLeft() {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 h-full">
        <h1 className="text-5xl font-bold">SALDO</h1>
        <div className="w-96 h-28 bg-gray-300 flex justify-start items-center mt-3">
          <h1 className="text-5xl font-bold ml-3">Rp. 100.000</h1>
        </div>
      </div>
    </div>
  );
}
