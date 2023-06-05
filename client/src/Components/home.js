import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import Cards from "./cards";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../Redux/Reducer/Task/task.action";

const Home = () => {
  const dispatch = useDispatch();
  const [dataFetch, setDataFetch] = useState(false);
  const result = useSelector((globalState) => globalState.task.data);
  useEffect(() => {
    if (result) {
      setDataFetch(true);
    }
  }, [result]);
  return (
    <>
      <Navbar />
      <div className=" flex flex-wrap mt-20">
        {dataFetch ? <Cards /> : <Message />}
      </div>
    </>
  );
};

export default Home;
