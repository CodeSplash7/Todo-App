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
        {/* Tasks list */}
        <div className="flex flex-col w-full h-fit gap-[10px]">
          {tasks.length > 0 &&
            tasks.map((task, index) => {
              let { creationDate, dueDate } = task;
              return (
                <div key={index}>
                  {/* Task */}
                  <div className="text-white group w-full flex flex-col h-fit">
                    {/* Task secondary details 1 */}
                    <div className=" [tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
                      {/* Task creation date */}
                      <div className="w-full flex justify-end [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
                        <div className="bg-red-900 h-full flex items-center px-[20px] rounded-t-sm">
                          <div>Due Date: {formatDate(dueDate)}</div>
                        </div>
                      </div>
                    </div>
                    {/* Task main details */}
                    <div className="border-black border-[1px] bg-slate-700 flex justify-between px-[20px] py-[10px]">
                      {/* Task number */}
                      <div>{index + 1}.</div>
                      {/* Task title */}
                      <div>{task.title}</div>
                      {/* Task 'complete' button */}
                      <div>√</div>
                    </div>
                    {/* Task secondary details 2 */}
                    <div className="[tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
                      {/* Task 'delete' button */}
                      <div className="w-full flex justify-start [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[-100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
                        <div title="delete" className="transition duration-150 hover:text-green-500 underline bg-red-900 h-full flex items-center px-[20px] rounded-b-sm">
                          X
                        </div>
                      </div>
                      {/* Task due date */}
                      <div className="w-full flex justify-center [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[-100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
                        <div onClick={() => openTaskForm()} className="transition duration-150 hover:text-green-500 underline bg-red-900 h-full flex items-center px-[20px] rounded-b-sm">
                          See Details
                        </div>
                      </div>
                      {/* Task creation date */}
                      <div className="w-full flex justify-end [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[-100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
                        <div className="bg-red-900 h-full w-fit flex items-center px-[20px] rounded-b-sm">
                          <div className="whitespace-nowrap">
                            Creation Date: {formatDate(creationDate)}
                          </div>
                        </div>
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
  function formatDate(dateObj: Date) {
    let d = dateObj;
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
  }

  function closeTaskForm() {
    setTaskFormOpened(false);
  }
  function openTaskForm() {
    setTaskFormOpened(true);
  }
}

export default App;
