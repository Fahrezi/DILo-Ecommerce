import React, { Component } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper
} from "@material-ui/core";

class Pesan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableBody: [
        {
          nama: "Kucing",
          pesan: "Mas Kalo Mau Dapet Baju Gratis Gimana Yaa??"
        },
        {
          nama: "Luthfi",
          pesan: "Mas Kalo Mau Dapet Baju Gratis Gimana Yaa (2)??"
        },
        {
          nama: "Fahrezi",
          pesan: "Mas Kalo Mau Dapet Baju Gratis Gimana Yaa (3)??"
        }
      ]
    };
  }
  render() {
    const { tableBody } = this.state;
    return (
      <>
        <Box
          component="div"
          bgcolor="secondary.main"
          style={{ borderRadius: 8 }}
          pl={2}
          py={2}
          mb={5}
        >
          <Typography component="h4" style={{ color: "#fff" }} align="left">
            Live Chat
          </Typography>
        </Box>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {["Nama User", "Pesan Terbaru", "Aksi"].map((data, i) => (
                  <TableCell key={i}>{data}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody.map(({ nama, pesan }, i) => (
                <TableRow key={i}>
                  <TableCell>{nama}</TableCell>
                  <TableCell>{pesan}</TableCell>
                  <TableCell>
                    <Button color="primary">Lihat</Button>
                    <Button color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

export default Pesan;
