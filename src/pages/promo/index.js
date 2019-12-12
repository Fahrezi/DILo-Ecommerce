import React, { Component, Fragment } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  images: {
    width: "100%",
    height: 500,
    borderRadius: 8
  }
});

class index extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <img
          src={require("../../img-lib/houston-ray-bkZlpn5iMEM-unsplash.jpg")}
          className={classes.images}
        />
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(index);
