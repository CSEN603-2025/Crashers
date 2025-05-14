import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // use this if you're using react-router
import scad from "./Assets/logo.png"; 
import { ArrowRight, Home } from "lucide-react";
import { ChevronRight,Bell,User,House } from "lucide-react";

import { useLocation } from "react-router-dom";


function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const isBaseRoute = location.pathname === "/";

  // Function to handle scroll
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true); // Start fading when scrolled down 50px
    } else {
      setScrolling(false); // Reset opacity when on top
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <nav className={` flex w-full fixed top-0 left-0 right-0 z-10 transition-opacity duration-500 ${
        scrolling ? "opacity-70" : "opacity-100"
      } bg-white border-b`}
    >
      <div className="container flex h-24 items-center justify-between px-2 md:px-6 ml-20">
        <Link to="/" >
          <img
            src={scad}
            alt="SCAD Logo"
            className="w-30 h-40"

          />
        </Link>

        {/* Links Container */}
        <div className="flex items-center gap-20 hover:text-white-500">
  
{ !isBaseRoute&& <div className="flex items-center gap-6 px-[40px]">
    <Link to="/" className="transition-transform hover:scale-105">
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
      <Home className="w-6 h-6 text-white" />
    </div>
  </Link>
  {/* Notifications Icon in Green Circle */}
  <Link to="/notificationsPro" className="transition-transform hover:scale-105">
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
      <Bell className="w-6 h-6 text-white" />
    </div>
  </Link>

  {/* Profile Icon in Green Circle */}
  <Link to="/studentProfile" className="transition-transform hover:scale-105">
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
      <User className="w-6 h-6 text-white" />
    </div>
  </Link>
</div>}


{!isBaseRoute&&<Link
      to="/"
      className="flex items-center gap-1 text-primary font-poppins font-bold text-lg leading-[140%] hover:text-green-700 px-[40px] transition-colors"
    >
      Log Out
      <ChevronRight className="w-4 h-5 stroke-[10]" /> 
    </Link>}
    {isBaseRoute&&<Link
      to="/login"
      className="flex items-center gap-1 text-primary font-poppins font-bold text-lg leading-[140%] hover:text-green-700 px-[40px] transition-colors"
    >
      Log in
      <ChevronRight className="w-4 h-5 stroke-[10]" /> 
    </Link>}

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
