import React, { Component, Fragment } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Box,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = theme => ({
  textField: {
    width: 200,
    marginRight: theme.spacing(5)
  }
});

class tambahPromo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      namePromo: "",
      image: null,
      mulai: null,
      akhir: null,
      imgPreview: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerFile = event => {
    let reader = new FileReader();
    let image = event.target.files[0];
    console.log(reader);

    reader.onloadend = () => {
      this.setState(
        {
          image,
          imgPreview: reader.result
        },
        () => console.log(this.state.image)
      );
    };

    reader.readAsDataURL(image);
  };

  addPromo = () => {
    const { namePromo, imgPreview, mulai, akhir } = this.state;
    const data = {
      name: namePromo,
      banner: imgPreview,
      startDate: mulai,
      dueDate: akhir
    };
    // console.log(data);
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/promos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
        // "Access-Control-Allow-Origin": true
      }
    })
      .then(response => response.json())
      // .then(data => alert(data.message));
      .then(data => console.log(data));
  };

  render() {
    const { classes } = this.props;
    const { imgPreview } = this.state;
    return (
      <Fragment>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8 }}
          py={2}
          mb={5}
        >
          <Box
            component="div"
            px={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="h4" style={{ color: "#fff" }} align="left">
              Tambah Promo
            </Typography>
          </Box>
        </Box>
        <TextField
          name="namePromo"
          id="my-input"
          aria-describedby="my-helper-text"
          variant="outlined"
          label="Nama Promo"
          fullWidth="true"
          onChange={this.changeHandler}
        />
        <Box display="flex" mt={3}>
          <TextField
            name="mulai"
            id="date"
            label="Promo Mulai"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={this.changeHandler}
          />
          <TextField
            name="akhir"
            id="date"
            label="Promo Berakhir"
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            variant="outlined"
            onChange={this.changeHandler}
          />
        </Box>
        <Button variant="contained" component="label">
          Upload Image
          <input
            type="file"
            name="image"
            style={{ display: "none" }}
            onChange={this.changeHandlerFile}
          />
        </Button>
        {imgPreview && (
          <img src={imgPreview} style={{ width: 100, height: 100 }} />
        )}
        <Box component="div" mt={5}>
          <Button variant="contained" color="primary" onClick={this.addPromo}>
            Simpan
          </Button>
          <Link to="/admin/promo">
            <Button variant="contained">Batal</Button>
          </Link>
        </Box>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(tambahPromo);
