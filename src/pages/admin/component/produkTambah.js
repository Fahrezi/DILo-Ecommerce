import React, { Component, Fragment } from "react";
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
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

class produkTambah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      category: [],
      kategori: {},
      name: "",
      price: "",
      size: [],
      description: null,
      stock: 0,
      discount: 0,
      photo: "",
      photoDescription: "",
      imgPreview: ""
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerSize = (size, event) => {
    console.log(event.target);
    if (event.target.checked) {
      this.setState({
        size:
          this.state.size === undefined
            ? this.state.size.push(size)
            : this.state.size.concat(size)
      });
    } else {
      const sized = this.state.size.filter(value => value != size);
      this.setState({
        size: sized
      });
    }
    console.log(this.state.size);
  };

  changeHandlerFile = event => {
    let reader = new FileReader();
    let image = event.target.files[0];
    console.log(reader);

    reader.onloadend = () => {
      this.setState(
        {
          imgPreview: reader.result
        },
        () => console.log(this.state.image)
      );
    };

    reader.readAsDataURL(image);
  };

  getCategory() {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/list-categories`)
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            category: data.data,
            kategori: data.data[0]
          },
          () => console.log(this.state.kategori)
        );
      });
  }

  addProduct = () => {
    const {
      kategori,
      name,
      price,
      size,
      description,
      stock,
      discount,
      photo,
      photoDescription,
      imgPreview,
      product
    } = this.state;
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/products", {
      method: "POST",
      body: {
        categoryId: kategori._id,
        name,
        price,
        size,
        description,
        stock,
        discount,
        photo: imgPreview,
        photoDescription
      },
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  getProduct(id) {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/products/${id}`)
      .then(res => res.json())
      .then(product => {
        const { name, price, description, stock, discount } = product.data;
        this.setState({
          name,
          price,
          description,
          stock,
          discount
        });
      });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.getProduct(id);
    }
    this.getCategory();
  }

  render() {
    const { classes } = this.props;
    const {
      kategori,
      category,
      name,
      price,
      size,
      description,
      stock,
      discount,
      photo,
      photoDescription,
      imgPreview,
      product
    } = this.state;
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
            Tambah Produk
          </Typography>
        </Box>
        <Box component="div" ml={2}>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Kategori Barang :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Select
                name="kategori"
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                variant="outlined"
                value={kategori.name}
                onChange={this.changeHandler}
              >
                {category.map((data, i) => (
                  <MenuItem value={data}>{data.name}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Nama Produk :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="name"
                id="my-input"
                value={name}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Harga Produk :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="price"
                id="my-input"
                value={price}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Ukuran :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Box component="div" display="flex" alignItems="center" mt={1}>
                {["S", "M", "L", "XL"].map((data, i) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={data}
                        onChange={e => this.changeHandlerSize(data, e)}
                      />
                    }
                    label={data}
                    key={i}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Deskripsi :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <CKEditor
                name="description"
                editor={ClassicEditor}
                data="Masukkan Deskripsi"
                value={description}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ description: data });
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Banyak Barang :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                type="number"
                name="stock"
                id="my-input"
                value={stock}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Diskon :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                type="number"
                name="discount"
                id="my-input"
                value={discount}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Gambar Produk :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {imgPreview && (
                <img src={imgPreview} style={{ width: 100, height: 100 }} />
              )}
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  name="image"
                  style={{ display: "none" }}
                  onChange={this.changeHandlerFile}
                />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Deskripsi Photo :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="description"
                id="my-input"
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Box component="div" display="flex" mt={4}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 20 }}
              onClick={() => this.addProduct()}
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
          </Box>
        </Box>
      </>
    );
  }
}

export default withStyles(useStyles)(produkTambah);
