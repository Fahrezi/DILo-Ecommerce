import React, { Component } from "react";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Slider from "react-slick";

const useStyles = theme => ({
  images: {
    width: "100%",
    borderRadius: 8
  }
});

const images = [
  { src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg") },
  { src: require("../../img-lib/karly-jones-qn9p8LB_gDc-unsplash.jpg") },
  { src: require("../../img-lib/lochlainn-riordan-AwAzZXf03n0-unsplash.jpg") }
];

const imagesNews = [
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Fashion Untuk Kamu"
  },
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Fashion Untuk Aku"
  },
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Kamu Untuk Fashion"
  },
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Fashion Untuk Kamu"
  },
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Fashion Untuk Aku"
  },
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    judul: "Kamu Untuk Fashion"
  }
];

class index extends Component {
  render() {
    const { classes } = this.props;
    const settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: false,
      speed: 500,
      arrow: true,
      nextArrow: <ChevronRightIcon color="primary" />,
      prevArrow: <ChevronLeftIcon color="primary" />,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoPlay: true
    };
    return (
      <div>
        <Slider {...settings}>
          {imagesNews.map(({ src, judul }, i) => (
            <Box component="div" key={i} position="relative">
              <img
                src={src}
                className={classes.images}
                alt="gambar"
                style={{ height: 500 }}
              />
              <Box
                component="div"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                bgcolor="rgba(0, 0, 0, .5)"
                borderRadius="8px"
              >
                <Typography
                  variant="h3"
                  style={{
                    position: "absolute",
                    bottom: 80,
                    left: 20,
                    color: "#fff"
                  }}
                >
                  {judul}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
        <Grid container spacing={3}>
          {imagesNews.map((data, i) => (
            <Grid item md={3}>
              <img
                src={data.src}
                className={classes.images}
                alt="gambar"
                style={{ height: 200 }}
              />
              <Link
                to={`/news/detail/${i}`}
                style={{
                  textDecoration: "none",
                  color: "#000"
                }}
              >
                <Typography variant="h5" style={{ marginLeft: 10 }}>
                  {data.judul}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles)(index);
