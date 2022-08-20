import React from "react";
import Logo from "./svgs/Logo";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav className=" px-8 py-5 absolute sm:px-14 sm:py-10 ">
        <Link to={"/"}>
          <Logo />
        </Link>
      </nav>
    </>
  );
};

export default Nav;
