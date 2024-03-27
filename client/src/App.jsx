import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import {
  addTaskAsync,
  getAllTasksAsync,
  getSortedTasksAsync,
  selectAllTasks,
  selectStatus,
  updateTaskAsync,
} from "./ReduxStore/taskSlice";
import Task from "./components/Task";
import { MdClose } from "react-icons/md";

function App() {
  const [taskForm, setTaskForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState("");

  const formRef = useRef(null);

  const dispatch = useDispatch(); // from redux
  let tasks = useSelector(selectAllTasks);
  let status = useSelector(selectStatus);

  const handleAddNewTaskForm = () => {
    setTaskForm(!taskForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // NOTIFICATION
    e.target.rating.value.length == 0;

    if (e.target.task.value.length == 0) {
      toast("Task cannot be empty!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    if (e.target.rating.value.length == 0) {
      toast("Select a suitable task rating", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    let taskData = {
      taskName: e.target.task.value,
      taskDetails: e.target.taskDetails.value,
      rating: e.target.rating.value,
      status: "InComplete",
    };

    if (!editMode) {
      dispatch(addTaskAsync(taskData));

      // NOTIFICATION
      toast("New task added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      dispatch(updateTaskAsync({ ...taskData, taskId: editedTaskId }));

      // NOTIFICATION
      toast("Task Updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setEditMode(false);
    }
    // RESET FORM
    e.target.reset();
    setTaskForm(false)
  };

  const handleEdit = (task) => {
    setEditMode(true);
    handleAddNewTaskForm();
    formRef.current.task.value = task.taskName;
    formRef.current.taskDetails.value = task.taskDetails;
    const ratingRadios = document.getElementsByName("rating");
    ratingRadios.forEach((radio) => {
      if (radio.value === task.rating.toString()) {
        radio.checked = true;
      }
    });
    setEditedTaskId(task.id);
  };

  const handleSort = () => {
    // dispatch(sortTasks());
    dispatch(getSortedTasksAsync());
  };

  useEffect(() => {
    // CALLING GET-ALL-TASK API
    dispatch(getAllTasksAsync());

    console.log("getting all tasks...");
  }, [dispatch]);

  return (
    <div className="main flex  justify-center h-[100vh]  overflow-auto lg:text-[16px] text-[13px]">
      <ToastContainer />
      <div className="flex lg:w-[50vw] w-[80vw] h-[80vh] flex-col rounded-md border-[#232323] border-2  mt-[30px]">
        <div className="flex bg-[#1f1f1f] rounded-tl rounded-tr w-full h-[10%] justify-between">
          <div
            className=" w-16 m-1 flex items-center justify-center cursor-pointer text-[#868686] hover:text-white"
            onClick={handleAddNewTaskForm}
          >
            Add
          </div>
          <div
            className=" w-16 m-1 flex items-center justify-center cursor-pointer  text-[#868686] hover:text-white"
            onClick={handleSort}
          >
            Sort
          </div>
        </div>
        <div className="flex  w-full h-full flex-col gap-2 items-center overflow-auto custom-scrollbar pt-4">
          {status === "idle" ? (
            tasks.length > 0 ? (
              tasks?.map((task, index) => (
                <Task
                  handleEdit={handleEdit}
                  task={task}
                  key={index}
                  index={index}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <div className="flex"> No tasks</div>
              </div>
            )
          ) : (
            <div className="flex w-full items-center h-full justify-center">
              <div className=" h-[50px] w-[50px] rounded-full flex items-center justify-center animate-spin border-t-[5px]  border-t-[#1f1f1f] border-[5px] border-hite-400"></div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`flex  opacity-100 absolute z-10 w-[100vw]  transition-all duration-300 ease-in-out 
         ${
           taskForm
             ? "scale-80 top-[50px] opacity-100 "
             : "scale-0 top-[-350px]  opacity-0 "
         }`}
      >
        <div className="flex relative justify-center w-[100%] ">
          <div
            className="bg-[#1f1f1f] border-[#303030] border-[1px]  rounded-md flex flex-col gap-2 p-2 overflow-auto custom-scrollbar lg:w-[30%] h-max w-9/12"
            id="form"
          >
            <div className="flex w-full h-10 justify-end" id="form">
              <div
                className="flex m-2 rounded-full  w-5 h-5 items-center justify-center cursor-pointer"
                onClick={handleAddNewTaskForm}
              >
                <MdClose />
              </div>
            </div>
            <form
              ref={formRef}
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4 m-5"
            >
              <div className="flex flex-col gap-2 w-full">
                <label>Task</label>
                <input
                  type="text"
                  className="outline-none bg-[#1f1f1f] border-black border-[1px] rounded-sm h-10 p-2"
                  id="task"
                />
              </div>

              <div className="flex flex-col gap-4 items-start">
                <div className="flex flex-col gap-2 w-full">
                  <label>Task Details</label>
                  <textarea
                    type="text"
                    className="outline-none custom-scrollbar bg-[#1f1f1f] border-black border-[1px] rounded-sm h-[70px] p-2"
                    id="taskDetails"
                  />
                </div>

                <div className="flex">
                  <div className="flex flex-col">
                    <label>Task Priority</label>
                    <div className="flex gap-4 mt-1">
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          name="rating"
                          id="rating1"
                          value="0"
                        />
                        <label> Low </label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          name="rating"
                          id="rating2"
                          value="1"
                        />
                        <label> Medium </label>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="radio"
                          name="rating"
                          id="rating3"
                          value="2"
                        />
                        <label> High </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="border-[1px] border-[#4d4d4d] mt-[30px] p-3 rounded-md hover:bg-[#1a1a1a] scale-[90%]"
                >
                  {editMode ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
