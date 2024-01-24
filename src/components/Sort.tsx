import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/tasksSlice";
import { Sorting } from "../state/slices/tasksSlice";
import { RootState } from "../state/store";

function Sort() {
  const dispatch = useDispatch();
  const { sortTasks } = tasksActions;
  const currentSorting = useSelector((state: RootState) => state.tasks.sorting);
  const sortButtons: { sorting: Sorting; labeling: string }[] = [
    {
      sorting: { term: "creation", order: "asc" },
      labeling: "Creation Date"
    },
    {
      sorting: { term: "deadline", order: "asc" },
      labeling: "Due Date"
    },
    {
      sorting: { term: "status", order: "asc" },
      labeling: "Status"
    },
    { sorting: null, labeling: "No Sorting" }
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
          {sortButtons.map((sortBtn, index) => {
            // if both sorting terms(either undefined or specific) are the same
            let sameSortingTerm =
              currentSorting?.term === sortBtn.sorting?.term;

            // if both sorting orders(either undefined or specific)
            let sameSortingOrder =
              currentSorting?.order === sortBtn.sorting?.order;

            if (sameSortingTerm && sameSortingOrder && sortBtn.sorting)
              sortBtn.sorting.order = "desc";

            if (sameSortingTerm && !sameSortingOrder && sortBtn.sorting)
              sortBtn.sorting.order = "asc";

            return (
              <div
                key={index}
                onClick={() => dispatch(sortTasks(sortBtn.sorting))}
                className={`border ${
                  sameSortingTerm ? "bg-white text-black flex" : ""
                }`}
              >
                {sortBtn.labeling}
                {sameSortingTerm && sortBtn.sorting && (
                  <div
                    className={`${
                      sortBtn.sorting?.order === "desc" ? "rotate-180" : ""
                    }`}
                  >
                    ^
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sort;
