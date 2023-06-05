import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

import { FaPencilAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

const DisplayTask = () => {
  const tasks = useLoaderData();
  const [allTasks, setAllTasks] = useState(tasks);

  const handleStatusChange = (newStatus, taskID) => {
    //console.log(status, taskID);
    fetch(`http://localhost:3000/tasks/${taskID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (taskID) => {
    fetch(`http://localhost:3000/tasks/${taskID}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "deleted");
        setAllTasks(allTasks.filter((task) => task._id !== taskID));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-auto w-11/12">
        {allTasks.map((task) => (
          <div key={task._id}>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">Title: {task.title}</h2>
                <p>Description: {task.description}</p>
                <p>
                  <label htmlFor="status">Status: </label>
                  <select
                    defaultValue={task.status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value, task._id)
                    }
                    name="status"
                    className="select select-bordered w-32 select-xs"
                  >
                    <option value="done">done</option>
                    <option value="ongoing">ongoing</option>
                  </select>
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-outline btn-xs"
                  >
                    <RiDeleteBin6Fill />
                    Delete
                  </button>
                  <Link to={`/updateTask/${task._id}`} state={task}>
                    <button className="btn btn-outline btn-xs">
                      <FaPencilAlt /> Update
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTask;