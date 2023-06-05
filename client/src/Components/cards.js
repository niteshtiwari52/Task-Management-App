import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  deleteTask,
  getTask,
  updateTask,
  updateTaskStatus,
} from "../Redux/Reducer/Task/task.action";

const Cards = () => {
  const dispatch = useDispatch();
  const [taskStatus, setTaskStatus] = useState(false);
  const [allTask, setAllTask] = useState([]);
  const [updatingTaskId, setUpdatingTaskId] = useState();
  const result = useSelector((globalState) => globalState.task.data);

  let [isOpen, setIsOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (e) => {
    setTaskData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    // console.log(taskData);

    await dispatch(updateTask(taskData, updatingTaskId));
    await dispatch(getTask());
    closeModal();
    setTaskData({
      title: "",
      category: "",
      description: "",
    });
  };

  useEffect(() => {
    if (result) {
      setAllTask(result);
    }
    // console.log(allTask);
  }, [result]);

  const handleDeleteTask = async (taskId) => {
    // console.log(taskId);
    await dispatch(deleteTask(taskId));
    await dispatch(getTask());
  };
  const handleEditTask = async (taskData) => {
    openModal();
    setUpdatingTaskId(taskData._id);
    setTaskData({
      title: taskData.title,
      category: taskData.category,
      description: taskData.description,
    });
    // console.log(taskData);
    // await dispatch(updateTask(taskData));
  };

  const markAsComplete = (id) => {
    // console.log(id, "completede");

    const data = {
      isCompleted: true,
    };
    dispatch(updateTaskStatus(data, id));
  };

  return (
    <>
      {allTask ? (
        <>
          {allTask.map((item) => (
            <>
              <div key={item._id} className="w-full p-4 md:w-1/2 lg:w-1/3">
                <div className="w-full h-full bg-white rounded-2xl drop-shadow-md ">
                  <div
                    className={`w-full p-4 h-72 md:h-56 lg:h-48 rounded-t-2xl bg-blue-100`}
                  >
                    <img
                      // src="https://flowbite.com/docs/images/blog/image-1.jpg"
                      src="https://todomytasks.netlify.app/images/defult%20task%20image.png"
                      alt="taskimage"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="p-3 flex flex-col gap-2">
                    <div className="flex mt-2 items-center gap-3">
                      {/* <div className="w-4 h-4">
                        <img
                          src="https://i.pinimg.com/736x/e4/1f/f3/e41ff3b10a26b097602560180fb91a62.jpg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>
        
                      <span className="text-gray-400">15</span> */}
                      <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                        {item.category}
                      </span>
                      {item.isCompleted === true ? (
                        <>
                          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                            Completed
                          </span>
                        </>
                      ) : (
                        <>
                          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            Pending
                          </span>
                        </>
                      )}

                      {/* <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        {item.category}
                      </span> */}
                    </div>
                    <h3 className="text-xl font-bold text-gray-400">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light text-gray-600">
                      {item.description}
                    </p>
                    <div className="mt-4">
                      <hr />
                    </div>
                    {/* <div>
                      <span className="flex gap-2 items-center">
                        <s className="text-gray-400 font-light">₹600</s>
                        <strong>₹320</strong>
                      </span>
                      <p className="text-gray-400 font-light">
                        Month Pack - 30 Capsules
                      </p>
                    </div> */}
                    <div className="flex justify-center gap-3 md:order-2">
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-00 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleEditTask(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => handleDeleteTask(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="text-white bg-purple-700 hover:bg-purple-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => markAsComplete(item._id)}
                      >
                        Mark as completed
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        ""
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Updating Task
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="mb-6">
                      <label
                        for="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. Coding "
                        required
                        name="title"
                        value={taskData.title}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        for="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="e.g. programming"
                        name="category"
                        value={taskData.category}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        for="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter details about your Task"
                        name="description"
                        value={taskData.description}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button
                      // type="submit"
                      onClick={handleSubmit}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Update Task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Cards;
