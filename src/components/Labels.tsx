import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";
import { labelsActions } from "../state/slices/labelsSlice";
import { RootState } from "../state/store";

function Labels() {
  const dispatch = useDispatch();
  const taskLabels = useSelector((state: RootState) => state.labels.labels);
  const taskFilter = useSelector((state: RootState) => state.tasks.filter);
  const { filterTasks } = tasksActions;
  const { updateLabel, addLabel, removeLabel } = labelsActions;
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Labels:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          {taskLabels.map((label, index) => {
            let labelFilter: `label${number}` = `label${label.id}`;
            return (
              <div className="flex" key={index}>
                <input
                  type="checkbox"
                  value={label.id}
                  defaultChecked={taskFilter === labelFilter}
                  onClick={() => {
                    if (taskFilter === labelFilter) {
                      dispatch(filterTasks(null));
                      return;
                    }
                    dispatch(filterTasks(labelFilter));
                  }}
                />
                <input
                  style={{ background: label.color }}
                  className="[text-shadow:1px_1px_black] border w-[80%]"
                  onChange={(e) => {
                    dispatch(
                      updateLabel({
                        id: label.id,
                        info: { name: e.target.value }
                      })
                    );
                  }}
                  value={label.name}
                />
                <input
                  onChange={(e) => {
                    dispatch(
                      updateLabel({
                        id: label.id,
                        info: { color: e.target.value }
                      })
                    );
                  }}
                  value={label.color}
                  type="color"
                  className="w-[20%]"
                />
                <button onClick={() => dispatch(removeLabel(label.id))}>
                  (x)
                </button>
              </div>
            );
          })}
          <button
            className="self-start"
            onClick={() => {
              dispatch(addLabel());
            }}
          >
            (+)
          </button>
        </div>
      </div>
    </>
  );
}

export default Labels;
