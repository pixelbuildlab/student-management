import { Box, Button, Typography, Avatar } from "@mui/material";
import SearchBar from "./Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import { HeaderProps } from "../types/HeaderProps";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import axios from "axios";
function Header({
  value,
  handleSearchTextChange,
  handleOpen,
  studentCount,
}: HeaderProps) {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: "1",
        flexWrap: "nowrap",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ mr: 20 }}>
        <Typography variant="body1" sx={{ color: "primary.main" }}>
          SEARCH FOR NAME
        </Typography>
        <SearchBar handleChange={handleSearchTextChange} value={value} />
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ marginRight: 4, color: "black" }}>
          <PersonIcon fontSize="small" /> {studentCount} STUDENTS
        </Typography>

        <Button
          variant="contained"
          startIcon={<PersonAddIcon sx={{ pr: "5px" }} fontSize="medium" />}
          disableElevation
          size="large"
          onClick={handleOpen}
          sx={{ bgcolor: "blue", color: "white" }}
        >
          New
        </Button>
      </Box>
      <Avatar
        onClick={async () => {
          localStorage.removeItem("userData");
          await axios.post("http://localhost:3001/api/user/logout", null, {
            withCredentials: true,
          });
          router.push("/login");
        }}
        sx={{
          bgcolor: "blue",
          cursor: "pointer",
          width: 50,
          height: 50,
        }}
      >
        <LogoutIcon />
      </Avatar>
    </Box>
  );
}

export default Header;
