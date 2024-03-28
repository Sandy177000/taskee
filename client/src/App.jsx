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
import ChibiMe from "./assets/chibiME.png";

function App() {
  const [taskForm, setTaskForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState("");
  const [completedTask, setCompletedTask] = useState([]);

  const [completedTaskVisible, setCompletedTaskVisible] = useState(false);
  const [validUser, setValidUser] = useState(false);

  const formRef = useRef(null);

  const dispatch = useDispatch(); // from redux
  let tasks = useSelector(selectAllTasks);
  let status = useSelector(selectStatus);


  const handleAddNewTaskForm = () => {
    setTaskForm(!taskForm);
    if (editMode) {
      setEditMode(false);
      formRef.current.reset();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // NOTIFICATION
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
      dueDate: e.target.date.value,
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
    setTaskForm(false);
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

  const handleAuth = (e) => {
    (e.target.value);

    if (e.target.value === "qwerty") {
      setValidUser(true);
    }
  };

  useEffect(() => {
    // CALLING GET-ALL-TASK API
    dispatch(getAllTasksAsync());
    ("getting all tasks...");
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      let arr = tasks.filter((task) => task.status === "Complete");
      setCompletedTask(arr);
    }
  }, [tasks]);

  return (
    <>
      {validUser ? (
        <div className="main flex gap-3 justify-center items-center  h-[90vh]  overflow-y-auto  lg:text-[16px] text-[13px]">
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
                className="m-1 flex items-center justify-center cursor-pointer text-[#868686] hover:text-white"
                onClick={() => setCompletedTaskVisible(!completedTaskVisible)}
              >
                Completed Tasks
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
            className={`flex  opacity-100 absolute z-10 w-[98vw]  transition-all duration-300 ease-in-out left-3
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

                  <div className="flex flex-col gap-2 w-full">
                    <label>Task Details</label>
                    <textarea
                      type="text"
                      className="outline-none custom-scrollbar bg-[#1f1f1f] border-black border-[1px] rounded-sm h-[70px] p-2"
                      id="taskDetails"
                    />
                  </div>

                  <div className="flex justify-between flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                      <label>Due Date</label>
                      <input
                        type="date"
                        name=""
                        id="date"
                        className="outline-none bg-[#1f1f1f] border-black border-[1px] rounded-sm h-6 p-2 w-[200px]"
                      />
                    </div>

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

          <div
            className={`flex  opacity-100 absolute z-10 w-[98vw]  transition-all duration-300 ease-in-out left-3
        ${
          completedTaskVisible
            ? "scale-80 top-[100px] opacity-100 "
            : "scale-0 top-[-350px]  opacity-0 "
        }`}
          >
            <div className="flex  relative justify-center w-[100%] ">
              <div className="bg-[#1f1f1f] border-[#303030] border-[1px]  rounded-md flex flex-col gap-2 p-2 overflow-auto custom-scrollbar lg:w-[30%] h-[28rem] w-9/12">
                <div className="flex w-full h-10 flex-col">
                  <div className="flex justify-between">
                    <p className="p-2">Completed Tasks</p>
                    <div
                      className="flex m-2 rounded-full  w-5 h-5 items-center justify-center cursor-pointer"
                      onClick={() => setCompletedTaskVisible(false)}
                    >
                      <MdClose />
                    </div>
                  </div>

                  <div className="flex  w-full h-full flex-col gap-2 items-center  pt-4">
                    {status === "idle" ? (
                      completedTask.length > 0 ? (
                        completedTask?.map((task, index) => (
                          <Task
                            handleEdit={handleEdit}
                            task={task}
                            key={index}
                            index={index}
                          />
                        ))
                      ) : (
                        <div className="flex w-full h-full items-center justify-center">
                          <div className="flex"> No completed Task</div>
                        </div>
                      )
                    ) : (
                      <div className="flex w-full items-center h-full justify-center">
                        <div className=" h-[50px] w-[50px] rounded-full flex items-center justify-center animate-spin border-t-[5px]  border-t-[#1f1f1f] border-[5px] border-hite-400"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex overflow-hidden   items-center justify-center">
          <div
            className={`flex absolute z-10 w-[98vw]  transition-all duration-300 ease-in-out left-3 scale-80 top-[150px] opacity-100 `}
          >
            <div className="flex  relative justify-center w-[100%] ">
              <div className="bg-[#1f1f1f] border-[#303030] border-[1px] flex-col gap-7  rounded-md  flex items-center justify-center lg:w-[30%] h-[25rem] ">
                <p>Welcome to Taskee</p>
                <img
                  src={ChibiMe}
                  alt=""
                  className="w-[9rem] h-[9rem] bouncer "
                />

                <input
                  type="password"
                  onChange={(e) => handleAuth(e)}
                  className="outline-none bg-[#1a1a1a] border-black border-[1px] rounded-[36px] h-10 p-2 ml-4 mr-4 w-60"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
