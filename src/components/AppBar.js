import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  useScrollTrigger,
  Box,
  Container,
  Grid,
  Button,
  Popper,
  Fade,
  List,
  ListItem,
  ListItemText,
  Paper,
  Menu,
  MenuItem
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, Link } from "react-router-dom";
import PopupState, { bindHover, bindMenu } from "material-ui-popup-state";

import { connect } from "react-redux";
import { logout } from "../store/actions/actionUser";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "0 150px"
  },
  appbar: {
    backgroundColor: "#fff",
    color: "#333"
  },
  toolbar: {
    padding: 0
  },
  paper: {
    padding: theme.spacing(1, 0),
    backgroundColor: theme.palette.background.paper,
    position: "absolute",
    top: 16,
    minWidth: 200,
    right: 0,
    transform: "translateX(50%)"
  },
  link: { textDecoration: "none", color: "#000" },
  account: { margin: "0 20px", color: "#000", textDecoration: "none" }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

function mapStateToProps(state) {
  const { reducerUser } = state;
  return {
    user: reducerUser.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
}

function ElevateAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "transitions-popper" : undefined;
  console.log(props.menu);

  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props} style={{ marginBottom: 10 }}>
        <AppBar className={classes.appbar}>
          <Container className={classes.container}>
            <Toolbar className={classes.toolbar}>
              <Link to="/">
                <img
                  src={require("./logo.png")}
                  alt=""
                  style={{ width: 100 }}
                />
              </Link>
              <Grid container style={{ marginLeft: 20 }}>
                {props.menu.map(({ name }, i) => (
                  <Grid key={i} item md={2} style={{ fontSize: 18 }}>
                    <PopupState variant="popover" popupId="demoMenu">
                      {popupState => (
                        <>
                          <NavLink
                            to={`/${name}`}
                            className={classes.link}
                            activeStyle={{
                              textAlign: "center",
                              color: "#f50057"
                            }}
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            {...bindHover(popupState)}
                          >
                            {name === "me" ? "account" : name}
                          </NavLink>
                          <Menu
                            {...bindMenu(popupState)}
                            getContentAnchorEl={null}
                            id="long-menu"
                            keepMounted
                            style={{ marginTop: 50, marginLeft: -140 }}
                          >
                            <Link to="/admin/promo/setHighlited">
                              <MenuItem onClick={popupState.close}>
                                Set Promo Highlighted
                              </MenuItem>
                            </Link>
                          </Menu>
                        </>
                      )}
                    </PopupState>
                  </Grid>
                ))}
              </Grid>
              <Button onClick={handleClick}>
                <PersonIcon />
              </Button>
              <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{ marginTop: 50, marginLeft: -30 }}
              >
                {props.user ? (
                  <>
                    <MenuItem button onClick={handleClose}>
                      <Link to="/me" className={classes.account}>
                        Akun Saya
                      </Link>
                    </MenuItem>
                    <MenuItem
                      button
                      onClick={() => {
                        props.logout();
                        handleClose();
                      }}
                    >
                      <Box component="p" className={classes.account}>
                        Logout
                      </Box>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem button onClick={handleClose}>
                      <Link to="/login" className={classes.account}>
                        Login
                      </Link>
                    </MenuItem>
                    <MenuItem button onClick={handleClose}>
                      <Link to="/register" className={classes.account}>
                        Register
                      </Link>
                    </MenuItem>
                    {/* <ListItem button>
                            {props.login}
                          </ListItem> */}
                  </>
                )}
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ElevateAppBar);
