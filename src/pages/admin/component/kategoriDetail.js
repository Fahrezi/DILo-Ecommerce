import React, { Component } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({});

class kategoriDetail extends Component {
  render() {
    const { match } = this.props;
    console.log(this.props);
    return (
      <div>
        <Typography variant="h6" align="center">
          Halo
        </Typography>
      </div>
    );
  }
}

export default withStyles(useStyles)(kategoriDetail);
