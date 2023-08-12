import React, { useState, useEffect } from "react";
import {} from "../index.css";
import { db } from "../googleSignin/config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Table from "../components/Table.js";
import Heart from "react-animated-heart";
import { useNavigate } from "react-router-dom";

function Home() {
  const allowedUsers = ["andreimuntean0795@gmail.com", "munteanadrianalaura@gmail.com"];
  const [measures, setMeasures] = useState([]);
  const [isClick, setClick] = useState(false);
  const navigate = useNavigate();

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
  }, []);

  measures.sort((a, b) => b.creation_date - a.creation_date);

  return checkAllowedUsers() ? (
    <div class>
      <div className=" flex items-center justify-left bg-slate-600 text-white">
        <Heart isClick={isClick} onClick={() => setClick(!isClick)} />
        <h2>
          Salut,
          <b className="font-bold text-xl text-green-200 italic">{localStorage.getItem("displayName")}</b>
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center px-2 py-5 space-y-10 md:space-y-0 md:flex-row md:space-x-20">
        <button
          onClick={() => {
            navigate("/addValue", { replace: true });
          }}
          className="bg-gray-700 hover:bg-gray-900  text-white font-bold py-2 px-4 rounded w-full"
        >
          Adauga Tensiune
        </button>
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
