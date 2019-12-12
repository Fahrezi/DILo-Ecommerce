import React, { Component } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox
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
  },
  text: {
    lineHeight: 3.5
  }
});

class produkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: []
    };
  }

  getProduct(id) {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/products/${id}`)
      .then(res => res.json())
      .then(product => {
        this.setState({
          product: product.data
        });
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getProduct(id);
  }

  render() {
    const { product } = this.state;
    const { classes } = this.props;
    console.log(product);
    return (
      <>
        <Box
          component="div"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="secondary.main"
          style={{ borderRadius: 8 }}
          px={2}
          py={2}
          mb={5}
        >
          <Typography component="h4" style={{ color: "#fff" }} align="left">
            Detail Produk
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.props.history.push(`/admin/produk/edit/${product._id}`)
            }
          >
            Edit
          </Button>
        </Box>
        <Box component="div" ml={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Kategori Barang :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {product.categoryId && (
                <Typography variant="body1">
                  {product.categoryId.name}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Nama Produk :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{product.name}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Ukuran :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {product.size != undefined && (
                <Box component="div" display="flex" alignItems="center" mt={1}>
                  {product.size.join(" , ")}
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Deskripsi :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{product.description}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Sisa Barang :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{product.stock}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Barang Terjual :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{product.sold}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Diskon :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{product.discount}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Gambar Produk :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {product.image &&
                product.image.map((data, i) => (
                  <img
                    src={`https://dilo-ecommerce.herokuapp.com/api/${data.photo}`}
                    key={i}
                  />
                ))}
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Deskripsi Photo :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {product.image != undefined && (
                <Typography variant="body1">
                  {product.image.description}
                </Typography>
              )}
            </Grid>
          </Grid>
          {/* <Box component="div" display="flex" mt={4}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 20 }}
            >
              Simpan
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.history.push("/admin/produk")}
            >
              Batal
            </Button>
          </Box> */}
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles)(produkDetail);
