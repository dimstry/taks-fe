/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useEffect, useState } from "react";

export default function ContentRight() {
  // fetch api
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  return (
    <div className="w-full h-96">
      <h1 className="text-5xl font-bold">News</h1>

      <div className="news_container">
        {data.splice(1, 15).map((item) => {
          return (
            <div className="news_item mt-4 gap-6" key={item.i}>
              <div className="news_item_img w-50 h-50 mr-auto">
                <img
                  className="object-fill w-full h-full"
                  src="https://source.unsplash.com/random"
                  alt="image"
                />
              </div>
              <div className="news_item_content w-full">
                <h1 className="text-2xl font-bold">
                  {item.title.slice(1, 10)}
                </h1>
                <p className="text-sm">{item.body.slice(1, 400)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
