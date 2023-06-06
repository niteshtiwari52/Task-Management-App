import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import TaskForm from "./TaskForm";
import Cards from "./cards";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../Redux/Reducer/Task/task.action";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const result = useSelector((globalState) => globalState.task.data);
  // console.log(result);

  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // console.log(result, result.length);
    if (result === undefined) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [result]);

  function closeModal() {
    setIsOpen(false);
    // setIsOpen(true);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Navbar />
      <div className=" flex flex-wrap mt-20">
        {result ? (
          <Cards />
        ) : (
          <>
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
                          Information
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            There is no task. Create new Task by clicking the
                            button.
                          </p>
                        </div>

                        <div className="mt-4">
                          <button
                            type="button"
                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={closeModal}
                          >
                            close
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
