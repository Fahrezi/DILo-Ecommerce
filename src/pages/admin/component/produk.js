import React, { Component, Fragment } from "react";
import {
  Grid,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Modal,
  Typography,
  Box
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  link: {
    textDecoration: "none",
    color: "#fff"
  }
});

class product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Nama Produk", "Stok", "Terjual", "Kondisi", "Action"],
      tableBody: [
        // { judul: "Fashion Gampang Buat Kamu", dilihat: 400 },
        // { judul: "Fashion Susah Buat Kamu", dilihat: 100 },
        // { judul: "Fashion Gampang Buat Aku", dilihat: 50 }
      ],
      tambah: false
    };
  }

  getProduct = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/products")
      .then(response => response.json())
      .then(product => {
        this.setState(
          {
            tableBody: product.data
          },
          () => console.log(this.state.promo)
        );
      });
    // .then(log => console.log(log));
  };

  deleteProduct = (id, name) => {
    let result = window.confirm(`Anda Yakin Ingin Menghapus Produk ${name}`);

    if (result) {
      fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .then(() => this.getProduct())
        .catch(err => console.error(err));
    }

    // console.log(id);
  };

  componentDidMount() {
    this.getProduct();
  }

  render() {
    const { tableHead, tableBody } = this.state;
    console.log(this.props);
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
              Daftar Produk
            </Typography>
            <Link to="/admin/produk/tambah">
              <Button variant="contained" color="primary">
                Tambah
              </Button>
            </Link>
          </Box>
        </Box>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((data, i) => (
                  <TableCell key={i}>{data}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody.map(({ _id, name, stock, sold, active }, i) => (
                <TableRow key={i}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{stock}</TableCell>
                  <TableCell>{sold}</TableCell>
                  <TableCell>{active ? "Aktif" : "Tidak Aktif"}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        this.props.history.push(`/admin/produk/detail/${_id}`)
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => this.deleteProduct(_id, name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(product);
