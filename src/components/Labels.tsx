import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/taskSlice/tasksSlice";
import { labelsActions } from "../state/slices/labelsSlice/labelsSlice";
import { RootState } from "../state/store";
import { LabelObject } from "../state/slices/labelsSlice/labelTypes";
import { LabelFilter } from "../state/slices/taskSlice/tasksTypes";

function Labels() {
  const taskLabels = useSelector((state: RootState) => state.labels.labels);
  return (
    <>
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Labels:
        </label>
        {/* filtering buttons */}
        <div className="flex flex-col" id="filters">
          {taskLabels.map((label, index) => (
            <Label label={label} key={index} />
          ))}
          <AddLabel />
        </div>
      </div>
    </>
  );
}

const AddLabel = () => {
  const dispatch = useDispatch();
  const { addLabel } = labelsActions;

  return (
    <button
      className="self-start"
      onClick={() => {
        dispatch(addLabel());
      }}
    >
      (+)
    </button>
  );
};

type LabelProps = {
  label: LabelObject;
};

const Label = ({ label }: LabelProps) => {
  return (
    <div className="flex">
      <LabelSelect labelId={label.id} />
      <LabelName
        labelId={label.id}
        labelColor={label.color}
        labelName={label.name}
      />
      <LabelColor labelId={label.id} labelColor={label.color} />
      <DeleteLabelBtn labelId={label.id} />
    </div>
  );
};

type DeleteLabelBtnProps = {
  labelId: number;
};

const DeleteLabelBtn = ({ labelId }: DeleteLabelBtnProps) => {
  const dispatch = useDispatch();
  const { removeLabel } = labelsActions;

  return <button onClick={() => dispatch(removeLabel(labelId))}>(x)</button>;
};

type LabelColorProps = {
  labelId: number;
  labelColor: string;
};

const LabelColor = ({ labelId, labelColor }: LabelColorProps) => {
  const dispatch = useDispatch();
  const { updateLabel } = labelsActions;

  return (
    <input
      onChange={(e) => {
        dispatch(
          updateLabel({
            id: labelId,
            info: { color: e.target.value }
          })
        );
      }}
      value={labelColor}
      type="color"
      className="w-[20%]"
    />
  );
};

type LabelNameProps = {
  labelColor: string;
  labelId: number;
  labelName: string;
};

const LabelName = ({ labelColor, labelId, labelName }: LabelNameProps) => {
  const dispatch = useDispatch();
  const { updateLabel } = labelsActions;

  return (
    <input
      style={{ background: labelColor }}
      className="[text-shadow:1px_1px_black] border w-[80%]"
      onChange={(e) => {
        dispatch(
          updateLabel({
            id: labelId,
            info: { name: e.target.value }
          })
        );
      }}
      value={labelName}
    />
  );
};

type LabelSelectProps = {
  labelId: number;
};

const LabelSelect = ({ labelId }: LabelSelectProps) => {
  const dispatch = useDispatch();
  const { filterTasks } = tasksActions;
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);

  const labelFilter: LabelFilter = `label${labelId}`;
  return (
    <input
      type="checkbox"
      checked={currentFilter === labelFilter}
      onChange={() => {
        if (currentFilter === labelFilter) {
          dispatch(filterTasks(null));
          return;
        }
        dispatch(filterTasks(labelFilter));
      }}
    />
  );
};

export default Labels;
