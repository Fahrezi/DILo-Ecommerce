import React, { Component } from "react";
import { Grid, Typography, Box, Drawer, Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { withStyles } from "@material-ui/core/styles";
import { Route, NavLink, Switch, Redirect, Link } from "react-router-dom";

import User from "./component/user";
import Home from "./component/home";
import Promo from "./component/promo";
import PromoTambah from "./component/promoTambah";
import HighlitedPromo from "./component/promoHighlited";
import News from "./component/news";
import NewsTambah from "./component/newsTambah";
import NewsDetail from "./component/newsDetail";
import Kategori from "./component/kategori";
import KategoriTambah from "./component/kategoriTambah";
import KategoriDetail from "./component/kategoriDetail";
import Produk from "./component/produk";
import ProdukTambah from "./component/produkTambah";
import ProdukDetail from "./component/produkDetail";
import KritikDanSaran from "./component/masukan";
import Pesan from "./component/pesan";

const useStyle = theme => ({
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: 20,
    lineHeight: 2
  }
});

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: true,
      menu: [
        "pesan",
        "user",
        "home",
        "promo",
        "news",
        "kategori",
        "produk",
        "kritik & saran"
      ],
      breadcrumb: this.props.location.pathname.split("/").slice(1)
    };
  }

  render() {
    const { admin, menu, breadcrumb } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {!admin ? (
          <Typography component="h2">Youre Not Fuckin Admin ! :p</Typography>
        ) : (
          <>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {this.props.location.pathname
                .split("/")
                .slice(1)
                .map((data, i) => (
                  <Link key={i} className={classes.link}>
                    {data}
                  </Link>
                ))}
            </Breadcrumbs>
            <Grid container spacing={5}>
              <Grid item md={3}>
                <Box
                  component="div"
                  bgcolor="secondary.main"
                  style={{ borderRadius: 8, padding: "20px 0" }}
                >
                  <Box component="div" style={{ paddingLeft: 40 }}>
                    {menu.map((data, i) => (
                      <Typography
                        component="h4"
                        style={{ color: "#fff" }}
                        align="left"
                        key={i}
                      >
                        <NavLink
                          to={`/admin/${
                            data === "kritik & saran" ? "kritikDanSaran" : data
                          }`}
                          className={classes.link}
                          activeStyle={{ color: "#fff" }}
                        >
                          {data}
                        </NavLink>
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item md={9}>
                <Switch>
                  {/* <Redirect from="/admin" to="/admin/user" /> */}
                  <Route path="/admin/user" component={User} />
                  <Route path="/admin/home" component={Home} />
                  <Route exact path="/admin/promo" component={Promo} />
                  <Route path="/admin/promo/tambah" component={PromoTambah} />
                  <Route
                    path="/admin/promo/setHighlited"
                    component={HighlitedPromo}
                  />
                  <Route exact path="/admin/news" component={News} />
                  <Route path="/admin/news/tambah" component={NewsTambah} />
                  <Route path="/admin/news/detail/:id" component={NewsDetail} />
                  <Route exact path="/admin/kategori" component={Kategori} />
                  <Route
                    path="/admin/kategori/tambah"
                    component={KategoriTambah}
                  />
                  <Route
                    path="/admin/kategori/:id"
                    component={KategoriDetail}
                  />
                  <Route exact path="/admin/produk" component={Produk} />
                  <Route path="/admin/produk/tambah" component={ProdukTambah} />
                  <Route
                    path="/admin/produk/detail/:id"
                    component={ProdukDetail}
                  />
                  <Route
                    path="/admin/produk/edit/:id"
                    component={ProdukTambah}
                  />
                  <Route
                    path="/admin/kritikDanSaran"
                    component={KritikDanSaran}
                  />
                  <Route path="/admin/pesan" component={Pesan} />
                </Switch>
              </Grid>
            </Grid>
          </>
        )}
      </div>
    );
  }
}

export default withStyles(useStyle)(index);
