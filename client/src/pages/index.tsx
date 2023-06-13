import * as React from "react";
import { Box, Typography } from "@mui/material";

import Link from "next/link";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Student Management</title>
        <meta property="og:title" content="Student Management" key="title" />
      </Head>
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
        <Typography variant="h4">Please Navigate to Login</Typography>
        <Link
          href="/login"
          style={{
            padding: "20px 25px",
            textDecoration: "none",
            color: "white",
            backgroundColor: "black",
            borderRadius: "4px",
          }}
        >
          Login
        </Link>
      </Box>
    </>
  );
}
