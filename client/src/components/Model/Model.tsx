import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { ModelProps } from "../../types/ModelProps";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  width: 600,
  p: 5,
};

export default function BasicModal({ children, onClose, open }: ModelProps) {
  const child = <Box sx={style}>{children}</Box>;
  return (
    <div>
      <Modal open={open} onClose={onClose} children={child}></Modal>
    </div>
  );
}
