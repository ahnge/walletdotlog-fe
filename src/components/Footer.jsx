import React from "react";
import { DjangoLogo, ReactLogo, RQLogo } from "./svgs/FooterIcons";

export const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content ">
      <div>
        <h2 className=" font-bold text-3xl uppercase">
          wallet
          <br />
          <span className=" text-[#687BFD]">dot</span>log
        </h2>
        <p>Copyright © 2022 - All right reserved</p>
        <p>Built using these tools</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <ReactLogo />
          <RQLogo />
          <DjangoLogo />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
