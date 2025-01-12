import React, { useEffect, useState } from "react";

// const ModelBuilderTable = () => {
//   let modelDataList = [
//     {
//       name: "Blonde drizzle",
//       type: "Extraction",
//       description: "Edit customer....",
//       createdAt: "29/02/2024",
//       lastTrainedOn: "29/02/2024",
//       status: "Active",
//     },
//   ];

//   return (
//     <>
//       <table class="table-auto">
//         <thead>
//           <tr>
//             <th>Model Name</th>
//             <th>Model Type</th>
//             <th>Description</th>
//             <th>Created On</th>
//             <th>Last Trained On</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {modelDataList.map((model, i) => (
//             <tr key={i}>
//               <td>{model.name}</td>
//               <td>{model.type}</td>
//               <td>{model.description}</td>
//               <td>{model.createdAt}</td>
//               <td>{model.lastTrainedOn}</td>
//               <td>{model.status}</td>
//               <td>
//                 <img src="" alt="menu" />
//               </td>
//               {/* <td>Model Name</td>
//             <td>Model Type</td>
//             <td>Description</td>
//             <td>Created On</td>
//             <td>Last Trained On</td>
//             <td>Status</td>
//             <td>Action</td> */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default ModelBuilderTable;

// export const ModelBuilderTable = ({rows}) => {

//   return (
//     <table className="table-auto w-full mt-6 bg-[#b8fafc]">
//       <thead>
//         {/* <tr className="bg-gray-100">
//           <th className="px-4 py-2">Model Name</th>
//           <th className="px-4 py-2">Model Type</th>
//           <th className="px-4 py-2">Description</th>
//           <th className="px-4 py-2">Created On</th>
//           <th className="px-4 py-2">Last Trained On</th>
//           <th className="px-4 py-2">Status</th>
//           <th className="px-4 py-2">Action</th>
//         </tr> */}
//         <tr className="bg-gray-100">
//           <th className="px-4 py-2 text-left">
//             Model Name <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2 text-left">
//             Model Type <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2 text-left">
//             Description <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2 text-left">
//             Created On <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2 text-left">
//             Last Trained On <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2 text-left">
//             Status <span className="ml-2 text-gray-500 cursor-pointer">⇅</span>
//           </th>
//           <th className="px-4 py-2">Action</th>
//         </tr>

//       </thead>
//       <tbody>
//         {rows.map((row, index) => (
//           <tr key={index} className="border-b text-center">
//             <td className="px-4 py-2">{row.name}</td>
//             <td className="px-4 py-2">{row.type}</td>
//             <td className="px-4 py-2">{row.description}</td>
//             <td className="px-4 py-2">{row.createdOn}</td>
//             <td className="px-4 py-2">{row.lastTrainedOn}</td>
//             <td>
//               <button className="px-8 py-1 bg-green-100 text-green-600">{row.status}</button>
//             </td>
//             <td>
//               <div className="cursor-pointer text-2xl py-2">&#8942;</div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

export const ModelBuilderTable = ({ rows }) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...sortedRows].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedRows(sortedData);
    setSortConfig({ key, direction });
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredRows = rows.filter(
      (row) => row.name.toLowerCase().includes(term) || row.type.toLowerCase().includes(term)
    );
    setSortedRows(filteredRows);
  };

  const handleDateFilter = () => {
    if (dateRange.start && dateRange.end) {
      const filteredRows = rows.filter((row) => {
        const createdDate = new Date(row.createdOn);
        return createdDate >= new Date(dateRange.start) && createdDate <= new Date(dateRange.end);
      });
      setSortedRows(filteredRows);
    }
  };

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by Name, ID"
          value={searchTerm}
          onChange={handleSearch}
          className="border px-4 py-2 w-1/3 rounded"
        />
        <button
          className="border px-4 py-2 rounded bg-gray-200 ml-2"
          onClick={() => alert("Filters button clicked")}
        >
          Filters
        </button>
        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="border px-4 py-2 rounded ml-2"
        />
        <input
          type="date"
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border px-4 py-2 rounded ml-2"
        />
        <button className="border px-4 py-2 rounded bg-gray-200 ml-2" onClick={handleDateFilter}>
          Apply Date Range
        </button>
      </div>
      <table className="table-auto w-full mt-6 ">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">
              Model Name
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2 text-left">
              Model Type
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("type")}
              >
                {sortConfig.key === "type" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2 text-left">
              Description
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("description")}
              >
                {sortConfig.key === "description"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2 text-left">
              Created On
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("createdOn")}
              >
                {sortConfig.key === "createdOn"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2 text-left">
              Last Trained On
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("lastTrainedOn")}
              >
                {sortConfig.key === "lastTrainedOn"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2 text-center">
              Status
              <span
                className="ml-2 text-gray-500 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "↑" : "↓") : "⇅"}
              </span>
            </th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, index) => (
            <tr key={index} className="border-b text-center">
              <td className="px-4 py-2 text-left">{row.name}</td>
              <td className="px-4 py-2 text-left">{row.type}</td>
              <td className="px-4 py-2 text-left">{row.description}</td>
              <td className="px-4 py-2 text-left">{row.createdOn}</td>
              <td className="px-4 py-2 text-left">{row.lastTrainedOn}</td>
              <td>
                <button className="px-8 py-1 bg-green-100 text-green-600 rounded-md">
                  {row.status}
                </button>
              </td>
              <td>
                <div className="cursor-pointer text-2xl py-2">&#8942;</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
