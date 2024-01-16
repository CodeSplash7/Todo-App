// dependencies
import { useState } from "react";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

// types
import { CloseTaskForm } from "../App";
import { CreateNewTask } from "../App";

type TaskFormProps = {
  createNewTask: CreateNewTask;
  taskFormIsOpen: boolean;
  closeModal: CloseTaskForm;
};

export default ({
  createNewTask,
  taskFormIsOpen,
  closeModal
}: TaskFormProps) => {
  let [title, setTitle] = useState<string>("");
  let [labelId, setLabelId] = useState<number>(0);
  let [creationDate, setCreationDate] = useState<string>("");
  let [dueDate, setDueDate] = useState<string>("");
  let [description, setDescription] = useState<string>("");

  return (
    <ReactModal
      isOpen={taskFormIsOpen}
      closeTimeoutMS={1000}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0)"
        },
        content: {
          background: "rgba(0,0,0,0.4)",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 2000ms ease-in-out"
        }
      }}
    >
      {/* Form Container */}
      <div className="bg-slate-600 flex flex-col rounded-xl w-1/2 h-fit px-[50px] py-[30px] gap-[10px]">
        {/* Row 1 - title and label*/}
        <div className="flex gap-[30px]">
          {/* Title */}
          <div className="w-[100%] flex flex-col">
            <label htmlFor="title-input">Title: </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              type="text"
              id="title-input"
            />
          </div>
          {/* Label */}
          <div className="w-[100%] flex flex-col">
            <label htmlFor="label-input">Label:</label>
            <select
              value={labelId}
              onChange={(e) => setLabelId(Number(e.target.value))}
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              id="label-input"
            >
              <option>ex. lableName1</option>
            </select>
          </div>
        </div>
        {/* Row 2 - creation and due date*/}
        <div className="flex gap-[30px]">
          {/* Creation date */}
          <div className="w-[100%] flex flex-col">
            <label htmlFor="creation-input">Creation Date:</label>
            <input
              value={creationDate}
              type="datetime-local"
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              readOnly
            />
          </div>
          {/* Due Date */}
          <div className="w-[100%] flex flex-col">
            <label htmlFor="due-input">Due Date: </label>
            <input
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              type="datetime-local"
              id="due-input"
            />
          </div>
        </div>
        {/* Row 3 - description*/}
        <div className="flex flex-col w-[100%]">
          <label htmlFor="description-input">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
            id="description-input"
          ></textarea>
        </div>
        {/* Row 4 - decisive buttons */}
        <div className="flex justify-between gap-[40px] w-full">
          {/* Save -> to the server */}
          <button
            onClick={() => {
              createNewTask({
                id: 0,
                title,
                labelId,
                status: "active",
                creationDate,
                dueDate,
                description
              });
              closeModal();
            }}
            className="bg-green-500 px-[10px] py-[5px] rounded hover:bg-green-600 duration-200 transition"
          >
            Save
          </button>
          {/* Cancel -> exit the form without saving anything*/}
          <button
            className="bg-gray-700 px-[10px] py-[5px] rounded hover:bg-gray-800 duration-200 transition"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
