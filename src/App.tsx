// dependencies
import { useDispatch, useSelector } from "react-redux";

// components
import TaskForm from "./components/TaskForm";
import MainHeader from "./components/MainHeader";
import TaskList from "./components/TaskList";

// types
import { RootState } from "./state/store";

// redux actions
import { taskFormActions } from "./state/slices/taskFormSlice";

type ComponentFunctions = {
  handleUpdateTask: HandleUpdateTask;
};

function App() {
  const dispatch = useDispatch();
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
  // state
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { handleUpdateTask } = componentFunctions();

  return (
    <>
      <TaskForm />
      {/* Whole page */}
      <div className="px-[200px] pt-[100px] flex flex-col items-center gap-[20px]">
        <MainHeader />
        <TaskList handleUpdateTask={handleUpdateTask} />
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
