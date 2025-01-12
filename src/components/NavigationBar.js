import React, { useRef, useEffect } from "react";
import searchIcon from "../assets/search.png";
import command from "../assets/Command.png";
import down from "../assets/down.png";

export const NavigationBar = () => {
  const globalSearchRef = useRef();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        globalSearchRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between relative">
      <h2 className="font-medium">AI/ML Model Builder</h2>
      <div className="flex justify-between items-center">
        <div className="flex items-center relative">
          <img className="absolute left-2" src={searchIcon} alt="searchIcon" />
          <input
            ref={globalSearchRef}
            type="text"
            placeholder="Search"
            className="border rounded p-2 pl-10"
          />
          <img className="absolute right-5" src={command} alt="commmand" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        <div className="flex flex-col">
          <div className="text-sm">Neurotic Spy</div>
          <div className="text-xs text-gray-400">neurotic@taildo.com</div>
        </div>
        <img className="" src={down} alt="down-arrow" />
      </div>
    </div>
  );
};
