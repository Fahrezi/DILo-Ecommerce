import React, { Component } from "react";
import { TextField, Typography, Button, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { login } from "../../../store/actions/actionUser";
import { connect } from "react-redux";
import { Route, Link, withRouter } from "react-router-dom";

import Home from "../../home/index";

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
  const { reducerUser } = state;
  return {
    user: reducerUser.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginFunc: user => dispatch(login(user))
  };
}

// const token = localStorage.getItem("token");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
      // login: token ? true : false
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // login = data => {
  //   fetch("https://dilo-ecommerce.herokuapp.com/api/login", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       localStorage.setItem("token", data.token);
  //       return data.token;
  //     })
  //     .then(token => {
  //       this.setState({
  //         login: token ? true : false
  //       });
  //     })
  //     .then(() => {
  //       if (this.state.login) {
  //         alert("Anda Berhasil Masuk!");
  //         this.props.history.push("/home");
  //       } else {
  //         alert("Gagal !");
  //       }
  //     });
  // };

  onSubmit = (data, e) => {
    const { loginFunc } = this.props;
    loginFunc(data);
    e.preventDefault();
    console.log(this.props.user);
  };

  render() {
    const { classes } = this.props;
    const data = {
      credential: this.state.email,
      password: this.state.password
    };
    const { user } = this.props;

    return (
      <div>
        {user ? (
          this.props.history.push("/me")
        ) : (
          // <h2>Anda Masuk</h2>
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
              Masukkan Data Anda
            </Typography>
            <form>
              <Grid container direction="column" style={{ width: 400 }}>
                {["email", "password"].map(data => (
                  <TextField
                    required
                    type={data === "password" ? "password" : "text"}
                    name={data}
                    id={data}
                    label={data}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={this.changeHandler}
                  />
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={e => {
                    this.onSubmit(data, e);
                  }}
                  style={{ marginTop: 40 }}
                >
                  Login
                </Button>
              </Grid>
            </form>
            <Link to="/register" className={classes.handler}>
              Daftar
            </Link>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))
);
