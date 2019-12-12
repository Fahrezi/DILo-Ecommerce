import React from "react";
import { Box, Typography, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textField: {
    width: 200
  }
}));

export default function About(props) {
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={3} alignItems="center">
        <Grid item md={6}>
          <img src={require("./logo.png")} style={{ width: 400, height: 80 }} />
        </Grid>
        <Grid item md={6}>
          <Typography variant="h5">
            Adalah <strong>Mini Project Web Ecommerce</strong> yang dibuat untuk
            mempertanggungjawabkan materi yang telah diberikan oleh Instruktur
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{ margin: "70px 0 40px 0" }}
      >
        Temukan Kami Di
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <Box
            component="div"
            bgcolor="secondary.main"
            width="100%"
            height="300px"
            pt={12}
          >
            <Typography variant="h6" align="center">
              Maps
            </Typography>
          </Box>
        </Grid>
        <Grid item md={2} style={{ paddingTop: 80 }}>
          <Typography variant="h5" align="center">
            Atau
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography variant="h5" style={{ marginBottom: 30 }}>
            Sosial Media
          </Typography>
          {[
            { sosmed: "Facebook", account: "Tampil-Ecommerce" },
            { sosmed: "Twitter", account: "@Tampil-Ecommerce" },
            { sosmed: "Instagram", account: "@Tampil-Ecommerce" }
          ].map(({ sosmed, account }, i) => (
            <>
              <Typography
                variant="h6"
                style={{ marginLeft: 10, marginTop: 20 }}
              >
                {sosmed}
              </Typography>
              <Typography variant="body1" style={{ marginLeft: 20 }}>
                {account}
              </Typography>
            </>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={4} alignItems="center" style={{ marginTop: 70 }}>
        <Grid item md={6}>
          <Typography variant="h5" style={{ margin: "40px 0 10px 0" }}>
            Berikan Kami Kritik & Saran Anda
          </Typography>
          <TextField
            placeholder="Masukkan kritik & Saran anda disini"
            multiline
            rows="10"
            id="outlined-required"
            className={classes.textField}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item md={6}>
          <img
            src={require("./logo.png")}
            style={{ width: 400, height: 80, marginLeft: 40 }}
          />
          <Typography
            variant="body1"
            align="center"
            style={{ margin: "20px 0" }}
          >
            &copy; Copyright 2019
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
