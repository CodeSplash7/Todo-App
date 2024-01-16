// dependencies
import { useDispatch, useSelector } from "react-redux";

// components
import TaskForm from "./components/TaskForm";
import MainHeader from "./components/MainHeader";
import TaskList from "./components/TaskList";

// types
import { RootState } from "./state/store";
import { TaskObject } from "./state/slices/tasksSlice";

// redux actions
import { taskFormActions } from "./state/slices/taskFormSlice";
import { tasksActions } from "./state/slices/tasksSlice";

type ComponentFunctions = {
  closeTaskForm: CloseTaskForm;
  openTaskForm: OpenTaskForm;
  handleCreateNewTask: CreateNewTask;
  handleDeleteTask: HandleDeleteTask;
};

function App() {
  const dispatch = useDispatch();
  // get redux actions
  const { setTaskFormIsOpen } = taskFormActions;
  // state
  const taskFormIsOpen = useSelector(
    (state: RootState) => state.taskForm.taskFormIsOpen
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const { closeTaskForm, openTaskForm, handleCreateNewTask, handleDeleteTask } =
    componentFunctions();

  return (
    <>
      <TaskForm
        createNewTask={handleCreateNewTask}
        taskFormIsOpen={taskFormIsOpen}
        closeModal={closeTaskForm}
      />
      {/* Whole page */}
      <div className="px-[200px] pt-[100px] flex flex-col items-center gap-[20px]">
        <MainHeader openTaskForm={openTaskForm} />
        <TaskList
          tasks={tasks}
          openTaskForm={openTaskForm}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    </>
  );

  function componentFunctions(): ComponentFunctions {
    return {
      closeTaskForm: () => {
        dispatch(setTaskFormIsOpen(false));
      },
      openTaskForm: () => {
        dispatch(setTaskFormIsOpen(true));
      },
      handleCreateNewTask: (taskInfo: any) => {
        dispatch(tasksActions.addTask(taskInfo));
      },
      handleDeleteTask: (taskId) => {
        dispatch(tasksActions.deleteTask(taskId));
      }
    };
  }
}

export default App;

export type OpenTaskForm = () => void;
export type CloseTaskForm = () => void;
export type CreateNewTask = (taskInfo: TaskObject) => void;
export type HandleDeleteTask = (taskId: number) => void;
