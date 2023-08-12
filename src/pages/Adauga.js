import React, { useState } from "react";
import {} from "../index.css";
import { db } from "../googleSignin/config";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Adauga() {
  const [selectedValueSys, setSelectedValueSys] = useState(120);
  const [selectedValueDia, setSelectedValueDia] = useState(80);
  const [selectedValuePulse, setSelectedValuePulse] = useState(65);
  const [selectedValueType, setSelectedValueType] = useState("Aparat");

  const handleChangeSys = (event) => {
    setSelectedValueSys(event.target.value);
  };
  const handleChangeDia = (event) => {
    setSelectedValueDia(event.target.value);
  };
  const handleChangePulse = (event) => {
    setSelectedValuePulse(event.target.value);
  };
  const handleChangeType = (event) => {
    setSelectedValueType(event.target.value);
  };

  const numberOptions = [];
  for (let i = 40; i <= 200; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const navigate = useNavigate();

  const addValues = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "masuratori"), {
      createdAt: new Date(),
      createdBy: localStorage.getItem("email"),
      sys: selectedValueSys,
      dia: selectedValueDia,
      pulse: selectedValuePulse,
      type: selectedValueType,
    });
    navigate("/home", { replace: true });
  };

  const types = ["Aparat", "Ceas"];

  return (
    <div className="gap-10 h-screen flex flex-col ">
      <div className="flex items-center bg-gray-700 text-white">
        <svg
          onClick={() => {
            navigate("/home", { replace: true });
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <h1 className="text-2xl font-extrabold dark:text-white py-5 w-full items-center text-center ">Adauga valoare noua</h1>
      </div>
      <div className="flex flex-col items-center gap-3 w-full px-10">
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <h2 className="block text-white font-normal text-xl dark:text-white pr-3 w-1/3">Sys</h2>
          <select
            className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueSys}
            onChange={handleChangeSys}
          >
            <option value="">120</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <h2 className="font-normal text-xl text-white dark:text-white pr-3 w-1/3">Dia</h2>
          <select
            className=" bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueDia}
            onChange={handleChangeDia}
          >
            <option value="">80</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <h2 className="block text-white font-normal text-xl dark:text-white pr-3 w-1/3">Pulse</h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ocus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValuePulse}
            onChange={handleChangePulse}
          >
            <option value="">65</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueType}
            onChange={handleChangeType}
          >
            {types.map(function (object, i) {
              return (
                <option key={i} value={object}>
                  {object}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div class="w-full p-10">
        <button onClick={addValues} class="w-full bg-gray-700 hover:bg-gray-900 text-white font-bold py-5 rounded">
          Adauga
        </button>
      </div>
    </div>
  );
}

export default Adauga;
