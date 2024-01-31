export type TaskForm = {
  id: number;
  title: string;
  labelId: number;
  creationDate: string;
  dueDate: string;
  description: string;
};

export type TaskFormState = {
  errorMessage: string | undefined;
  isTaskFormOpen: boolean;
} & TaskForm;
