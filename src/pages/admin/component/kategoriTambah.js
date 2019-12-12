import React, { Component } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  list: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

class Pesan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    const { tableBody } = this.state;
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
            Tambah Kategori
          </Typography>
        </Box>
        <Typography variant="h6">Nama Kategori :</Typography>
        <TextField
          required
          id="outlined-required"
          defaultValue="Hello World"
          className={classes.textField}
          margin="normal"
          variant="outlined"
        />
        <Box
          component="div"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Sub Kategori :</Typography>
          <Box component="div" display="flex" alignItems="center">
            <TextField
              required
              id="outlined-required"
              defaultValue="Hello World"
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 20 }}
            >
              Tambah
            </Button>
          </Box>
        </Box>
        <List className={classes.list}>
          <ListItem>
            <ListItemText primary="Tas" />
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="Tas" />
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </ListItem>
          <ListItem>
            <ListItemText primary="Tas" />
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </ListItem>
        </List>
        <Box display="flex" alignItems="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 20 }}
          >
            Simpan
          </Button>
          <Button variant="contained" color="secondary">
            Batal
          </Button>
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles)(Pesan);
