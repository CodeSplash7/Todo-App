// dependencies
import { useDispatch, useSelector } from "react-redux";

// components
import TaskForm from "./components/TaskForm";
import AuthForm from "./components/AuthForm";
import MainHeader from "./components/MainHeader";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import Sort from "./components/Sort";
import Labels from "./components/Labels";
import Navbar from "./components/Navbar";

// types
import { AppDispatch, RootState } from "./state/store";

// redux actions
import { taskFormActions } from "./state/slices/taskFormSlice";
import { tickClock } from "./state/slices/clockSlice";
import { useEffect } from "react";
import { tasksActions } from "./state/slices/tasksSlice";
import { fetchAccountData } from "./state/slices/userSlice";

type ComponentFunctions = {
  handleUpdateTask: HandleUpdateTask;
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  // get redux actions
  const {
    setTitle,
    setLabelId,
    setCreationDate,
    setDueDate,
    setDescription,
    toggleTaskForm: setTaskFormIsOpen,
    setId
  } = taskFormActions;

  const { filterTasks, sortTasks } = tasksActions;
  // state
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { handleUpdateTask } = componentFunctions();

  useEffect(() => {
    dispatch(tickClock());
    dispatch(filterTasks(null));
    dispatch(sortTasks(null));
    let loggedId = Number(localStorage.getItem("userId"));
    if (loggedId && loggedId > 0) dispatch(fetchAccountData(loggedId));
  }, [dispatch]);

  return (
    <>
      <TaskForm />
      <AuthForm />
      {/* Whole page */}
      <div className="flex flex-col">
        <Navbar />
        <div className="flex pt-[50px]">
          {/* Page left */}
          <div className="flex-1 flex flex-col items-center gap-[30px]">
            <Filter />
            <Sort />
          </div>
          {/* Page center */}
          <div className="flex-[1.5] flex flex-col items-center gap-[20px]">
            <MainHeader />
            <TaskList handleUpdateTask={handleUpdateTask} />
          </div>
          {/* Page right */}
          <div className="flex-1 flex flex-col items-center w-full">
            <Labels />
          </div>
        </div>
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
