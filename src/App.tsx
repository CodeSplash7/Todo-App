import { useState } from "react";
import { useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import { RootState } from "./state/store";

function App() {
  const [taskFormOpened, setTaskFormOpened] = useState(false);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  return (
    <>
      {/* Task Form */}
      <TaskForm taskFormOpened={taskFormOpened} closeModal={closeTaskForm} />
      {/* Whole page */}
      <div className="px-[200px] pt-[100px] flex flex-col items-center gap-[20px]">
        {/* Header */}
        <div className="flex gap-[10px] items-center">
          {/* Page Title */}
          <h1 className="text-green-500 text-[40px]">Tasks</h1>
          {/* New Task Button */}
          <button
            className="bg-green-500 rounded px-[20px] py-[10px] hover:bg-green-600 transition duration-200"
            onClick={() => openTaskForm()}
          >
            New Task
          </button>
        </div>
        {/* Tasks */}
        <div className="flex flex-col w-full gap-[10px]">
          {tasks.length > 0 &&
            tasks.map((task, index) => {
              return (
                <div key={index} className="text-white px-[20px] py-[10px]">
                  <div className="group flex flex-col">
                    <div className="flex bg-[#555] z-10">
                      <div className="text-[20px] text-start w-full">
                        {index + 1}.
                      </div>
                      <div className="text-[17px] text-center w-full">
                        {task.title}
                      </div>
                      <div className="w-full text-end">√</div>
                    </div>
                    <div className="transition duration-150 flex px-[30px] z-0 translate-y-[-100%] group-hover:translate-y-0">
                      <div className="w-full flex justify-start">
                        <div className="bg-red-800 w-fit">X</div>
                      </div>
                      <div className="w-full flex justify-center">
                        <div className="bg-red-800 w-fit">due date</div>
                      </div>
                      <div className="w-full flex justify-end">
                        <div className="bg-red-800 w-fit">creating date</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );

  function closeTaskForm() {
    setTaskFormOpened(false);
  }
  function openTaskForm() {
    setTaskFormOpened(true);
  }
}

export default App;
