import {
  Box,
  Typography,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import GROUPLIST from "../constants/groups";
import { FilterPanelProps } from "../types/FilterPanelProps";

function FilterPanel({ value, onChange }: FilterPanelProps) {
  return (
    <Box sx={{ width: 280 }}>
      <Typography variant="body1" sx={{ color: "primary.main" }}>
        FILTER FOR STUDY GROUPS
      </Typography>

      <FormGroup>
        {GROUPLIST.map((option) => (
          <FormControlLabel
            key={option.id}
            control={
              <Checkbox
                color="error"
                value={option.id}
                checked={value.includes(option.id)}
                onChange={onChange}
              />
            }
            label={option.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
export default FilterPanel;
