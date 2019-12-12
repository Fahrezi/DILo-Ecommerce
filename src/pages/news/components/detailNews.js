import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

const NewsDetail = props => (
  <>
    <Grid container spacing={4}>
      <Grid item md={9}>
        <Typography variant="h3" gutterBottom>
          Fashion Untuk Kamu
        </Typography>
        <img
          src={require("../../../img-lib/houston-ray-bkZlpn5iMEM-unsplash.jpg")}
          style={{ height: 500, width: "100%" }}
        />
        <Typography variant="body1">
          pkokoeanrua gamgie ajfd ajdefknaa ifciadfnmeaihfiadfdajlnf
          iijeafijeagf aefiafm oajsifjiean fjaifea faefajekfa fiajekfjia sfkamfi
          jaefafmsjfie amfk aejfjaifjieaf aie fieafkjfia fiaefkj aifjafmaijfia
          fafguwhrgnjrwguf dfjiejfafie fiakfjieja fej afijakfjia fakf ifaif
          afakjfi ajflflgtjnv9rpowjuewofj dsfewfdfjifajdjasfjdef
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Typography variant="h5" gutterBottom>
          Berita Lainnya
        </Typography>
        {[1, 2, 3].map(data => (
          <>
            <img
              src={require("../../../img-lib/houston-ray-bkZlpn5iMEM-unsplash.jpg")}
              style={{ height: 150, width: "100%" }}
            />
            <Typography variant="h5" gutterBottom>
              Fashion Untuk Kamu
            </Typography>
          </>
        ))}
      </Grid>
    </Grid>
  </>
);

export default NewsDetail;
