/* eslint-disable @next/next/no-img-element */
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

export default function Corousel() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper my-4 mx-auto"
      >
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/03/20/15/40/nature-7081138__340.jpg"
            alt="image slide 1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/07/24/17/55/wind-energy-7342177__340.jpg"
            alt="image slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="object-fill w-full h-96"
            src="https://cdn.pixabay.com/photo/2022/07/26/03/35/jogger-7344979__340.jpg"
            alt="image slide 3"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
