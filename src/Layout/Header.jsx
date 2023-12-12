import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full bg-[#88AB8E] h-20 flex justify-center items-center">
      <ul className="flex gap-8">
        <li className="cursor-pointer font-bold text-lg text-white">
          <Link to="/">Form</Link>
        </li>
        <li className="cursor-pointer font-bold text-lg text-white">
          <Link to="/table">Table</Link>
        </li>
      </ul>
    </div>
  );
}
