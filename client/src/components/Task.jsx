import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../ReduxStore/taskSlice";
import { motion } from "framer-motion";

function Task({ handleEdit, task, index }) {
  const [openDetails, setOpenDetails] = useState(false);
  const [ratingInfo, setRatingInfo] = useState({});

  const dispatch = useDispatch();

  const handleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const getRatingInfo = (rating) => {
    if (rating === 0) {
      setRatingInfo({ color: "#eff7097f", title: "Low" });
      return;
    } else if (rating === 1) {
      setRatingInfo({ color: "#ff6600a1", title: "Medium" });
      return;
    } else {
      setRatingInfo({ color: "#ff000094", title: "High" });
    }
  };

  useEffect(() => {
    getRatingInfo(task.rating);
  }, [task]);

  const handleDelete = () => {
    dispatch(deleteTaskAsync(task.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        duration: 1,
        delay: index * 0.05,
      }}
      className="flex w-[90%]  bg-[#1f1f1f] p-3 rounded-lg justify-center cursor-pointer flex-col relative"
      onClick={handleDetails}
    >
      <div className="flex items-center mb-2">
        <input
          type="checkbox"
          name={task.taskName}
          id={task.id}
          className="m-2"
        />
        <p>{task.taskName}</p>
      </div>

      <div
        className={`${
          openDetails ? "flex ml-7 flex-col" : "hidden"
        } transition-all duration-1000 ease-in`}
      >
        {task.taskDetails.length ? (
          <div
            className={`flex w-full h-max p-1 rounded-sm ${"border-[1px] border-[#000000] p-2 overflow-auto"}`}
          >
            {task.taskDetails}
          </div>
        ) : (
          <div className="text-[#5c5c5c]">No details available</div>
        )}

        <div className="flex mt-3 w-full justify-between">
          <div className="flex">
            {
              task.createdAt
            }
          </div>
          <div className="flex gap-3">
            <div
              className="flex items-center border-[1px] border-[#3c3c3c] p-[7px] rounded-md hover:scale-105"
              onClick={() => handleEdit(task)}
            >
              <MdModeEdit className="h-4 w-4" />
            </div>
            <div className="flex items-center border-[1px] border-[#3c3c3c] p-[7px] rounded-md bg-[#d71111cd] hover:scale-105">
              <IoMdTrash className="h-4 w-4" onClick={handleDelete} />
            </div>
            <div
              className={
                "flex rounded-md p-[2px] w-[70px] items-center justify-center text-[12.5px]"
              }
              style={{ background: ratingInfo.color }}
            >
              {ratingInfo.title}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Task;
