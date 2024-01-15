import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./components/TaskForm";
import MainHeader from "./components/MainHeader";
import TaskList from "./components/TaskList";
import { RootState } from "./state/store";
import { taskFormActions } from "./state/slices/taskFormSlice";
import { TaskObject } from "./state/slices/tasksSlice";
import { tasksActions } from "./state/slices/tasksSlice";

function App() {
  const dispatch = useDispatch();
  const { setTaskFormIsOpen } = taskFormActions;
  // const [taskFormIsOpen, setTaskFormOpened] = useState(false);
  const taskFormIsOpen = useSelector(
    (state: RootState) => state.taskForm.taskFormIsOpen
  );
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const closeTaskForm: CloseTaskForm = () => {
    dispatch(setTaskFormIsOpen(false));
  };
  const openTaskForm: OpenTaskForm = () => dispatch(setTaskFormIsOpen(true));

  const createNewTask: CreateNewTask = (taskInfo) => {
    dispatch(tasksActions.addTask(taskInfo));
  };
  return (
    <>
      <TaskForm
        createNewTask={createNewTask}
        taskFormIsOpen={taskFormIsOpen}
        closeModal={closeTaskForm}
      />
      {/* Whole page */}
      <div className="px-[200px] pt-[100px] flex flex-col items-center gap-[20px]">
        <MainHeader openTaskForm={openTaskForm} />
        <TaskList tasks={tasks} openTaskForm={openTaskForm} />
      </div>
    </>
  );
}

export default App;

export type OpenTaskForm = () => void;
export type CloseTaskForm = () => void;
export type CreateNewTask = (taskInfo: TaskObject) => void;
