import React, { useState, useEffect } from "react";
import "./App.css";
import { NavigationBar } from "./components/NavigationBar";
import { DrawerMenu } from "./components/DrawerMenu";
import { ModelBuildTable } from "./components/ModelBuildTable";
import { CreateModelModal } from "./components/CreateModelModal";
import data from "./assets/data.json";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem("modelData");
    return savedData ? JSON.parse(savedData) : data;
  });

  useEffect(() => {
    localStorage.setItem("modelData", JSON.stringify(rows));
    console.log("Updated Data:", rows);
  }, [rows]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveModel = (modelData) => {
    const newModel = {
      ...modelData,
      id: uuidv4(),
      createdOn: new Date().toLocaleDateString(),
      lastTrainedOn: new Date().toLocaleDateString(),
      status: "Active",
    };

    setRows((prevRows) => [...prevRows, newModel]);
    handleCloseModal();
  };

  return (
    <div className="flex">
      <DrawerMenu />

      <div className="flex flex-col flex-grow bg-[#f8fafc]">
        <NavigationBar />
        <div className="p-6 m-8 bg-[#fff]">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Model Library</h1>
            <button
              className="rounded-lg bg-[#4f46e5] p-4 text-white"
              onClick={handleOpenModal}
            >
              + Create New Model
            </button>
          </div>
          <ModelBuildTable rows={rows} />
        </div>
      </div>

      {isModalOpen && (
        <CreateModelModal onClose={handleCloseModal} onSave={handleSaveModel} />
      )}
    </div>
  );
};

export default App;
