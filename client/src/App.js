import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import { useDispatch } from "react-redux";
import { getTask } from "./Redux/Reducer/Task/task.action";
import { useEffect, useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [dataFetch, setDataFetch] = useState(false);

  // useEffect(() => {
  //   dispatch(getTask());
  //   setDataFetch(true);
  // }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
