import { Box } from "@mui/material";
import React from "react";
import { ColorRing } from "react-loader-spinner";
type spinnertype = {
  state: boolean;
};
function Spinner({ state }: spinnertype) {
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ColorRing
        visible={true || state}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#1974D1", "#1357BD", "#0D3AA9", "#061D95", "#000081"]}
      />
    </Box>
  );
}

export default Spinner;
