import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteTaskAsync, updateTaskAsync } from "../ReduxStore/taskSlice";

function Task({ handleEdit, task}) {
  const [openDetails, setOpenDetails] = useState(false);
  const [ratingInfo, setRatingInfo] = useState({});

  const dispatch = useDispatch();

  const handleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const getRatingInfo = (rating) => {
    if (rating === 0) {
      setRatingInfo({ color: "yellow", title: "Low" });
      return;
    } else if (rating === 1) {
      setRatingInfo({ color: "orange", title: "Medium" });
      return;
    }

    setRatingInfo({ color: "red", title: "High" });
  };

  useEffect(() => {
    getRatingInfo(task.rating);
  }, [task]);


  const handleDelete = () => {
    dispatch(deleteTaskAsync(task.id));
  };

  return (
    <div
      className="flex w-[90%]  bg-blue-300 p-3 rounded-lg justify-center m-1 cursor-pointer flex-col relative"
      onClick={handleDetails}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          name={task.taskName}
          id={task.id}
          className="m-2"
        />
        <p>{task.taskName}</p>
      </div>

      <div className={`${openDetails ? "flex ml-7 flex-col" : "hidden"}`}>
        <div className="flex">
          <MdModeEdit className="h-5 w-5 m-1" onClick={()=>handleEdit(task)} />
          <IoMdTrash className="h-5 w-5 m-1" onClick={handleDelete} />
          <div
            className={"flex rounded-lg p-1"}
            style={{ background: ratingInfo.color }}
          >
            {ratingInfo.title}
          </div>
        </div>
        <div className="flex">{task.taskDetails}</div>
      </div>
    </div>
  );
}

export default Task;
