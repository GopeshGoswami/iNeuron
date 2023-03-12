import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar(props: any) {
  const [darkMode, setDarkMode] = useState(false);
  console.log(darkMode);
  
  return (
    // For Sticky, set the classes: sticky, top-0 left-0
    <>
      <nav className={`sticky w-full top-0 left-0 transition-all duration-1000 ease-in-out mb-3 flex justify-around z-20   py-5 md:py-5 bg-black `}>
        <Link
          to="/"
          className={`text-xl md:text-xl lg:text-xl font-semibold ${
            props.darkMode ? "text-teal-500" : "text-teal-600"
          } flex items-center`}
        >
          {/* <img src={logo} alt="" className="w-4 mr-10" /> */}
          Users List API CRUD
        </Link>
      </nav>
   
    </>
  );
}
