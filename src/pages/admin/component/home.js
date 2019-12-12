import React, { Component } from "react";
import { Grid, Box, Typography, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      makeDescription: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  componentDidMount() {}

  render() {
    const { description, makeDescription } = this.state;
    return (
      <>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8 }}
          pl={2}
          py={2}
          mb={5}
        >
          <Typography component="h4" style={{ color: "#fff" }} align="left">
            Tampilan Umum
          </Typography>
        </Box>
        <Box component="div" ml={2}>
          <Typography variant="h5">Footer</Typography>
          <Typography variant="body1">Description</Typography>
          {description ? (
            <Typography variant="body1">
              Mini Projek Ini Dimaksud Untuk Mempertanggungjawabkan Materi Yang
              Telah Disampaikan kepada Kami
            </Typography>
          ) : (
            <>
              <TextField
                name="makeDescription"
                id="my-input"
                value={makeDescription}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                placeHolder="Isi Deskripsi Baru..."
                onChange={this.changeHandler}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 15 }}
              >
                Simpan
              </Button>
            </>
          )}
        </Box>
      </>
    );
  }
}

export default home;
