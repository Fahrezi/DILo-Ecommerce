import React from "react";
import { Typography, Box, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "0 150px"
  },
  link: {
    textDecoration: "none",
    color: "#000",
    fontSize: 24,
    textAlign: "center"
  }
}));

const Contact = () => (
  <>
    {[
      { sosmed: "Facebook", account: "Tampil-Ecommerce" },
      { sosmed: "Twitter", account: "@Tampil-Ecommerce" },
      { sosmed: "Instagram", account: "@Tampil-Ecommerce" }
    ].map(({ sosmed, account }, i) => (
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Typography variant="body1">{sosmed} :</Typography>
        </Grid>
        <Grid item md={8}>
          <Typography variant="body1">{account}</Typography>
        </Grid>
      </Grid>
    ))}
  </>
);

export default function Footer(props) {
  const classes = useStyles();
  console.log(props.news);
  const NewsFooter = ({ news }) =>
    news.map(({ slug, title }, i) => (
      <Link
        to={`/news/detail/${slug}`}
        key={i}
        style={{
          display: "block",
          textDecoration: "none",
          color: "#000",
          fontSize: 20
        }}
      >
        {title}
      </Link>
    ));
  return (
    <Box component="div" display="flex" bgcolor="secondary.main" py={3} mt={5}>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Box align="center">
              <Typography variant="h3" gutterBottom style={{ color: "#fff" }}>
                Tampil
              </Typography>
              <Typography variant="p">{props.description}</Typography>
            </Box>
          </Grid>
          {[
            { title: "Tentang", content: <Contact /> },
            {
              title: "Berita",
              content:
                props.news != undefined ? (
                  <NewsFooter news={props.news} />
                ) : (
                  <h1>Halo</h1>
                )
            }
          ].map(({ title, content }, i) => (
            <Grid item md={4} key={i}>
              <Link
                to={`/${title === "Tentang" ? "about" : "news"}`}
                className={classes.link}
              >
                {title}
              </Link>
              <Box component="div" mt={2}>
                {content}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
