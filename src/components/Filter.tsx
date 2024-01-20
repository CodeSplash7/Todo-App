import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";

function Filter() {
  const dispatch = useDispatch();
  const { filterTasks } = tasksActions;
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px]">
        <label className="text-[17px]" htmlFor="filters">
          Show:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          <div
            onClick={() => dispatch(filterTasks("active"))}
            className="border"
          >
            Active only
          </div>
          <div
            onClick={() => dispatch(filterTasks("completed"))}
            className="border"
          >
            Completed only
          </div>
          <div
            onClick={() => dispatch(filterTasks("overdue"))}
            className="border"
          >
            Overdue only
          </div>
          <div
            onClick={() => dispatch(filterTasks("all"))}
            className="border"
          >
            All
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
