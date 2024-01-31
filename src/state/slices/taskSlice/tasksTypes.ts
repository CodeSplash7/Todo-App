export type LabelFilter = `label${number}`;

export type Filter = "active" | "completed" | "overdue" | null | LabelFilter;

export type SortingTerm = "creation" | "deadline" | "status";
export type SortingOrder = "asc" | "desc";
export type Sorting = {
  term: SortingTerm;
  order: SortingOrder;
} | null;

export type TaskObject = {
  id: number;
  title: string;
  description: string;
  labelId: number;
  creationDate: string;
  dueDate: string;
  active: boolean;
  overdue: boolean;
};

export type Tasks = {
  tasks: TaskObject[];
  filter: Filter;
  sorting: Sorting;
  tasksToShow: TaskObject[];
  userId: number;
};
