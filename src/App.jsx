import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { Container, Box, Popover, Typography, Menu, MenuItem } from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { withStyles } from "@material-ui/styles";
import history from "./history";

import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import Account from "./pages/authUser";
import Detail from "./pages/account";
import Home from "./pages/home";
import Login from "./pages/authUser/components/Login";
import Register from "./pages/authUser/components/Register";
import Admin from "./pages/admin";
import News from "./pages/news";
import NewsDetail from "./pages/news/components/detailNews";
import Promo from "./pages/promo";
import Produk from "./pages/produk";
import ProdukDetail from "./pages/produk/components/produkDetail";
import About from "./components/about";
// import Kontak from "./components/contact";

const useStyles = theme => ({
  container: {
    padding: "0 150px"
  },
  liveChat: {
    borderColor: "#fff",
    cursor: "pointer"
  },
  formChat: {
    margin: "20px 10px",
    width: 220,
    height: 280
  }
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff5757"
    }
  }
})

const LiveChat = ({ classes }) => (
  <PopupState variant="popover" popupId="demoPopover">
    {popupState => (
      <div>
        <Box component="div"
          bgcolor="secondary.main"
          position="fixed"
          bottom="40px"
          right="40px"
          width="75px"
          height="75px"
          borderRadius="50%"
          border={3}
          className={classes.liveChat}
          {...bindTrigger(popupState)}
        >
          <ChatIcon style={{ marginTop: 18, marginLeft: 18 }} fontSize="large" />
        </Box>
        <Popover
          {...bindPopover(popupState)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Box component="div" className={classes.formChat}>
            <Typography variant="h6">Dimaksudkan agar digunakan sebagaimana nya untuk keperluan mengumpulkan informasi yang anda butuhkan</Typography>
          </Box>
        </Popover>
      </div>
    )}
  </PopupState>
)

// const NavMenu = () => (
//   <PopupState variant="popover" popupId="demoMenu">
//     {popupState => (
//       <div>
//         <IconButton
//           aria-label="more"
//           aria-controls="long-menu"
//           aria-haspopup="true"
//           {...bindTrigger(popupState)}
//         >
//           <MoreVertIcon />
//         </IconButton>
//         <Menu
//           {...bindMenu(popupState)}
//           id="long-menu"
//           keepMounted
//           style={{ marginTop: 50, marginLeft: -140 }}
//           TransitionComponent={Grow}
//         >
//           <Link to="/admin/promo/setHighlited">
//             <MenuItem onClick={popupState.close}>
//               Set Promo Highlighted
//             </MenuItem>
//           </Link>
//         </Menu>
//       </div>
//     )}
//   </PopupState>
// );

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: ["news", "baju"],
      newsContent: <h1>Halo</h1>,
      menu: [],
      NavMenu: <h1>Halo</h1>
    }
  }

  getNews() {
    fetch("https://dilo-ecommerce.herokuapp.com/api/news")
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data.data,
        }, () => console.log(this.state.newsContent))
      })
  }

  getMenu() {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/categories")
      .then(res => res.json())
      .then(data => {
        this.setState({
          menu: data.data,
        })
      })
  }

  componentDidMount() {
    this.getNews()
    this.getMenu()
  }

  render() {
    const { classes } = this.props;
    const { newsContent, news, menu } = this.state;
    return (
      <Router history={history}>
        <AppBar menu={menu} />
        <Container className={classes.container} style={{ marginTop: 50 }}>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/me" component={Detail} />
          <Route path="/admin" component={Admin} />
          <Route exact path="/news" component={News} />
          <Route path="/news/detail/:id" component={NewsDetail} />
          <Route path="/promo" component={Promo} />
          <Route exact path="/produk" component={Produk} />
          <Route path="/produk/detail/:id" component={ProdukDetail} />
          <Route path="/about" component={About} />
          <LiveChat classes={classes} />
          {/* <Route path="/kontak" component={Kontak} /> */}
        </Container>
        <Footer news={news} />
      </Router>
    );
  }
}

export default withStyles(useStyles)(App);
