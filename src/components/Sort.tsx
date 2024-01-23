import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";
import { Sorting } from "../state/slices/tasksSlice";
import { RootState } from "../state/store";

function Sort() {
  const dispatch = useDispatch();
  const { sortTasks } = tasksActions;
  const currentSorting = useSelector((state: RootState) => state.tasks.sorting)
  const sortings: { sortingTerm: Sorting; labeling: string }[] = [
    { sortingTerm: "creation", labeling: "Creation Date" },
    { sortingTerm: "deadline", labeling: "Due Date" },
    { sortingTerm: "status", labeling: "Status" },
    { sortingTerm: null, labeling: "No Sorting" }
  ];
  return (
    <>
      {/* Filters */}
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Sort by:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          {sortings.map((sorting) => (
            <div
              onClick={() => dispatch(sortTasks(sorting.sortingTerm))}
              className={`border ${currentSorting === sorting.sortingTerm ? "bg-white text-black" : ""}`}
            >
              {sorting.labeling}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sort;
