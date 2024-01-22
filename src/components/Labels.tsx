import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";
import { RootState } from "../state/store";

function Labels() {
  const dispatch = useDispatch();
  const taskLabels = useSelector((state: RootState) => state.labels.labels);
  const { filterTasks } = tasksActions;
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Labels
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          {taskLabels.map((label, index) => (
            <div
              key={index}
              style={{background: label.color}}
              className="[text-shadow:1px_1px_black] border"
              onClick={() => dispatch(filterTasks(`label${label.id}`))}
            >
              {label.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Labels;
