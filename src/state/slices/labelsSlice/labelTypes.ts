export type LabelObject = {
  id: number;
  name: string;
  color: string;
};

export type LabelsState = {
  userId: number;
  labels: LabelObject[];
};