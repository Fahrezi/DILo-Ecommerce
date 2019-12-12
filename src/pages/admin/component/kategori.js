import React, { Component, Fragment } from "react";
import {
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = theme => ({
  kategori: {
    padding: 30
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class kategori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      collapse: [false, false, false]
      // pria: false,
      // wanita: false,
      // anak: false
    };
  }

  getCategory = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/categories")
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          console.log(data.message);
        } else {
          this.setState(
            {
              category: data.data
            },
            () => console.log(this.state.category)
          );
        }
      });
  };
  // .then(data => console.log(data));
  // .then(log => console.log(log));

  deleteCategory = (id, name) => {
    let result = window.confirm(`Anda Yakin Ingin Menghapus Kategori ${name}`);

    if (result) {
      fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .then(() => this.getCategory())
        .catch(err => console.error(err));
    }

    // console.log(id);
  };

  collapseHandle = i => {
    const fakeCollapse = this.state.collapse;
    this.setState(prevState => {
      return (fakeCollapse[i] = !prevState.collapse[i]);
    });
    console.log(fakeCollapse);
  };

  componentDidMount() {
    this.getCategory();
  }

  render() {
    const { classes } = this.props;
    const { category, collapse } = this.state;
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
              Daftar Kategori
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.props.history.push("/admin/kategori/tambah")}
            >
              Tambah
            </Button>
          </Box>
        </Box>
        {/* <Grid container spacing={4}> */}
        {/* // <Grid item md={4}>
            //   <Paper className={classes.kategori}>
            //     <Typography variant="h5" align="center">
            //       {name}
            //     </Typography>
            //     <Link
            //       to={`/admin/kategori/${name}`}
            //       style={{ textDecoration: "none", color: "inherit" }}
            //     >
            //       <Button variant="contained" color="primary" align="center">
            //         Detail
            //       </Button>
            //       <Button
            //         variant="contained"
            //         color="secondary"
            //         align="center"
            //         onClick={() => this.deleteCategory(_id, name)}
            //       >
            //         Delete
            //       </Button>
            //     </Link>
            //   </Paper>
            // </Grid> */}
        <List aria-labelledby="kategorii" className={classes.root}>
          {category.map(({ _id, name, subCategories }, i) => (
            <>
              <ListItem button key={i} onClick={() => this.collapseHandle(i)}>
                <ListItemText primary={name} />
                <Box component="div">
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </Box>
                {collapse[i] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={collapse[i]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {subCategories.map(({ name }, i) => (
                    <ListItem button className={classes.nested} key={i}>
                      <ListItemText primary={name} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </>
          ))}
        </List>
        {/* </Grid> */}
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(kategori);
