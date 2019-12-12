import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Backdrop,
  Fade,
  Modal,
  Button
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { withStyles } from "@material-ui/core/styles";
import Slider from "react-slick";

const useStyles = theme => ({
  images: {
    width: "100%",
    height: 350,
    borderRadius: 8
  },
  paper: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3, 2),
    borderRadius: 8
  },
  firstModal: {
    minWidth: 500,
    maxWidth: 1000,
    width: 800,
    height: 500,
    position: "absolute",
    top: 100,
    right: "50%",
    transform: "translateX(50%)",
    borderRadius: 8
  }
});

const imagesPop = [
  {
    src: require("../../img-lib/julia-peretiatko-dyoagCegdvs-unsplash.jpg"),
    name: "baju",
    price: "250000"
  },
  {
    src: require("../../img-lib/karly-jones-qn9p8LB_gDc-unsplash.jpg"),
    name: "celana",
    price: "100000"
  },
  {
    src: require("../../img-lib/lochlainn-riordan-AwAzZXf03n0-unsplash.jpg"),
    name: "sepatu",
    price: "7000000"
  },
  {
    src: require("../../img-lib/fabrizio-conti-UtDX2hUydf0-unsplash.jpg"),
    name: "tas",
    price: "400000"
  },
  {
    src: require("../../img-lib/heather-ford-6fiz86Ql3UA-unsplash.jpg"),
    name: "dompet",
    price: "300000"
  }
];

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      promo: [],
      products: []
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  getPromo = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/promos")
      .then(response => response.json())
      .then(promo => {
        this.setState(
          {
            promo: promo.data
          },
          () => console.log(this.state.promo)
        );
      });
    // .then(log => console.log(log));
  };

  getProduct = () =>
    fetch("https://dilo-ecommerce.herokuapp.com/products")
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data.data
        });
      });

  componentDidMount() {
    window.setTimeout(this.handleOpen, 3000);

    this.getPromo();
  }

  render() {
    const { classes } = this.props;
    const { open, promo } = this.state;
    const settings = {
      dots: true,
      dotsClass: "slick-dots slick-thumb",
      infinite: false,
      speed: 500,
      arrow: true,
      nextArrow: <ChevronRightIcon color="primary" />,
      prevArrow: <ChevronLeftIcon color="primary" />
    };

    return (
      <Fragment>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <Box component="div" position="relative">
              <img src={imagesPop[0].src} className={classes.firstModal} />
              <Button
                style={{
                  position: "absolute",
                  right: 280,
                  top: 100,
                  color: "#fff",
                  fontSize: 24
                }}
                onClick={this.handleClose}
              >
                X
              </Button>
            </Box>
          </Fade>
        </Modal>
        <Grid container spacing={6}>
          <Grid item md={8}>
            <Grid container spacing={2} direction="column">
              <Grid item md={12}>
                <Slider
                  {...settings}
                  slidesToShow="1"
                  slidesToScroll="2"
                  autoplay="true"
                  infinite="true"
                >
                  {promo != undefined &&
                    promo.map(({ banner }, i) => (
                      <div>
                        <Link to="/promo">
                          <img
                            src={`https://dilo-ecommerce.herokuapp.com/uploads/${banner}`}
                            className={classes.images}
                          />
                        </Link>
                      </div>
                    ))}
                </Slider>
              </Grid>
              <Grid item md={12}>
                <Paper elevation="0" className={classes.paper}>
                  <Typography variant="h4" align="center">
                    Tampil "Toko Belanja !Nomor 1"
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} bgcolor="secondary.main">
            <img
              src={imagesPop[1].src}
              style={{ width: "100%", height: "100%", borderRadius: 8 }}
            />
          </Grid>
        </Grid>
        {["Terkenal", "Termurah", "Terbaru"].map((data, i) => (
          <Box component="div" mt={i === 0 ? 12 : 9}>
            <Typography variant="h4" gutterBottom>
              Produk {data}
            </Typography>
            <Slider
              {...settings}
              slidesToShow="4"
              slidesToScroll="1"
              dots="false"
            >
              {imagesPop.map((data, i) => (
                <Box component="div" px={1}>
                  <img
                    src={data.src}
                    className={classes.images}
                    style={{ height: 150 }}
                  />
                  <Typography variant="h5">{data.name}</Typography>
                  <Typography variant="p">Rp.{data.price}</Typography>
                </Box>
              ))}
            </Slider>
          </Box>
        ))}
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(index);
