import React, { useState, useEffect } from "react";
import {} from "../index.css";
import { db } from "../googleSignin/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Table from "../components/Table.js";
import Heart from "react-animated-heart";

function Home() {
  const allowedUsers = ["andreimuntean0795@gmail.com", "munteanadrianalaura@gmail.com"];
  const [selectedValueSys, setSelectedValueSys] = useState(120);
  const [selectedValueDia, setSelectedValueDia] = useState(80);
  const [selectedValuePulse, setSelectedValuePulse] = useState(65);
  const [selectedValueType, setSelectedValueType] = useState("Aparat");
  const [measures, setMeasures] = useState([]);
  const [isClick, setClick] = useState(false);
  const [isWaiting, setWaiting] = useState(false);

  const fetchMeasures = async () => {
    await getDocs(collection(db, "masuratori")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, creation_date: new Date(doc.data()["createdAt"]["seconds"] * 1000) }));
      setMeasures(newData);
    });
  };
  const checkAllowedUsers = () => {
    return allowedUsers.includes(localStorage.getItem("email"));
  };
  useEffect(() => {
    checkAllowedUsers();
    fetchMeasures();
  });

  measures.sort((a, b) => b.creation_date - a.creation_date);

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
    fetchMeasures();
    setWaiting(true);
  };

  const types = ["Aparat", "Ceas"];

  return checkAllowedUsers() ? (
    <div class>
      <div className=" flex items-center justify-center bg-slate-600 text-white">
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
        <h2>
          <b className="font-bold text-xl text-green-200 italic">{localStorage.getItem("displayName")}</b>
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center py-20 px-20 space-y-10 md:space-y-0 md:flex-row md:space-x-20">
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <h2 className="block text-white font-normal text-xl dark:text-white pr-3">Sys</h2>
          <select
            className="shadow-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueSys}
            onChange={handleChangeSys}
          >
            <option value="120">120</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
          <h2 className="font-normal text-xl text-white dark:text-white pr-3 ">Dia</h2>
          <select
            className=" bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedValueDia}
            onChange={handleChangeDia}
          >
            <option value="80">80</option>
            {numberOptions}
          </select>
        </div>
        <div className="flex items-center shadow-2xl p-3 rounded-md w-full bg-slate-500 md:w-1/4">
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
        <div>
          <button onClick={addValues} class="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded" disabled={isWaiting === true ? true : false}>
            Adauga
          </button>
        </div>
      </div>
      <div className="p-2">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold dark:text-white py-5 px-5 bg-gray-700 text-white">Aparat</h1>
          <Table data={measures} filter="Aparat" />
        </div>
        <div className="w-full py-5">
          <h1 className="text-4xl font-extrabold dark:text-white py-5 px-5 bg-gray-700  text-white">Ceas</h1>
          <Table data={measures} filter="Ceas" />
        </div>
      </div>
    </div>
  ) : (
    <h1>Unauthorized</h1>
  );
}

export default Home;
