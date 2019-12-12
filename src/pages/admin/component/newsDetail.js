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

class newsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {}
    };
  }

  getNews(slug) {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/news/${slug}`)
      .then(res => res.json())
      .then(data => {
        this.setState(
          {
            news: data.data
          },
          () => console.log(this.state.news)
        );
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    console.log("halo");
    this.getNews(id);
  }

  render() {
    const { classes } = this.props;
    const { news } = this.state;
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
            Detail Berita
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              this.props.history.push(`/admin/produk/edit/${news._id}`)
            }
          >
            Edit
          </Button>
        </Box>
        <Box component="div" ml={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Judul Berita :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{news.title}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Dilihat :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{news.viewed}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Slug :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{news.slug}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Thumbnail :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {news.thumbnail && (
                <img src={news.thumbnail} style={{ width: 300, height: 200 }} />
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Deskripsi Thumbnail :
              </Typography>
            </Grid>
            <Grid item md={9}>
              <Typography variant="body1">{news.thumbnailDesc}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item md={3}>
              <Typography variant="body1" className={classes.text}>
                Isi Berita :
              </Typography>
            </Grid>
            <Grid item md={9}>
              {news.body}
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

export default withStyles(useStyles)(newsDetail);
