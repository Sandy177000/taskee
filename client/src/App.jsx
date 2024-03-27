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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    if (e.target.rating.value.length == 0) {
      toast("Select a suitable task rating", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
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
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    else{

      dispatch(updateTaskAsync({ ...taskData, taskId: editedTaskId }));

      // NOTIFICATION
      toast("Task Updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
    // RESET FORM
    e.target.reset();
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

  
  const handleSort = ()=>{
    // dispatch(sortTasks());
    dispatch(getSortedTasksAsync())
  }

  
  useEffect(() => {
    // CALLING GET-ALL-TASK API
    dispatch(getAllTasksAsync());

    console.log("getting all tasks...");
  }, [dispatch]);

  return (
    <div className="main flex items-center justify-center h-[100vh]">
      <ToastContainer />
      <div className="flex w-[70vw] h-[70vh] flex-col">
        <div className="flex bg-blue-400 w-full h-[10%] justify-between">
          <div
            className="bg-white w-16 m-1 flex items-center justify-center cursor-pointer"
            onClick={handleAddNewTaskForm}
          >
            Add
          </div>
          <div
            className="bg-white w-16 m-1 flex items-center justify-center cursor-pointer"
            onClick={handleSort}
          >
            Sort
          </div>
        </div>
        <div className="flex bg-blue-500 w-full h-full flex-col gap-2 items-center">
          {tasks.length > 0 ? (
            tasks?.map((task) => <Task handleEdit={handleEdit} task={task} />)
          ) : (
            <>
              <div className="loader h-20 w-20"></div>
            </>
          )}
        </div>
      </div>

      <div
        className={`flex  opacity-80 absolute z-10 w-[100vw] h-[100vh] transition-all duration-500 ease-in-out ${
          taskForm ? "left-0" : "left-[-5000px]"
        }`}
      >
        <div className="flex relative bg-yellow-200 justify-center">
          <div
            className=" bg-red-500 flex flex-col gap-2 p-2 overflow-auto"
            id="form"
          >
            <div
              className="flex w-full bg-green-200 h-10 justify-end"
              id="form"
            >
              <div
                className="flex m-2 rounded-full bg-white w-5 h-5 items-center justify-center cursor-pointer"
                onClick={handleAddNewTaskForm}
              >
                <MdClose />
              </div>
            </div>
            <form
              ref={formRef}
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col mt-[80%] gap-4 m-5"
            >
              <label>Task</label>
              <input type="text" className="outline-none" id="task" />
              <label>Task Details</label>
              <textarea type="text" className="outline-none" id="taskDetails" />

              <label>Task rating</label>
              <div className="flex gap-2">
                <input type="radio" name="rating" id="rating1" value="0" />
                <label> Low </label>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="rating" id="rating2" value="1" />
                <label> Medium </label>
              </div>
              <div className="flex gap-2">
                <input type="radio" name="rating" id="rating3" value="2" />
                <label> High </label>
              </div>
              <button type="submit" className="border mt-[30px]">
                {editMode ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
