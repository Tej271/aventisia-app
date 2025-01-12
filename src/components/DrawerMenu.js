import React from "react";
import logo from "../assets/logo1.png";
import modelLib from "../assets/lib-white.png";
import libBlack from "../assets/lib_black.png";
import model from "../assets/layers-round.png";
import test from "../assets/task.png";
import setting from "../assets/setting.png";
import support from "../assets/support.png";
export const DrawerMenu = () => {
  return (
    <div className="bg-white w-64 min-h-screen p-4">
      <div className="bg-[#F8FAFC]">
        <img src={logo} alt="logo" />
      </div>
      <ul className="mt-6">
        <p className="mb-4">Model Library</p>
        <li className="mb-4 text-white flex gap-3 bg-[#1e1b4b] px-6 py-3 rounded-xl">
          <img src={modelLib} alt="lib" className="w-6" />
          <p>Model Library</p>
        </li>
        <p className="mb-4">Extraction Builder</p>
        <li className="mb-6 ml-6 flex gap-3">
          <img src={libBlack} alt="lib-black" className="w-6" />
          <p>Label Data</p>
        </li>
        <li className="mb-6 ml-6 flex gap-3">
          <img src={model} alt="model" className="w-6" />
          <p>Model</p>
        </li>
        <li className="mb-6 ml-6 flex gap-3">
          <img src={test} alt="test" className="w-6" />
          <p>Test</p>
        </li>
        <p className="mb-4">Help</p>
        <li className="mb-6 ml-6 flex gap-3">
          <img src={setting} alt="setting" className="w-6" />
          <p>Setting</p>
        </li>
        <li className="ml-6 flex gap-3">
          <img src={support} alt="support" className="w-6" />
          <p>Support</p>
        </li>
      </ul>
    </div>
  );
};
