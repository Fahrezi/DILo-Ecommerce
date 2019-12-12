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

import TableAdmin from "./Table";

const useStyles = theme => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: 30,
    left: "50%",
    transform: "translateX(-50%)"
  }
});

class user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["Username", "Email", "Phone", "Action"],
      tableBody: [{}],
      modal: false,
      index: 0
    };
  }

  modalOpen = i => {
    this.setState({
      modal: true,
      index: i
    });
  };

  modalClose = () => {
    this.setState({
      modal: false
    });
  };

  deleteUser = (id, name) => {
    let result = window.confirm(`Anda Yakin Ingin Menghapus ${name}`);

    if (result) {
      fetch(`https://dilo-ecommerce.herokuapp.com/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .then(() => this.getUser())
        .catch(err => console.error(err));
    }

    // console.log(id);
  };

  getUser = () => {
    fetch("https://dilo-ecommerce.herokuapp.com/api/admin/users")
      .then(response => response.json())
      .then(data => {
        this.setState({
          tableBody: data.data
        });
        console.log(data);
      })
      .catch(err => console.error(err));
  };

  // Action = ({i, id, username}) => (
  //   <>
  // <Button
  //   onClick={() => {
  //     this.modalOpen(i);
  //   }}
  // >
  //   Detail
  // </Button>
  // <Button
  //   color="secondary"
  //   onClick={() => {
  //     this.deleteUser(id, username);
  //   }}
  // >
  //   Delete
  // </Button>
  // </>
  // )

  componentDidMount() {
    this.getUser();

    // const modalObject =
    //   this.state.tableBody != undefined &&
    //   Object.values(this.state.tableBody[this.state.index]);

    // return modalObject;
  }

  render() {
    const { tableHead, tableBody, modal, index } = this.state;
    const { classes, Action } = this.props;
    const modalObject = Object.values(tableBody[index]);
    return (
      <div>
        <Fragment>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={modal}
            onClose={this.modalClose}
          >
            <Paper className={classes.modal}>
              <Typography
                component="h2"
                variant="h4"
                align="center"
                gutterBottom="true"
              >
                Detail Akun
              </Typography>
              <Grid container spacing={3}>
                <Grid item md={4}>
                  {tableHead.map((data, i) => (
                    <Typography component="h3" variant="p" key={i} gutterBottom>
                      {data === "Action" ? "Gender" : data} :
                    </Typography>
                  ))}
                </Grid>
                <Grid item md={8}>
                  {modalObject.map((data, i) => (
                    <Typography
                      component="h3"
                      variant="p"
                      align="left"
                      gutterBottom
                      key={i}
                    >
                      {data}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Paper>
          </Modal>
          {/* <TableAdmin tableBody={tableBody} tableHead={tableHead} /> */}
          <Box
            component="div"
            bgcolor="secondary.main"
            style={{ borderRadius: 8 }}
            pl={2}
            py={2}
            mb={5}
          >
            <Typography component="h4" style={{ color: "#fff" }} align="left">
              Daftar User
            </Typography>
          </Box>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHead.map(data => (
                    <TableCell align={data === "Action" ? "center" : "left"}>
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody.map(({ _id, username, email, phone }, i) => (
                  <TableRow key={i}>
                    <TableCell>{username}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{phone}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          this.modalOpen(i);
                          console.log(modalObject);
                        }}
                      >
                        Detail
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => {
                          this.deleteUser(_id, username);
                        }}
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
        {/* ) : (
          <Typography variant="h3" align="center">
            You No User Yet
          </Typography>
        )} */}
      </div>
    );
  }
}

export default withStyles(useStyles)(user);
