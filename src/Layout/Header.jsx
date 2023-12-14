import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import hamburger from "../icons/hamburger.svg";

export default function Header() {
  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpenModal(false);
    }
  };

  const handleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleLinkClick = () => {
    setOpenModal(false);
  };

  const getLinkStyles = (path) => {
    const baseStyles = "cursor-pointer text-center font-bold text-lg no-underline";

    if (location.pathname === path) {
      return `${baseStyles} text-black`;
    } else {
      return `${baseStyles} text-gray-500 hover:text-gray-700`;
    }
  };

  return (
    <div className="w-full bg-[#88AB8E] h-20 flex justify-center items-center relative">
      <img
        onClick={handleModal}
        src={hamburger}
        alt="."
        className="block lg:hidden cursor-pointer absolute left-6"
      />

      <ul className={`lg:flex hidden lg:visible gap-8 ${openModal ? "hidden" : "flex"}`}>
        <li>
          <Link
            to="/"
            onClick={handleLinkClick}
            className={getLinkStyles("/")}
          >
            Form
          </Link>
        </li>
        <li>
          <Link
            to="/table"
            onClick={handleLinkClick}
            className={getLinkStyles("/table")}
          >
            Table
          </Link>
        </li>
      </ul>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="bg-white p-8 rounded-md shadow-lg w-1/2 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col gap-4">
              <li>
                <Link
                  to="/"
                  onClick={() => handleLinkClick()}
                  className={getLinkStyles("/")}
                >
                  Form
                </Link>
              </li>
              <li>
                <Link
                  to="/table"
                  onClick={() => handleLinkClick()}
                  className={getLinkStyles("/table")}
                >
                  Table
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
