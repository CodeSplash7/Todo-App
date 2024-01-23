import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";
import { Filter } from "../state/slices/tasksSlice";
import { RootState } from "../state/store";

function Filter() {
  const dispatch = useDispatch();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter)
  const { filterTasks } = tasksActions;
  const filters: { labeling: string; filterTerm: Filter }[] = [
    { labeling: "Active Only", filterTerm: "active" },
    { labeling: "Completed Only", filterTerm: "completed" },
    { labeling: "Overdue Only", filterTerm: "overdue" },
    { labeling: "All", filterTerm: null }
  ];
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Show:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          {filters.map((filter) => (
            <div
              onClick={() => dispatch(filterTasks(filter.filterTerm))}
              className={`border ${currentFilter == filter.filterTerm ? "bg-white text-black" : ""}`}
            >
              {filter.labeling}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Filter;
