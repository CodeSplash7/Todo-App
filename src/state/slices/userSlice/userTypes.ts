export type User = {
  username: string | null;
  email: string | null;
  id: number;
  fetchError: string | null;
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
};

export type NewAccount = {
  username: string;
  email: string;
  password: string;
};
