import React, { Component, Fragment } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  images: {
    width: "100%",
    height: 200,
    borderRadius: 8
  },
  produkLink: {
    textDecoration: "none",
    color: "#000",
    "& hover": {
      textDecoration: "underline"
    }
  }
});

const images = [
  { src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg") },
  { src: require("../../img-lib/karly-jones-qn9p8LB_gDc-unsplash.jpg") },
  { src: require("../../img-lib/lochlainn-riordan-AwAzZXf03n0-unsplash.jpg") }
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: "Terpopuler",
      product: [],
      promo: []
    };
  }

  sorting() {
    const { product, sort } = this.state;
    this.props.history.push(`/produk?sort=${sort}`);
    console.log(this.props);
    const { search } = this.props.location;
    switch (sort) {
      case "Harga Termurah":
        this.setState({
          product: product.sort((a, b) => a.price - b.price)
        });
        break;
      case "Terbaru":
        this.setState({
          product: product.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        });
        break;
      case "Terpopuler":
        this.setState({
          product: product.sort((a, b) => a.viewed - b.viewed)
        });
        break;
      default:
        return this.state.product;
    }
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value }, () =>
      this.sorting()
    );
  };

  getProduct() {
    fetch("https://dilo-ecommerce.herokuapp.com/api/products")
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            product: data.data
          },
          () => console.log(this.state.product)
        );
      });
  }

  getPromo() {
    fetch("https://dilo-ecommerce.herokuapp.com/api/promos")
      .then(res => res.json())
      .then(data => {
        this.setState({
          promo: data.data
        });
      });
  }

  componentDidMount() {
    this.getProduct();
    this.getPromo();
    console.log("halo");
  }

  render() {
    const { classes } = this.props;
    const { sort, product, promo } = this.state;
    return (
      <Fragment>
        <Grid container spacing={3}>
          {promo.slice(0, 5).map(({ banner }, i) => (
            <Grid item md={4}>
              <img src={banner} className={classes.images} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" style={{ margin: "10px 0" }}>
          {this.props.location.pathname
            .split("/")
            .slice(1)
            .join(" > ")}
        </Typography>
        <Grid container spacing={3} style={{ marginTop: 50 }}>
          <Grid item md={3}>
            <Typography variant="h5" gutterBottom>
              Semua Produk
            </Typography>
            <Typography variant="h6">Kategori</Typography>
            <FormGroup aria-label="kategori" column>
              {["Baju", "Celana", "Tas", "Sepatu"].map((data, i) => (
                <FormControlLabel
                  value={data}
                  control={<Checkbox color="primary" />}
                  label={data}
                  labelPlacement="end"
                  key={i}
                />
              ))}
            </FormGroup>
          </Grid>
          <Grid item md={9}>
            <Grid container spacing={3} alignItems="center">
              <Typography variant="h6">Urutkan Berdasarkan : </Typography>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="sort"
                  value={sort}
                  onChange={this.changeHandler}
                >
                  <MenuItem value="Harga Termurah">Harga Termurah</MenuItem>
                  <MenuItem value="Terpopuler">Terpopuler</MenuItem>
                  <MenuItem value="Terbaru">Terbaru</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container spacing={4} style={{ marginTop: 50 }}>
              {product.map(({ image, _id, name, price }, i) => (
                <Grid item md={4} key={i}>
                  <img
                    src={image ? image.photo : images[0].src}
                    alt={image ? image.description : "Apa aja"}
                    className={classes.images}
                  />
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="space-between"
                    alignItems="start"
                  >
                    <Link
                      to={`produk/detail/${_id}`}
                      className={classes.produkLink}
                    >
                      <Typography variant="h5">{name}</Typography>
                    </Link>
                    <Typography variant="p" color="secondary">
                      {price}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(index);
