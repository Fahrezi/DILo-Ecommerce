import React, { Component, Fragment } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Box,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  textField: {
    width: 200,
    marginRight: theme.spacing(5)
  }
});

class promoHighlited extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPromo: [],
      beforehighlited: "Desember ber ber",
      afterHighlited: "Desember ber ber"
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getPromo = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/promos")
      .then(response => response.json())
      .then(promo => {
        this.setState(
          {
            listPromo: promo.data
          },
          () => console.log(this.state.promo)
        );
        return promo.data;
      });
    // .then(log => console.log(log));
  };

  componentDidMount() {
    this.getPromo();
  }

  render() {
    const { listPromo, beforeHighlited, afterHighlited } = this.state;
    return (
      <>
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
        <Box component="div" display="flex" alignItems="center">
          <Typography variant="h6">Promo Highlited : </Typography>
          <Select
            name="afterHighlited"
            variant="outlined"
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={afterHighlited}
            onChange={this.changeHandler}
          >
            {listPromo.map(({ name }, i) => (
              <MenuItem key={i} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </>
    );
  }
}

export default promoHighlited;
