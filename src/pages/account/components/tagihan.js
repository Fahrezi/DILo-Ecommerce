import React, { Component } from "react";
import { Box, Typography } from "@material-ui/core";

class tagihan extends Component {
  render() {
    return (
      <>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8, padding: "20px 50px" }}
        >
          <Typography component="h5" variant="h6" style={{ color: "#fff" }}>
            Tagihan Saya
          </Typography>
        </Box>
      </>
    );
  }
}

export default tagihan;
