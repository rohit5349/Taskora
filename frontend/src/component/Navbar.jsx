import React from "react";
import {assets} from '../assets/assets.js';
import {Link, useNavigate} from 'react-router-dom';
import { useState , useRef} from "react";

const Navbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' }
    ];

    const ref = React.useRef(null)

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [user , setUser] = useState("");
    const [role , setRole] = useState("");
    const navigate = useNavigate();
    

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

   React.useEffect(() => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");

      if(isLoggedIn === 'true'){
         const savedRole = localStorage.getItem("role");
         if(savedRole)setRole(savedRole);
      }else{
          setRole("");
      }

   },[]);

   
   
  
    React.useEffect(()=> {
        const savedUser = localStorage.getItem("user"); 
         if(savedUser){
            setUser(JSON.parse(savedUser));
         }
    },[]);

    console.log("role :", role);


    const handleLogout = () => {
       localStorage.setItem("isLoggedIn" , 'false');
       localStorage.removeItem("user");
       setUser(null);
       navigate("/login");
    };

    return (
      
            <nav className={`fixed top-0 left-0 w-full flex items-center justify-between bg-gray-600 px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-blue-500 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>  
                <img src={assets.taskora} alt="logo" className={`h-14 ${isScrolled && "invert opacity-80"}`} />
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                            {link.name}
                            <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                        </a>
                    ))}

                    
                        <a href="/dashboard" className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-black' : 'text-white'} transition-all`}>
                          Dashboard
                        </a>

                </div>

                {/* Desktop Right */}
                <div className="hidden md:flex items-center gap-4">
                    <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>

                   {user ? (
                      <div className="flex items-center gap-3 ml-4">
                          <span className="font-medium">
                            Hi, {user}
                          </span>

                          <button
                            onClick={handleLogout}
                            className="px-6 py-2 rounded-full bg-red-500 text-white"
                          >
                            Logout
                          </button>
                      </div>
                   ) : (
                      <Link to="/login">
                         <button
                           className={`px-8 py-2.5 rounded-full ml-4 transition-all duration-500 ${
                             isScrolled ? "text-white bg-black" : "bg-white text-black"
                           }`}
                         >
                           Login
                         </button>
                    </Link>
                   )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-3 md:hidden">
                    <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="4" y1="6" x2="20" y2="6" />
                        <line x1="4" y1="12" x2="20" y2="12" />
                        <line x1="4" y1="18" x2="20" y2="18" />
                    </svg>
                </div>

                {/* Mobile Menu */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {navLinks.map((link, i) => (
                        <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                            {link.name}
                        </a>
                    ))}

                    <a href="/dashboard" className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer text-black`}>
                          Dashboard
                     </a>
                    
      

                    {user ? (
                       <>
                         <span>Hi, {user}</span>
                           <button
                             onClick={() => {
                               handleLogout();
                               setIsMenuOpen(false);
                             }}
                             className="bg-red-500 text-white px-8 py-2.5 rounded-full"
                           >
                             Logout
                           </button>
                       </>
                       ) : (
                         <Link to="/login">
                           <button onClick={() => setIsMenuOpen(false)} className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500">
                             Login
                           </button>
                         </Link>
                       )}
                </div>
            </nav>
       
    );
}

export default Navbar;
