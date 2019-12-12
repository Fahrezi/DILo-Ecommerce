import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import Edit from "./components/edit";
import EditPass from "./components/editPass";
import Tagihan from "./components/tagihan";

const useStyles = theme => ({
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: 20,
    margin: "13px 0",
    display: "block"
  }
});

function mapStateToProps(state) {
  console.log(state);
  const { reducerUser } = state;
  return {
    user: reducerUser.login
  };
}

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: ["", "tagihan"]
    };
  }
  render() {
    const { menu } = this.state;
    const { classes, user } = this.props;
    return (
      <>
        {!user ? (
          this.props.history.push("/login")
        ) : (
          <Router>
            <Grid container spacing={5}>
              <Grid item md={3}>
                <Box
                  component="div"
                  bgcolor="secondary.main"
                  style={{ borderRadius: 8, padding: "20px 20px" }}
                >
                  <Box component="div">
                    {menu.map((data, i) => (
                      <NavLink
                        to={`/me/${data}`}
                        className={classes.link}
                        activeStyle={{ color: "#fff" }}
                      >
                        {data === "" ? "Akun Saya" : "Tagihan Saya"}
                      </NavLink>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={9}>
                <Route exact path="/me">
                  <Box
                    component="div"
                    bgcolor="secondary.main"
                    style={{ borderRadius: 8, padding: "20px 50px" }}
                  >
                    <Typography
                      component="h5"
                      variant="h6"
                      style={{ color: "#fff" }}
                    >
                      Informasi Akun
                    </Typography>
                  </Box>
                  <Box component="div" style={{ padding: 50 }}>
                    <Grid container spacing={3}>
                      <Grid item md={4}>
                        {["Nama", "Alamat Email", "Password"].map((data, i) => (
                          <Typography key={i} component="div" variant="p">
                            <Box fontSize={18}>{data} :</Box>
                          </Typography>
                        ))}
                      </Grid>
                      <Grid item md={8}>
                        {["luthfi", "luthfi0071@gmail.com", "..."].map(
                          (data, i) => (
                            <Typography key={i} component="div" variant="p">
                              <Box fontSize={18}>
                                {data}
                                {i === 2 && (
                                  <Link to="/me/editPass">Ganti Password</Link>
                                )}
                              </Box>
                            </Typography>
                          )
                        )}
                      </Grid>
                    </Grid>
                    <Link to="/me/edit">
                      <Button
                        variant="contained"
                        color="secondary"
                        style={{ textAlign: "right" }}
                      >
                        Ubah
                      </Button>
                    </Link>
                  </Box>
                </Route>
                <Route path="/me/edit" component={Edit} />
                <Route path="/me/editPass" component={EditPass} />
                <Route path="/me/tagihan" component={Tagihan} />
              </Grid>
            </Grid>
          </Router>
        )}
      </>
    );
  }
}

export default withStyles(useStyles)(connect(mapStateToProps, null)(index));
