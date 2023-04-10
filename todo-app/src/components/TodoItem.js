import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
  key,
}) => {
  return (
    <div className="px-2 py-1 mb-2 flex items-center justify-between shadow-md shadow-gray-400">
      <div className="px-2">
        <h1 className=" font-bold text-xl">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="flex justify-between items-center gap-2 ">
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
          className="w-6 h-6 accent-[#20354b]"
        />
        <button
          className="rounded bg-[#20354b] px-2 py-1 text-md text-center font-semibold text-white hover:text-red-600 hover:bg-white hover:border hover:border-red-600 "
          onClick={() => deleteHandler(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
