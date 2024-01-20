// dependencies
import { useDispatch, useSelector } from "react-redux";

// components
import TaskForm from "./components/TaskForm";
import MainHeader from "./components/MainHeader";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";

// types
import { AppDispath, RootState } from "./state/store";

// redux actions
import { taskFormActions } from "./state/slices/taskFormSlice";
import { tickClock } from "./state/slices/clockSlice";
import { useEffect } from "react";
import { tasksActions } from "./state/slices/tasksSlice";

type ComponentFunctions = {
  handleUpdateTask: HandleUpdateTask;
};

function App() {
  const dispatch = useDispatch<AppDispath>();
  // get redux actions
  const {
    setTitle,
    setLabelId,
    setCreationDate,
    setDueDate,
    setDescription,
    setTaskFormIsOpen,
    setId
  } = taskFormActions;

  const { filterTasks } = tasksActions;
  // state
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { handleUpdateTask } = componentFunctions();

  useEffect(() => {
    dispatch(tickClock());
    dispatch(filterTasks("active"));
  }, [dispatch]);

  return (
    <>
      <TaskForm />
      {/* Whole page */}
      <div className="flex">
        {/* Page left */}
        <div className="flex-1 pt-[100px] flex justify-center">
          {/* Page left */}
          <Filter />
        </div>
        {/* Page center */}
        <div className="flex-[1.5] pt-[100px] flex flex-col items-center gap-[20px]">
          <MainHeader />
          <TaskList handleUpdateTask={handleUpdateTask} />
        </div>
        {/* Page right */}
        <div className="flex-1">RIGHT</div>
      </div>
    </>
  );

  function componentFunctions(): ComponentFunctions {
    return {
      handleUpdateTask: (taskId) => {
        const taskObj = tasks.find((task) => task.id === taskId)!;
        dispatch(setId(taskObj.id));
        dispatch(setTitle(taskObj.title));
        dispatch(setLabelId(taskObj.labelId));
        dispatch(setCreationDate(taskObj.creationDate));
        dispatch(setDueDate(taskObj.dueDate));
        dispatch(setDescription(taskObj.description));
        dispatch(setTaskFormIsOpen(true));
      }
    };
  }
}

export default App;

export type HandleUpdateTask = (taskId: number) => void;
