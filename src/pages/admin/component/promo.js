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
  IconButton,
  Box,
  Menu,
  MenuItem,
  Grow
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListIcon from "@material-ui/icons/List";
import { withStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";

import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import TambahPromo from "./promoTambah";

const useStyles = theme => ({
  link: {
    textDecoration: "none",
    color: "#fff"
  }
});

const TriggerMenu = () => (
  <PopupState variant="popover" popupId="demoMenu">
    {popupState => (
      <div>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          {...bindTrigger(popupState)}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          {...bindMenu(popupState)}
          id="long-menu"
          keepMounted
          style={{ marginTop: 50, marginLeft: -140 }}
          TransitionComponent={Grow}
        >
          <Link to="/admin/promo/setHighlited">
            <MenuItem onClick={popupState.close}>
              Set Promo Highlighted
            </MenuItem>
          </Link>
        </Menu>
      </div>
    )}
  </PopupState>
);

class promo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        "Nama Promo",
        "Waktu Mulai",
        "Waktu Berakhir",
        "Status",
        "Aksi"
      ],
      tableBody: [
        // { nama: "Oktober ber ber", mulai: "01-10-19", akhir: "30-10-19" },
        // { nama: "November ber ber", mulai: "01-11-19", akhir: "31-11-19" },
        // { nama: "Desember ber ber", mulai: "01-12-19", akhir: "31-12-19" },
        // { nama: "Januari ri ri", mulai: "01-01-20", akhir: "01-02-20" }
      ],
      tambah: false,
      anchorEl: null,
      data: {
        _id: "",
        name: ""
      }
    };
  }

  getPromo = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/promos")
      .then(response => response.json())
      .then(promo => {
        this.setState(
          {
            tableBody: promo.data
          },
          () => console.log(this.state.tableBody)
        );
      });
    // .then(log => console.log(log));
  };

  deletePromo = (id, name) => {
    let result = window.confirm(`Anda Yakin Ingin Menghapus Promo ${name}`);

    if (result) {
      fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/promos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .then(() => this.getPromo())
        .catch(err => console.error(err));
    }

    // console.log(id);
  };

  handleClick = (event, {_id, name}) => {
    this.setState({
      anchorEl: event.currentTarget,
      data:{
        _id, name
      }
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  componentDidMount() {
    this.getPromo();
  }

  render() {
    const { classes } = this.props;
    const { tableHead, tableBody, tambah, anchorEl } = this.state;
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
              Daftar Promo
            </Typography>
            <Box component="div" display="flex">
              <Typography variant="body1">Highlighted : </Typography>
            </Box>
            <Box component="div">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    tambah: true
                  });
                  this.props.history.push("/admin/promo/tambah");
                }}
              >
                Tambah
              </Button>
            </Box>
            <TriggerMenu />
          </Box>
        </Box>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {tableHead.map((data, i) => (
                  <TableCell
                    key={i}
                    align={data === "Aksi" ? "center" : "left"}
                  >
                    {data}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody != undefined &&
                tableBody.map(
                  ({ _id, name, startDate, dueDate, status }, i) => (
                    <TableRow key={i}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{startDate}</TableCell>
                      <TableCell>{dueDate}</TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="more"
                          aria-controls={`${_id}`}
                          aria-haspopup="true"
                          onClick={event => this.handleClick(event, { _id, name})}
                        >
                          <ListIcon />
                        </IconButton>
                        <Menu
                          id={`${_id}`}
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={this.handleClose}
                          style={{ marginTop: 50, marginLeft: -140 }}
                          TransitionComponent={Grow}
                        >
                          <Button color="disabled">Detail</Button>
                          <Button color="primary">Update</Button>
                          <Button
                            color="secondary"
                            onClick={() => this.deletePromo(this.state.data._id, this.state.data.name)}
                          >
                            Delete
                          </Button>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    );
  }
}

export default withStyles(useStyles)(promo);
