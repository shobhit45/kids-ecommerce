import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import { BsBag } from "react-icons/bs";

const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // event listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('authToken'));
  }, []);

  return (
    <header
      className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
        } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[50px] font-bold text-5xl">
            Kid's<span className="text-red-900">World</span>
          </div>
        </Link>

        {/* cart */}

        {
          !isLoggedIn ?
            <Link to='/auth'>
              <div className="bg-black text-white font-bold text-md hover:bg-gray-700 p-2 ">Sign in kid's world</div>
            </Link>
            :
            <div className="w-[40%] gap-[20px] flex items-center justify-end border-3 border-cyan-800">

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex relative"
              >
                <BsBag className="text-2xl" />
                <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                  {itemAmount}
                </div>
              </div>
              <div
                onClick={() => {
                  setIsLoggedIn(false);
                  localStorage.removeItem('authToken');
                }}
                className="bg-black cursor-pointer text-white font-bold text-sm hover:bg-gray-700 px-2 py-1 ">Log out</div>

            </div>
        }

      </div>
    </header>
  );
};

export default Header;
