import React, { Component } from "react";
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
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = theme => ({
  link: {
    textDecoration: "none",
    color: "#fff"
  }
});

class newsTambah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      slug: "",
      thumbnail: "",
      thumbnailDesc: "",
      body: null
    };
  }

  changeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeHandlerFile = event => {
    let reader = new FileReader();
    const image = event.target.files[0];
    console.log(reader);

    reader.onloadend = () => {
      this.setState(
        {
          thumbnail: reader.result
        },
        () => console.log(this.state.thumbnail)
      );
    };
    reader.readAsDataURL(image);
    console.log("Halo");
  };

  addNews = () => {
    const { title, slug, thumbnail, thumbnailDesc, body } = this.state;
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/news", {
      method: "POST",
      body: JSON.stringify({
        title,
        thumbnail,
        thumbnailDesc,
        body,
        slug
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => res.json())
      .then(data => console.log(data));
    console.log("Masuk");
  };

  render() {
    const { title, slug, thumbnail, thumbnailDesc, body } = this.state;
    return (
      <>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8 }}
          py={2}
          pl={2}
          mb={5}
        >
          <Typography variant="body1" style={{ color: "#fff" }} align="left">
            Tambah News
          </Typography>
        </Box>
        <Box component="div" ml={2}>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Typography variant="body1">Judul Berita :</Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="title"
                id="my-input"
                value={title}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Typography variant="body1">Slug :</Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="slug"
                id="my-input"
                value={slug}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Typography variant="body1">Thumbnail :</Typography>
            </Grid>
            <Grid item md={9}>
              {thumbnail && (
                <img src={thumbnail} style={{ width: 100, height: 100 }} />
              )}
              <Button variant="contained" component="label">
                Upload Image
                <input
                  type="file"
                  name="thumbnail"
                  style={{ display: "none" }}
                  onChange={this.changeHandlerFile}
                />
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Typography variant="body1">Deskripsi Thumbnail :</Typography>
            </Grid>
            <Grid item md={9}>
              <TextField
                name="thumbnailDesc"
                id="my-input"
                value={thumbnailDesc}
                aria-describedby="my-helper-text"
                variant="outlined"
                fullWidth="true"
                onChange={this.changeHandler}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={3}>
              <Typography variant="body1">Isi Berita :</Typography>
            </Grid>
            <Grid item md={9}>
              <CKEditor
                editor={ClassicEditor}
                data={body}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({ body: data });
                }}
              />
            </Grid>
          </Grid>
        </Box>
        <Box component="div" display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.addNews()}
          >
            Simpan
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.props.history.push("/admin/news")}
          >
            Batal
          </Button>
        </Box>
      </>
    );
  }
}

export default newsTambah;
