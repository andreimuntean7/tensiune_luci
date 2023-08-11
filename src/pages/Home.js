import React, { useState, useEffect } from "react";
import {} from "../index.css";
import { db } from "../googleSignin/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Popup from "reactjs-popup";

function Home() {
  const [selectedValueSys, setSelectedValueSys] = useState(120);
  const [selectedValueDia, setSelectedValueDia] = useState(80);
  const [selectedValuePulse, setSelectedValuePulse] = useState(65);
  const [selectedValueType, setSelectedValueType] = useState("Aparat");
  const [measures, setMeasures] = useState([]);

  const fetchMeasures = async () => {
    await getDocs(collection(db, "masuratori")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, creation_date: new Date(doc.data()["createdAt"]["seconds"] * 1000) }));
      setMeasures(newData);
    });
  };
  useEffect(() => {
    fetchMeasures();
  }, []);

  measures.sort((a, b) => a.creation_date - b.creation_date);
  console.log(measures);

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
  for (let i = 1; i <= 200; i++) {
    numberOptions.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  const addValues = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "masuratori"), {
      createdAt: new Date(),
      createdBy: localStorage.getItem("email"),
      sys: selectedValueSys,
      dia: selectedValueDia,
      pulse: selectedValuePulse,
      type: selectedValueType,
    });
    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
    </Popup>;
  };

  const types = ["Aparat", "Ceas"];

  return (
    <div class="bg-gradient-to-r from-red-500">
      <div className="flex flex-col justify-center items-center py-20 px-20 space-y-10 md:space-y-0 md:flex-row md:space-x-20">
        <div className="flex items-center shadow-lg rounded-lg p-3.5 w-full bg-blue-400 md:w-1/4">
          <h2 className="block text-white font-normal text-xl dark:text-white pr-3">Sys</h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueSys}
            onChange={handleChangeSys}
          >
            <option value="120">120</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-lg rounded-lg p-3.5 w-full bg-green-400 w-1/3  md:w-1/4">
          <h2 className="block font-normal text-xl text-gray-900 dark:text-white pr-3">Dia</h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueDia}
            onChange={handleChangeDia}
          >
            <option value="80">80</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-lg rounded-lg w-full p-3.5 bg-red-500 w-1/3  md:w-1/4">
          <h2 className="block text-white font-normal text-xl dark:text-white pr-3">Pulse</h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValuePulse}
            onChange={handleChangePulse}
          >
            <option value="65">65</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-lg rounded-lg w-full p-3.5 bg-orange-300 w-1/3  md:w-1/4">
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
        <div>
          <button onClick={addValues} class="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded">
            Adauga
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1>grafice</h1>
        <h1>grafice</h1>
      </div>
    </div>
  );
}

export default Home;
