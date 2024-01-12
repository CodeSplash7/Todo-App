import { useState } from "react";
import ReactModal from "react-modal";

type TaskFromProps = {
  taskFormOpened: boolean;
  closeModal: () => void;
};

ReactModal.setAppElement("#root");
export default ({ taskFormOpened, closeModal }: TaskFromProps) => {
  return (
    <ReactModal
      isOpen={taskFormOpened}
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
      <div className="bg-slate-600 flex flex-col rounded-xl w-1/2 h-fit px-[50px] py-[30px] gap-[10px]">
        <div className="flex gap-[30px]">
          <div className="w-[100%] flex flex-col">
            <label htmlFor="title-input">Title: </label>
            <input
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              type="text"
              id="title-input"
            />
          </div>
          <div className="w-[100%] flex flex-col">
            <label htmlFor="label-input">Label:</label>
            <select
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              id="label-input"
            >
              <option>ex. lableName1</option>
            </select>
          </div>
        </div>
        <div className="flex gap-[30px]">
          <div className="w-[100%] flex flex-col">
            <label htmlFor="creation-input">Creation Date:</label>
            <input
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              readOnly
            />
          </div>
          <div className="w-[100%] flex flex-col">
            <label htmlFor="due-input">Due Date: </label>
            <input
              className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
              type="date"
              id="due-input"
            />
          </div>
        </div>
        <div className="flex flex-col w-[100%]">
          <label htmlFor="description-input">Description:</label>
          <textarea
            className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
            id="description-input"
          ></textarea>
        </div>
        <div className="flex gap-[40px] w-full">
          <button className="bg-green-500 px-[10px] py-[5px] rounded hover:bg-green-600 duration-200 transition">
            Save
          </button>
          <button
            className="bg-gray-700 px-[10px] py-[5px] rounded hover:bg-gray-800 duration-200 transition"
            onClick={() => closeModal()}
          >
            Cancel
          </button>
          <button className="bg-red-500 px-[10px] py-[5px] rounded ms-[auto] hover:bg-red-600 duration-200 transition">
            Delete
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
