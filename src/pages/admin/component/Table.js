import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from "@material-ui/core";

const modalOpen = i => {
    this.setState({
      modal: true,
      index: i
    });
  };

const deleteUser = (id, name) => {
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

const TableAdmin = ({ tableBody, tableHead, ...props }) => (
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
        {tableBody.map(({ username, email, phone, _id, ...data }, i) => (
          <TableRow key={i}>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  modalOpen(i);
                }}
              >
                Detail
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  deleteUser(_id, username);
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
);

export default TableAdmin;
