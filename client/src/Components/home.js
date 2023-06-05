import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import Cards from "./cards";
import { useDispatch } from "react-redux";
import { getTask } from "../Redux/Reducer/Task/task.action";

const Home = () => {
  const dispatch = useDispatch();
  const [dataFetch, setDataFetch] = useState(false);

  useEffect(() => {
    dispatch(getTask());
    setDataFetch(true);
  }, []);
  return (
    <>
      <Navbar />
      <div className=" flex flex-wrap mt-20">{dataFetch ? <Cards /> : ""}</div>
    </>
  );
};

export default Home;
