import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const ErrorPage = () => {
  const [content, setContent] = useState(false);
  let contentData = <p>Loading auth Data...</p>;
  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setContent(true);
    }, 5000);
    // clearTimeout(timeOut);
  }, [contentData]);

  if (content) {
    contentData = (
      <Box
        sx={{
          display: "flex",
          height: "90vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Typography variant="h4" sx={{ color: "crimson", fontWeight: "bold" }}>
          401 - Unauthorized Attempt
        </Typography>
        <Link
          onClick={() => localStorage.removeItem("userData")}
          href="/login"
          style={{
            padding: "15px 25px",
            textDecoration: "none",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "crimson",
            borderRadius: "4px",
          }}
        >
          Login
        </Link>
      </Box>
    );
  }
  return <>{contentData}</>;
};

export default ErrorPage;
