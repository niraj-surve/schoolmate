import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-pink py-4 ">
      <div className="flex flex-col items-center max-md:mt-4">
        <div className="text-sm text-center text-white font-mulish">
          Copyright © <Link className="btn-transition hover:text-yellow" to='/'>Jeevan Shikshan x School<span className="text-yellow">MATE</span></Link>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
