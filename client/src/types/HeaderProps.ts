export type HeaderProps = {
  value: string;
  handleSearchTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpen: () => void;
  studentCount: number;
};
