import React from "react";
import banner from "../../../public/Banner.png";
function Banner() {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-10 bg-white">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-36">
          <div className="space-y-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-500 ">
              <span className="text-pink-600 md:text-4xl">BookBasket —  </span>The Fastest Way to Your Next Read<br></br>
              <span className="text-pink-600 text-2xl">New Book Everyday!!!</span>
            </h1>
            <p className="text-sm md:text-lg">
              <span className="font-thin">Discover a world of stories, insights, and imagination at your fingertips.</span><br />
              <span className="font-thin">From timeless classics to trending reads, BookBasket brings you the books you love—delivered fast and easy. </span><br />
              <span className="text-pink-600  "> Your next favorite book is just a click away.</span>
            </p>
          </div>
        </div>
        <div className=" order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
