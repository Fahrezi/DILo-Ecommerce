import React, { Component } from "react";
import {
  TextField,
  Typography,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { register, reset } from "../../../store/actions";

const useStyles = theme => ({
  textField: {
    width: "100%"
  },
  handler: {
    textAlign: "right",
    margin: "20px 0 30px 0",
    fontSize: 18,
    textDecoration: "none",
    color: theme.palette.text.primary
  }
});

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: user => dispatch(register(user)),
    reset: () => dispatch(reset())
  };
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPass: "",
      username: "",
      gender: "Laki-laki",
      phone: "",
      data: []
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeField = (data, e) => {
    let newData = this.state.data.slice();
    newData[data] = e.target.value;
    this.setState({
      data: newData
    });
  };

  register = data => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        if (data.message === "Registration Success")
          this.props.history.push("/login");
      })
      .then(data => console.log(data));
  };

  onSubmit = (data, event) => {
    this.register(data);
    event.preventDefault();
    console.log(data);
  };

  render() {
    const { classes, register, user, reset } = this.props;
    const {
      email,
      password,
      username,
      gender,
      phone,
      data,
      confirmPass
    } = this.state;
    const newData = {
      username,
      email,
      gender,
      phone,
      password,
      password_confirmation: confirmPass
    };

    return (
      <div>
        <Grid
          container
          direction="column"
          style={{ width: 400, margin: "0 auto" }}
        >
          <Typography
            component="h2"
            variant="h4"
            align="center"
            style={{ margin: "50px 0 40px 0" }}
          >
            Daftarkan Diri Anda
          </Typography>
          <form>
            <Grid container direction="column" style={{ width: 400 }}>
              {["email", "password", "confirmPass", "username", "phone"].map(
                (data, i) => (
                  <TextField
                    required
                    type={
                      data === "password" || data === "confirmPass"
                        ? "password"
                        : "text"
                    }
                    key={i}
                    name={data}
                    id="standard-required"
                    label={data === "confirmPass" ? "Confirm Password" : data}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.changeHandler}
                    value={this.state.data[i]}
                  />
                )
              )}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="gender"
                  value={gender}
                  onChange={this.changeHandler}
                  // labelWidth={labelWidth}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                  <MenuItem value="Perempuan">Perempuan</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={
                  // () => {
                  //   console.log(this.state.data);
                  //   this.setState({
                  //     data: []
                  //   });
                  // }
                  e => {
                    this.onSubmit(newData, e);
                  }
                  // () => {
                  //   this.setState({
                  //     email: "",
                  //     password: "",
                  //     confirmPass: "",
                  //     username: "",
                  //     gender: "Laki-laki",
                  //     phone: ""
                  //   });
                  //   console.log(email);
                  // }
                }
                // onClick={(e) => {
                //   this.onSubmit(newData, e);
                // console.log(user);
                // }}
                style={{ marginTop: 40 }}
              >
                Login
              </Button>
              {/* <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                reset();
                console.log(user);
                console.log("halo");
              }}
            >
              reset
            </Button> */}
            </Grid>
          </form>
          <Link to="/login" className={classes.handler}>
            Daftar
          </Link>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
