import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex px-8 flex-col justify-center items-center min-h-screen">
        <h1 className=" text-5xl text-center font-extrabold py-2">WELCOME</h1>
        <p className="text-center mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam,
          soluta?
        </p>
        <Link to={"/login"} className="btn mt-10">
          Get started
        </Link>
      </div>
    </>
  );
};

export default Home;
