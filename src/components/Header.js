import React from "react";

const Header = () => {
  return (
    <div className="flex justify-evenly">
      <h5>AI/ML Model Builder</h5>
      <input type="search" className="w-60 h-14" placeholder="Search" />
      <img src="" alt="notify" />
      <img src="" alt="love" />

      <div className="flex">
        <img src="" alt="user" />
        <div className="flex flex-col">
          <p>Neurotic Spy</p>
          <p>neurotic@talido.com</p>
        </div>
        <img src="" alt="dropdown" />
      </div>
    </div>
  );
};

export default Header;
