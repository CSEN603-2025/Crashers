import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // use this if you're using react-router
import scad from "./Assets/scadd.png"; 
import nav from "./Assets/navBar.png";
import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";



function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

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
        scrolling ? "opacity-50" : "opacity-100"
      } bg-white border-b`}
    >
      <div className="container flex h-16 items-center justify-between px-2 md:px-6 ml-20">
        <Link to="/" >
          <img
            src={scad}
            alt="SCAD Logo"
            className="w-30 h-14"

          />
        </Link>

        {/* Links Container */}
        <div className="flex items-center gap-20 hover:text-white-500">
          <Link
            to="/"
            className="flex items-center gap-1 text-primary font-poppins font-bold text-[18px] leading-[140%] hover:text-blue-500 px-[40px] transition-colors"
          >
            Home
            <ChevronRight className="w-4 h-5 stroke-[10]" /> 
          </Link>
          <Link
            to="/about"
            className=" flex items-center gap-1 text-primary font-poppins font-bold text-[18px] leading-[140%] hover:text-blue-500 px-[40px] transition-colors"
          >
            About Us
            <ChevronRight className="w-4 h-5 stroke-[10]" />          </Link>
          <Link
            to="/Contact-SCAD"
            className="flex items-center gap-1 text-primary font-poppins font-bold text-[18px] leading-[140%] hover:text-blue-500 px-[40px] transition-colors"
          >
Contact SCAD         
<ChevronRight className="w-4 h-5 stroke-[10]" />  </Link>
<Link
  to="/"
  className="flex items-center gap-1 text-white text-[18px] font-poppins font-bold px-4 py-2 rounded-md transition-colors bg-yellow-500 hover:bg-yellow-600 hover:text-white"
>
  Log In/Sign Up
  <ChevronRight className="w-4 h-5 stroke-[10]" />
</Link>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
