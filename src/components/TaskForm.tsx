// dependencies
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import { useSelector, useDispatch } from "react-redux";
import Joi from "joi";

// types
import { RootState } from "../state/store";

// redux actions
import { taskFormActions } from "../state/slices/taskFormSlice/taskFormSlice";
import { tasksActions } from "../state/slices/taskSlice/tasksSlice";

const formSchema = Joi.object({
  title: Joi.string().max(30).min(4).required(),
  description: Joi.string().max(5000).min(0)
});

export default () => {
  let isTaskFormOpen = useSelector(
    (state: RootState) => state.taskForm.isTaskFormOpen
  );

  let formErrorMessage = useSelector(
    (state: RootState) => state.taskForm.errorMessage
  );

  return (
    <ReactModal
      isOpen={isTaskFormOpen}
      closeTimeoutMS={1000}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0)"
        },
        content: {
          background: "rgba(0,0,0,0.4)",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "opacity 2000ms ease-in-out"
        }
      }}
    >
      {/* Form Container */}
      <div className="bg-slate-600 flex flex-col rounded-xl w-1/2 h-fit px-[50px] py-[30px] gap-[10px]">
        <div className="flex gap-[30px]">
          <TitleInput />
          <LabelInput />
        </div>
        <div className="flex gap-[30px]">
          <CreationInput />
          <DueInput />
        </div>
        <DescriptionInput />
        <div className="flex justify-between gap-[40px] w-full">
          <SaveBtn />
          <CancelBtn />
        </div>
        <p className="text-red-500">{formErrorMessage}</p>
      </div>
    </ReactModal>
  );
};

const TitleInput = () => {
  const dispatch = useDispatch();
  const { setTitle } = taskFormActions;
  const title = useSelector((state: RootState) => state.taskForm.title);
  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="title-input">Title: </label>
      <input
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="text"
        id="title-input"
      />
    </div>
  );
};

const LabelInput = () => {
  const dispatch = useDispatch();
  const { setLabelId } = taskFormActions;
  const labelId = useSelector((state: RootState) => state.taskForm.labelId);
  const labels = useSelector((state: RootState) => state.labels.labels);
  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="label-input">Label:</label>
      <select
        value={labelId}
        onChange={(e) => dispatch(setLabelId(Number(e.target.value)))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        id="label-input"
      >
        <option value="-1">No label</option>
        {labels.map((label) => (
          <option
            style={{ background: label.color }}
            className="[text-shadow:1px_1px_black]"
            key={label.id}
            value={label.id}
          >
            {label.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const CreationInput = () => {
  let creationDate = useSelector(
    (state: RootState) => state.taskForm.creationDate
  );
  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="creation-input">Creation Date:</label>
      <input
        readOnly
        value={creationDate}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="datetime-local"
        id="creation-input"
      />
    </div>
  );
};

const DueInput = () => {
  const dispatch = useDispatch();
  const { setDueDate } = taskFormActions;
  const dueDate = useSelector((state: RootState) => state.taskForm.dueDate);
  return (
    <div className="w-[100%] flex flex-col">
      <label htmlFor="due-input">Due Date: </label>
      <input
        value={dueDate}
        onChange={(e) => dispatch(setDueDate(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        type="datetime-local"
        id="due-input"
      />
    </div>
  );
};

const DescriptionInput = () => {
  const dispatch = useDispatch();
  const { setDescription } = taskFormActions;
  const description = useSelector(
    (state: RootState) => state.taskForm.description
  );
  return (
    <div className="flex flex-col w-[100%]">
      <label htmlFor="description-input">Description:</label>
      <textarea
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
        className="rounded py-[5px] px-[10px] bg-[#333] text-white outline-none"
        id="description-input"
      ></textarea>
    </div>
  );
};

const SaveBtn = () => {
  const dispatch = useDispatch();
  const { setErrorMessage, resetForm } = taskFormActions;

  const title = useSelector((state: RootState) => state.taskForm.title);
  const description = useSelector(
    (state: RootState) => state.taskForm.description
  );
  const id = useSelector((state: RootState) => state.taskForm.id);
  const dueDate = useSelector((state: RootState) => state.taskForm.dueDate);
  const labelId = useSelector((state: RootState) => state.taskForm.labelId);
  const creationDate = useSelector(
    (state: RootState) => state.taskForm.creationDate
  );

  const { updateTask, addTask } = tasksActions;

  return (
    <button
      onClick={() => {
        let errorMessage = formSchema.validate({ title, description }).error
          ?.message;
        dispatch(setErrorMessage(errorMessage));
        if (errorMessage) return;
        if (id > 0) {
          dispatch(
            updateTask({
              id: id,
              info: {
                title,
                id,
                active: true,
                overdue: new Date() > new Date(dueDate),
                labelId,
                creationDate,
                dueDate,
                description
              }
            })
          );
        }
        if (id < 0) {
          dispatch(
            addTask({
              id: 0,
              title,
              active: true,
              overdue: new Date() > new Date(dueDate),
              creationDate,
              dueDate,
              description,
              labelId
            })
          );
        }
        dispatch(resetForm());
      }}
      className="bg-green-500 px-[10px] py-[5px] rounded hover:bg-green-600 duration-200 transition"
    >
      Save
    </button>
  );
};

const CancelBtn = () => {
  const dispatch = useDispatch();
  const { resetForm } = taskFormActions;
  return (
    <button
      className="bg-gray-700 px-[10px] py-[5px] rounded hover:bg-gray-800 duration-200 transition"
      onClick={() => dispatch(resetForm())}
    >
      Cancel
    </button>
  );
};
