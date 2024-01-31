import { Tasks, TaskObject, Sorting } from "./tasksTypes";
import httpsService from "../../../httpService";

export const handleFiltering = (state: Tasks) => {
  const { filter } = state;
  let tasksToFilter = JSON.parse(JSON.stringify(state.tasks)) as TaskObject[];
  let filtered: TaskObject[] = [];
  if (filter === "active" || filter === "completed") {
    let filterActive: boolean;
    if (filter === "active") filterActive = true;
    if (filter === "completed") filterActive = false;
    filtered = tasksToFilter.filter((task) => task.active === filterActive);
  }
  if (filter === "overdue") {
    filtered = state.tasks.filter((task) => task.overdue === true);
  }
  if (filter?.slice(0, 5) === "label") {
    const labelId = Number(filter.slice(5, filter.length));
    filtered = state.tasks.filter((task) => task.labelId === labelId);
  }
  if (filter === null) filtered = tasksToFilter;

  return filtered;
};

export const handleSorting = (sorting: Sorting, tasks: TaskObject[]) => {
  let tasksToSort = JSON.parse(JSON.stringify(tasks)) as TaskObject[];
  let sorted: TaskObject[] = [];

  if (sorting === null) {
    sorted = tasksToSort;
    return sorted;
  }

  if (sorting.term === "creation") {
    sorted = tasksToSort.sort(
      (a, b) =>
        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
    );
  }
  if (sorting.term === "deadline") {
    let tasksWithNoDeadline = tasksToSort.filter((task) => !task.dueDate);
    let tasksWithDeadline = tasksToSort.filter((task) => task.dueDate);

    sorted = [
      ...tasksWithNoDeadline,
      ...tasksWithDeadline.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )
    ];
  }
  if (sorting.term === "status") {
    let overdueTasks = tasksToSort.filter(
      (task) => task.overdue && task.active
    );
    let activeTasks = tasksToSort.filter(
      (task) => task.active && !task.overdue
    );
    let completedTasks = tasksToSort.filter(
      (task) => !task.active && !task.overdue
    );
    sorted = [...overdueTasks, ...activeTasks, ...completedTasks];
  }
  if (sorting.order === "desc") return sorted.reverse();
  return sorted;
};

export const handleOrdering = (state: Tasks) => {
  let filtered = handleFiltering(state);
  let sorted = handleSorting(state.sorting, filtered);
  return sorted;
};

export const handleApiDataUpdate = (state: Tasks) => {
  if (state.userId > -1)
    httpsService.patch(`accounts/${state.userId}`, { tasks: state.tasks });
};
