import { useDispatch, useSelector } from "react-redux";
import { tasksActions } from "../state/slices/taskSlice/tasksSlice";
import { Filter } from "../state/slices/taskSlice/tasksTypes";
import { RootState } from "../state/store";

function Filter() {
  const filters: { labeling: string; filterTerm: Filter }[] = [
    { labeling: "Active Only", filterTerm: "active" },
    { labeling: "Completed Only", filterTerm: "completed" },
    { labeling: "Overdue Only", filterTerm: "overdue" },
    { labeling: "All", filterTerm: null }
  ];
  return (
    <>
      <div className="text-white flex flex-col gap-[5px] w-[150px]">
        <label className="text-[17px]" htmlFor="filters">
          Filter by:
        </label>
        {/* filter buttons */}
        <div className="flex flex-col" id="filters">
          {filters.map((filter, index) => (
            <FilterBtn key={index} labeling={filter.labeling} term={filter.filterTerm} />
          ))}
        </div>
      </div>
    </>
  );
}

type FilterBtnProps = {
  term: Filter;
  labeling: string;
};

const FilterBtn = ({ term, labeling }: FilterBtnProps) => {
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);
  const dispatch = useDispatch();
  const { filterTasks } = tasksActions;

  return (
    <div
      className={`border ${currentFilter == term ? "bg-white text-black" : ""}`}
      onClick={() => dispatch(filterTasks(term))}
    >
      {labeling}
    </div>
  );
};

export default Filter;
