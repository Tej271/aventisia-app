import React, { useState } from "react";
import "./App.css";
import { NavigationBar } from "./components/NavigationBar";
import { DrawerMenu } from "./components/DrawerMenu";
import { ModelBuilderTable } from "./components/ModelBuilderTable";
import { ModelBuildTable } from "./components/ModelBuildTable";
import { CreateModelModal } from "./components/CreateModelModal";
import data from "./assets/data.json";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [rows, setRows] = useState([
  //   {
  //     name: "Blonde Drizzle",
  //     id: "#5412448",
  //     type: "Extraction",
  //     description: "Edit Customer ...",
  //     createdOn: "29/02/2024",
  //     lastTrainedOn: "29/02/2024",
  //     status: "Active",
  //     action: "&#8942;",
  //   },
  // ]);
  const [rows, setRows] = useState(data);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveModel = (modelData) => {
    const newModel = {
      ...modelData,
      id: `#${Math.floor(Math.random() * 10000000)}`, // Generate a random ID
      createdOn: new Date().toLocaleDateString(),
      lastTrainedOn: new Date().toLocaleDateString(),
      status: "Active",
    };
    setRows([...rows, newModel]);
    handleCloseModal();
  };

  return (
    <div className="flex">
      {/* Collapsible Drawer Menu */}
      <DrawerMenu />

      <div className="flex flex-col flex-grow bg-[#f8fafc]">
        {/* Navigation Bar */}
        <NavigationBar />

        {/* Content Area */}
        <div className="p-6 m-8 bg-[#fff]">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold">Model Library</h1>
            <button className="rounded-lg bg-[#4f46e5] p-4 text-white" onClick={handleOpenModal}>
              + Create New Model
            </button>
          </div>
          {/* <ModelBuilderTable rows={[...rows]} /> */}
          <ModelBuildTable rows={[...rows]} />
        </div>
      </div>

      {isModalOpen && <CreateModelModal onClose={handleCloseModal} onSave={handleSaveModel} />}
    </div>
  );
};

export default App;
