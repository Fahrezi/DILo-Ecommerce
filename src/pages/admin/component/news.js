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

const useStyles = theme => ({
  link: {
    textDecoration: "none",
    color: "#fff"
  }
});

class news extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Judul Berita", "Dilihat", "Aksi"],
      tableBody: [
        // { judul: "Fashion Gampang Buat Kamu", dilihat: 400 },
        // { judul: "Fashion Susah Buat Kamu", dilihat: 100 },
        // { judul: "Fashion Gampang Buat Aku", dilihat: 50 }
      ],
      tambah: false
    };
  }

  getNews = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/news")
      .then(response => response.json())
      .then(news => {
        this.setState(
          {
            tableBody: news.data
          },
          () => console.log(this.state.promo)
        );
      });
    // .then(log => console.log(log));
  };

  deleteNews = (id, name) => {
    let result = window.confirm(`Anda Yakin Ingin Menghapus Berita ${name}`);

    if (result) {
      fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/news/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .then(() => this.getNews())
        .catch(err => console.error(err));
    }

    // console.log(id);
  };

  componentDidMount() {
    this.getNews();
  }

  render() {
    const { tableHead, tableBody } = this.state;
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
              Daftar News
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/admin/news/tambah")}
            >
              Tambah
            </Button>
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
              {tableBody.map(({ title, viewed, _id, slug }, i) => (
                <TableRow key={i}>
                  <TableCell>{title}</TableCell>
                  <TableCell>{viewed}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        this.props.history.push(`/admin/news/detail/${slug}`)
                      }
                    >
                      Detail
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => this.deleteNews(_id, title)}
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

export default withStyles(useStyles)(news);
