// dependencies
import { useSelector, useDispatch } from "react-redux";

// types
import { HandleUpdateTask } from "../App";
import { RootState } from "../state/store";

// actions
import { tasksActions } from "../state/slices/tasksSlice";

type TaskListProps = {
  handleUpdateTask: HandleUpdateTask;
};

function formatDate(dateObj: Date) {
  let d = dateObj;
  if (isNaN(d.getTime())) return null;
  const dateString = d.toLocaleDateString();
  let hoursString = String(d.getHours());
  if (hoursString.length < 2) hoursString = "0" + hoursString;
  let hoursMinutes = String(d.getMinutes());
  if (hoursMinutes.length < 2) hoursMinutes = "0" + hoursMinutes;
  return `${dateString} ${hoursString}:${hoursMinutes}`;
}

export default ({ handleUpdateTask }: TaskListProps) => {
  const dispatch = useDispatch();
  const { deleteTask, triggerCompletion } = tasksActions;
  const taskLabels = useSelector((state: RootState) => state.labels.labels);
  const tasksToRender = useSelector(
    (state: RootState) => state.tasks.tasksToShow
  );
  let tasksExist = tasksToRender.length > 0;

  return (
    <div className="flex flex-col w-full h-fit gap-[10px] relative">
      {tasksExist &&
        tasksToRender.map((task, index) => {
          let creationDate = new Date(task.creationDate);
          let dueDate = new Date(task.dueDate);
          let taskLabel = taskLabels.find((label) => label.id === task.labelId);
          let taskLabelColor = "#334155";
          if (taskLabel && taskLabel.color !== "")
            taskLabelColor = taskLabel.color;

          /* Task */
          return (
            <div
              key={index}
              className={`text-white group w-full flex flex-col h-fit relative
                ${task.active ? "" : "opacity-[20%]"}
              `}
            >
              <TaskTopDetails
                dueDate={dueDate}
                isTaskActive={task.active}
                isTaskOverdue={task.overdue}
              />
              <TaskMainDetails
                taskCount={index + 1}
                taskTitle={task.title}
                taskLabelColor={taskLabelColor}
                isTaskActive={task.active}
                isTaskOverdue={task.overdue}
                triggerCompletion={() => dispatch(triggerCompletion(task.id))}
              />
              <TaskBottomDetails
                creationDate={creationDate}
                updateTask={() => handleUpdateTask(task.id)}
                deleteTask={() => dispatch(deleteTask(task.id))}
                isTaskActive={task.active}
              />
            </div>
          );
        })}
    </div>
  );
};

type TaskTopDetailsProps = {
  dueDate: Date;
  isTaskActive: boolean;
  isTaskOverdue: boolean;
};
const TaskTopDetails = ({
  dueDate,
  isTaskActive,
  isTaskOverdue
}: TaskTopDetailsProps) => {
  return (
    <div className=" [tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
      {/* Task creation date */}
      <div className="w-full flex justify-end [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
        <div
          className={`bg-red-900 h-full flex items-center px-[20px] rounded-t-sm
          ${isTaskOverdue && isTaskActive ? "text-red-500" : ""}
        `}
        >
          <div>Due Date: {formatDate(dueDate) ?? "No Constrains"}</div>
        </div>
      </div>
    </div>
  );
};

type TaskBottomDetailsProps = {
  creationDate: Date;
  updateTask: () => void;
  deleteTask: () => void;
  isTaskActive: boolean;
};

const TaskBottomDetails = ({
  creationDate,
  updateTask,
  deleteTask,
  isTaskActive
}: TaskBottomDetailsProps) => {
  return (
    <div className="[tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
      {/* Task 'delete' button */}
      <div className="w-full flex justify-start [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[-100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
        <div
          onClick={deleteTask}
          title="delete"
          className="transition duration-150 hover:text-green-500 underline bg-red-900 h-full flex items-center px-[20px] rounded-b-sm"
        >
          X
        </div>
      </div>
      {/* Task due date */}
      <div className="w-full flex justify-center [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[-100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
        <div
          onClick={() => (isTaskActive ? updateTask() : null)}
          className="transition duration-150 hover:text-green-500 underline bg-red-900 h-full flex items-center px-[20px] rounded-b-sm"
        >
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
  );
};

type TaskMainDetailsProps = {
  taskCount: number;
  taskTitle: string;
  taskLabelColor: string;
  isTaskActive: boolean;
  isTaskOverdue: boolean;
  triggerCompletion: () => void;
};
const TaskMainDetails = ({
  taskCount,
  taskTitle,
  taskLabelColor,
  isTaskOverdue,
  isTaskActive,
  triggerCompletion
}: TaskMainDetailsProps) => {
  // const dispatch = useDispatch();
  // const { triggerCompletion } = tasksActions;
  return (
    <div
      style={{ borderColor: taskLabelColor }}
      className={`flex justify-between px-[20px] py-[10px] bg-slate-700 border-[5px]
      ${isTaskActive && isTaskOverdue ? "bg-red-700 text-white" : ""}
    `}
    >
      {/* Task number */}
      <div className="flex items-center">{taskCount}.</div>
      {/* Task title */}
      <div className="flex items-center">{taskTitle}</div>
      {/* Task 'complete' button */}
      <div
        className="border h-[25px] w-[25px] flex justify-center items-center"
        onClick={triggerCompletion}
      >
        {isTaskActive ? "" : "√"}
      </div>
    </div>
  );
};
