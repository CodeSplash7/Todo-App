// types
import { TaskObject } from "../state/slices/tasksSlice";
import { OpenTaskForm } from "../App";

type TaskListProps = {
  tasks: TaskObject[];
  openTaskForm: () => void;
  handleDeleteTask: (taskId: number) => void;
};

function formatDate(dateObj: Date) {
  let d = dateObj;
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
}

export default ({ tasks, openTaskForm, handleDeleteTask }: TaskListProps) => {
  let tasksExist = tasks.length > 0;
  return (
    <div className="flex flex-col w-full h-fit gap-[10px]">
      {tasksExist &&
        tasks.map((task, index) => {
          let creationDate = new Date(task.creationDate);
          let dueDate = new Date(task.dueDate);
          /* Task */
          return (
            <div
              key={index}
              className="text-white group w-full flex flex-col h-fit"
            >
              <TaskTopDetails dueDate={dueDate} />
              <TaskMainDetails taskCount={index + 1} taskTitle={task.title} />
              <TaskBottomDetails
                creationDate={creationDate}
                openTaskForm={openTaskForm}
                deleteTask={() => handleDeleteTask(task.id)}
              />
            </div>
          );
        })}
    </div>
  );
};

type TaskTopDetailsProps = {
  dueDate: Date;
};
const TaskTopDetails = ({ dueDate }: TaskTopDetailsProps) => {
  return (
    <div className=" [tranistion-property:all] duration-150 ease-linear flex justify-between h-0 group-hover:h-[40px] overflow-hidden relative">
      {/* Task creation date */}
      <div className="w-full flex justify-end [tranistion-property:all] duration-100 ease-linear delay-[250ms] relative top-[100%] group-hover:top-0 invisible group-hover:visible h-full px-[10px]">
        <div className="bg-red-900 h-full flex items-center px-[20px] rounded-t-sm">
          <div>Due Date: {formatDate(dueDate)}</div>
        </div>
      </div>
    </div>
  );
};

type TaskBottomDetailsProps = {
  creationDate: Date;
  openTaskForm: OpenTaskForm;
  deleteTask: () => void;
};

const TaskBottomDetails = ({
  creationDate,
  openTaskForm,
  deleteTask
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
          onClick={() => openTaskForm()}
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
};
const TaskMainDetails = ({ taskCount, taskTitle }: TaskMainDetailsProps) => {
  return (
    <div className="border-black border-[1px] bg-slate-700 flex justify-between px-[20px] py-[10px]">
      {/* Task number */}
      <div>{taskCount}.</div>
      {/* Task title */}
      <div>{taskTitle}</div>
      {/* Task 'complete' button */}
      <div>√</div>
    </div>
  );
};
