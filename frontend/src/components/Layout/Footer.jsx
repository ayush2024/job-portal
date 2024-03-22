import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By coding_ayush.</div>
      <div>
        <Link to={"https://www.facebook.com/ayushkumar.jha.56863/"} target="_blank">
          <FaFacebookF />
        </Link>
        {/* <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaYoutube />
        </Link> */}
        <Link to={"https://www.linkedin.com/in/ayush-kumar-jha-7a0943205/"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/ayush__2024/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;