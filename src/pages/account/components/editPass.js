import React, { Component } from "react";
import { Grid, Typography, Box, Button, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  textField: {
    width: "100%"
  }
});
class edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nama: "",
      email: "",
      phone: "",
      data: []
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  login = () => {
    const { nama, email, phone, data } = this.state;
    const dataProcess = {
      nama,
      email,
      phone
    };
    // const joined = this.state.data.concat(dataProcess)

    this.setState(
      {
        ...this.state,
        data: this.state.data.concat(dataProcess)
      },
      console.log(data)
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8, padding: "20px 50px" }}
        >
          <Typography component="h5" variant="h6" style={{ color: "#fff" }}>
            Edit Password
          </Typography>
        </Box>
        <Box component="div" style={{ padding: "50px 50px 50px 60px" }}>
          <Grid container spacing={3}>
            <Grid container direction="column">
              <Grid container spacing={5}>
                <Grid item md={4}>
                  <Typography component="div" variant="p">
                    <Box fontSize={18}>Alamat Email :</Box>
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography component="div" variant="p">
                    <Box fontSize={18}>luthfi0071@gmail.com</Box>
                  </Typography>
                </Grid>
              </Grid>
              {["newpass", "repeatpass"].map((data, i) => (
                <TextField
                  required
                  type="password"
                  name={data}
                  id={data}
                  label={
                    data === "newpass"
                      ? "Password Baru"
                      : "Ulangi Password Baru"
                  }
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  onChange={this.changeHandler}
                />
              ))}
            </Grid>
            <Grid container>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.login}
                style={{ textAlign: "right", marginRight: 15 }}
              >
                Simpan
              </Button>
              <Link to="/me">
                <Button
                  variant="outlined"
                  color="text.primary"
                  style={{ textAlign: "right" }}
                >
                  Batal
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles)(edit);
