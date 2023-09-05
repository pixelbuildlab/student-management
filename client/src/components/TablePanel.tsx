import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import GROUPLIST from "../constants/groups";
import { StudentData as StudentDataType } from "../types/Students";
import { TablePanelProps } from "../types/TablePanelProps";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import EditNoteIcon from "@mui/icons-material/EditNote";
export default function StudentTable({
  rows,
  onDelete,
  handleOpen,
  updateFn,
}: TablePanelProps) {
  const onEditClick = (params: GridRenderCellParams) => {
    const studentData = params.row as StudentDataType;
    handleOpen();
    updateFn(studentData);
  };
  const onDeleteClick = (params: GridRenderCellParams) => {
    onDelete(params.row._id);
  };
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
      sortable: false,
      defaultHidden: true,
      valueGetter: (params: GridRenderCellParams) => {
        return params.row._id;
      },
    },

    {
      headerName: "NAME",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      field: "fullName",
    },
    {
      field: "gender",
      headerName: "GENDER",
      width: 120,
    },
    {
      headerName: "PLACE AND DATE OF BIRTH",
      width: 250,
      field: "city",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (params: GridRenderCellParams) =>
        `${params.row.city + ", " || ""} ${
          dayjs(params.row.dob).format("YYYY.MM.DD") || ""
        }`,
    },
    {
      headerName: "GROUPS",
      width: 300,
      field: "groups",

      description: "This column has a value getter and is not sortable.",
      sortable: false,
      valueGetter: (params: GridRenderCellParams) =>
        `${params.row.groups.map((data: string) =>
          GROUPLIST.filter((group) => group.id === data)
            .map((filtered) => filtered.label)
            .toString()
        )}`,
    },

    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton
            color="success"
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              onEditClick(params);
            }}
          >
            <EditNoteIcon />
          </IconButton>

          <IconButton
            color="error"
            size="large"
            sx={{ marginLeft: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(params);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        getRowId={(row: any) => row._id}
      />
    </div>
  );
}
