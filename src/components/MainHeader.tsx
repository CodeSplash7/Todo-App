import { useDispatch } from "react-redux";
import { taskFormActions } from "../state/slices/taskFormSlice/taskFormSlice";

export default () => {
  const dispatch = useDispatch();
  const { toggleTaskForm } = taskFormActions;
  return (
    <div className="flex gap-[10px] items-center">
      {/* Page Title */}
      <h1 className="text-green-500 text-[40px]">Tasks</h1>
      {/* New Task Button */}
      <button
        className="bg-green-500 rounded px-[20px] py-[10px] hover:bg-green-600 transition duration-200"
        onClick={() => {
          dispatch(toggleTaskForm(true));
        }}
      >
        New Task
      </button>
    </div>
  );
};
