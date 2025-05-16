import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import scad from "./Assets/logo.png";
import {
  ArrowRight,
  Home,
  Bell,
  User,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import RenderNotif from "./whichNotif"; // This should now handle the dropdown logic

function NavBar() {
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [role, setRole] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); 
  

  const isBaseRoute = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolling(true);
      else setScrolling(false);
    };

    window.addEventListener("scroll", handleScroll);

    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const profileLink =
    role === "pro" ? "/pro/studentProfile" : "/studentProfile";

  const toggleDropdown = () => setShowDropdown((prev) => !prev); // NEW

  return (
    <nav
      className={`flex w-full fixed top-0 left-0 right-0 z-10 transition-opacity duration-500 ${
        scrolling ? "opacity-70" : "opacity-100"
      } bg-white border-b`}
    >
      <div className="container flex h-24 items-center justify-between px-2 md:px-6 ml-20">
        <Link to="/">
          <img src={scad} alt="SCAD Logo" className="w-30 h-40" />
        </Link>

        <div className="flex items-center gap-10 hover:text-white-500">
          {!isBaseRoute && (
            <div className="flex items-center gap-6 px-[40px]">
              <Link to="/" className="transition-transform hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </Link>

              <div className="w-12 h-12 flex items-center justify-center relative">
                <RenderNotif
                  role={role}
                  showDropdown={showDropdown}
                  onBellClick={toggleDropdown}
                />
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={profileLink}
                  className="transition-transform hover:scale-105 relative"
                >
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </Link>

                {role === "pro" && (
                  <div className="relative group flex items-center">
                    <div className="flex items-center gap-1 bg-yellow-400 text-white font-bold font-poppins text-xs px-3 py-2 rounded-full shadow-md">
                      <BadgeCheck className="w-4 h-4 mr-1" />
                      PRO
                    </div>
                    <span className="absolute top-[50px] left-0 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-2 py-1 rounded-md shadow-lg">
                      You have completed 3 months!
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isBaseRoute && (
            <Link
              to="/"
              className="flex items-center gap-1 text-primary font-poppins font-bold text-lg leading-[140%] hover:text-green-700 px-[40px] transition-colors"
            >
              Log Out
              <ChevronRight className="w-4 h-5 stroke-[10]" />
            </Link>
          )}

          {isBaseRoute && (
            <Link
              to="/login"
              className="flex items-center gap-1 text-primary font-poppins font-bold text-lg leading-[140%] hover:text-green-700 px-[40px] transition-colors"
            >
              Log in
              <ChevronRight className="w-4 h-5 stroke-[10]" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
