import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/taskSlice/tasksSlice";
import { Sorting } from "../state/slices/taskSlice/tasksTypes";
import { RootState } from "../state/store";

function Sort() {
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
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Sort by:
        </label>
        {/* filtering button */}
        <div className="flex flex-col" id="filters">
          {sortButtons.map((sortBtn, index) => (
            <SortBtn
              key={index}
              sorting={sortBtn.sorting}
              sortingLabeling={sortBtn.labeling}
            />
          ))}
        </div>
      </div>
    </>
  );
}

type SortBtnProps = {
  sorting: Sorting;
  sortingLabeling: string;
};

const SortBtn = ({ sorting, sortingLabeling }: SortBtnProps) => {
  const dispatch = useDispatch();
  const { sortTasks } = tasksActions;
  const currentSorting = useSelector((state: RootState) => state.tasks.sorting);
  let newSorting = sorting;

  // if both sorting terms(either undefined or specific) are the same
  let sameSortingTerm = currentSorting?.term === sorting?.term;

  // if both sorting orders(either undefined or specific) are the same
  let sameSortingOrder = currentSorting?.order === sorting?.order;

  if (sameSortingTerm && sameSortingOrder && newSorting)
    newSorting.order = "desc";

  if (sameSortingTerm && !sameSortingOrder && newSorting)
    newSorting.order = "asc";

  return (
    <div
      onClick={() => dispatch(sortTasks(newSorting))}
      className={`border ${sameSortingTerm ? "bg-white text-black flex" : ""}`}
    >
      {sortingLabeling}
      {sameSortingTerm && newSorting && (
        <div className={`${sorting?.order === "desc" ? "rotate-180" : ""}`}>
          ^
        </div>
      )}
    </div>
  );
};

export default Sort;
