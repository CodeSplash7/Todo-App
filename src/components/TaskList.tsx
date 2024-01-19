// dependencies
import { useSelector, useDispatch } from "react-redux";

// types
import { HandleUpdateTask } from "../App";
import { RootState } from "../state/store";
import { TaskStatus } from "../state/slices/tasksSlice";

// actions
import { tasksActions } from "../state/slices/tasksSlice";

type TaskListProps = {
  handleUpdateTask: HandleUpdateTask;
};

function formatDate(dateObj: Date) {
  let d = dateObj;
  return `${d.toLocaleDateString()} ${d.getHours()}:${d.getMinutes()}`;
}

export default ({ handleUpdateTask }: TaskListProps) => {
  const dispatch = useDispatch();
  const { deleteTask, triggerCompletion } = tasksActions;
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const clock = useSelector((state: RootState) => state.clock.time);
  const currentDate = new Date(clock);
  let tasksExist = tasks.length > 0;

  return (
    <div className="flex flex-col w-full h-fit gap-[10px] relative">
      {tasksExist &&
        tasks.map((task, index) => {
          let creationDate = new Date(task.creationDate);
          let dueDate = new Date(task.dueDate);
          // if (task.status === "completed") {
          //   console.log(task.title);
          // }
          if (task.status === "active" && currentDate > dueDate) {
            // dispatch(setStatus({ id: task.id, status: "overdue" }));
          }
          if (task.status === "overdue" && currentDate < dueDate) {
            // dispatch(setStatus({ id: task.id, status: "active" }));
          }
          /* Task */
          return (
            <div
              key={index}
              className={`text-white group w-full flex flex-col h-fit relative
                ${task.status === "completed" ? "opacity-[20%]" : ""}
              `}
            >
              <TaskTopDetails dueDate={dueDate} taskStatus={task.status} />
              <TaskMainDetails
                taskCount={index + 1}
                taskTitle={task.title}
                taskStatus={task.status}
                triggerCompletion={() => dispatch(triggerCompletion(task.id))}
              />
              <TaskBottomDetails
                creationDate={creationDate}
                updateTask={() => handleUpdateTask(task.id)}
                deleteTask={() => dispatch(deleteTask(task.id))}
                taskStatus={task.status}
              />
            </div>
          );
        })}
    </div>
  );
};

type TaskTopDetailsProps = {
  dueDate: Date;
  taskStatus: TaskStatus;
};
const TaskTopDetails = ({ dueDate, taskStatus }: TaskTopDetailsProps) => {
  return (
    <div className=" [tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
      {/* Task creation date */}
      <div className="w-full flex justify-end [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
        <div
          className={`bg-red-900 h-full flex items-center px-[20px] rounded-t-sm
          ${taskStatus === "overdue" ? "text-red-500" : ""}
        `}
        >
          <div>Due Date: {formatDate(dueDate)}</div>
        </div>
      </div>
    </div>
  );
};

type TaskBottomDetailsProps = {
  creationDate: Date;
  updateTask: () => void;
  deleteTask: () => void;
  taskStatus: TaskStatus;
};

const TaskBottomDetails = ({
  creationDate,
  updateTask,
  deleteTask,
  taskStatus
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
          onClick={() => (taskStatus !== "completed" ? updateTask() : null)}
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
  taskStatus: TaskStatus;
  triggerCompletion: () => void;
};
const TaskMainDetails = ({
  taskCount,
  taskTitle,
  taskStatus,
  triggerCompletion
}: TaskMainDetailsProps) => {
  // const dispatch = useDispatch();
  // const { triggerCompletion } = tasksActions;
  return (
    <div
      className={`border-blackborder-[1px] bg-slate-700 flex justify-between px-[20px] py-[10px]
      ${
        taskStatus === "overdue"
          ? "border-red-500 text-red-500  border-[2px]"
          : ""
      }
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
        {taskStatus === "completed" ? "√" : ""}
      </div>
    </div>
  );
};
