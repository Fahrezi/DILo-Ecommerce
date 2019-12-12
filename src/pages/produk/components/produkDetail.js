import React, { Component, Fragment } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120
  },
  produkLink: {
    textDecoration: "none",
    color: "#000",
    "& hover": {
      textDecoration: "underline"
    }
  }
});

class produkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      allProduct: [],
      selectedSize: "S",
      number: "1"
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getAllProduct(categoryId) {
    fetch("https://dilo-ecommerce.herokuapp.com/api/products")
      .then(res => res.json())
      .then(res => {
        const { data } = res;
        const filteredData = data.filter(
          data => data.categoryId === categoryId
        );
        this.setState(
          {
            allProduct: filteredData
          },
          () => console.log(this.state.allProduct)
        );
      });
  }

  getProduct(id) {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/products/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            product: data.data,
            selectedSize: data.data.size[0]
          },
          () => this.getAllProduct(this.state.product.categoryId)
        );
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProduct(id);
  }

  render() {
    const { product, allProduct, selectedSize, number } = this.state;

    const { classes } = this.props;
    return (
      <Fragment>
        <Grid container spacing={4}>
          <Grid item md={9}>
            <Grid container spacing={3}>
              <Grid item md={5}>
                <img
                  src={
                    product.images ? product.images[0].photo : this.state.images
                  }
                  style={{ width: "100%", height: 300 }}
                />
              </Grid>
              <Grid item md={7}>
                <Box
                  component="div"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Box component="div">
                    <Typography variant="h5">{product.name}</Typography>
                  </Box>
                  <Box component="div" style={{ marginTop: 5 }}>
                    {[
                      {
                        name: "Dilihat",
                        content: product.viewed === null ? 0 : product.viewed
                      },
                      { name: "Stok", content: product.stock },
                      { name: "Terjual", content: product.sold }
                    ].map(({ name, content }, i) => (
                      <Typography variant="body1" gutterBottom>
                        {name} : {content}
                      </Typography>
                    ))}
                  </Box>
                </Box>
                <Typography variant="h5" color="secondary">
                  {product.price}
                </Typography>
                <Box component="div" display="flex" alignItems="center">
                  <Typography variant="body1">Ukuran : </Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      name="selectedSize"
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={selectedSize}
                      onChange={this.changeHandler}
                    >
                      {product.size &&
                        product.size.map((data, i) => (
                          <MenuItem value={data} key={i}>
                            {data}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box component="div" display="flex" alignItems="center">
                  <Typography variant="body1">Jumlah : </Typography>
                  <TextField
                    name="number"
                    id="outlined-number"
                    value={number}
                    onChange={this.changeHandler}
                    type="number"
                    className={classes.textField}
                    // InputLabelProps={{
                    //   shrink: true
                    // }}
                    variant="outlined"
                  />
                </Box>
                <Button variant="contained" color="secondary">
                  Pesan Sekarang
                </Button>
              </Grid>
            </Grid>
            <Box component="div">
              <Typography variant="h5" style={{ margin: "20px 0" }}>
                Description
              </Typography>
              <Typography variant="p">{product.description}</Typography>
            </Box>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h6" gutterBottom>
              Produk serupa
            </Typography>
            {allProduct ? (
              allProduct.slice(0, 2).map(({ image, name, price, _id }, i) => (
                <>
                  <img
                    src={image.photo}
                    alt={image.description}
                    style={{ width: "100%" }}
                  />
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="space-between"
                    mb={4}
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
                </>
              ))
            ) : (
              <Typography variant="body1">Not Found</Typography>
            )}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(produkDetail);
