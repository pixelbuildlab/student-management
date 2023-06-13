import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchBarProps } from "../types/SearchBarProps";

export default function SearchBar({ handleChange, value }: SearchBarProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        id="search"
        type="search"
        value={value}
        onChange={handleChange}
        sx={{
          width: 250,
          bgcolor: "primary.main",
          overflow: "hidden",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "white" }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
