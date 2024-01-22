import { useDispatch } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";

function Sort() {
  const dispatch = useDispatch();
  const { sortTasks } = tasksActions;
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Sort by:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          <div
            onClick={() => dispatch(sortTasks("creation"))}
            className="border"
          >
            Creation date
          </div>
          <div onClick={() => dispatch(sortTasks("deadline"))} className="border">
            Due date
          </div>
          <div onClick={() => dispatch(sortTasks("status"))} className="border">
            Status
          </div>
          <div onClick={() => dispatch(sortTasks(null))} className="border">
            No sorting
          </div>
        </div>
      </div>
    </>
  );
}

export default Sort;
