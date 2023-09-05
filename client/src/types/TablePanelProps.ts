import { StudentData } from "./Students";

export type TablePanelProps = {
  rows: StudentData[];
  onDelete: (data: string) => void;
  handleOpen: () => void;
  updateFn: (data: StudentData) => void;
};
