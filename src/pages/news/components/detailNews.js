import React, { Component } from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({}));

class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: {},
      allNews: []
    };
  }

  getNews(id) {
    fetch(`https://dilo-ecommerce.herokuapp.com/api/news/${id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          news: data
        }, () => console.log(this.state.news));
      });
  }

  getAllNews() {
    fetch("https://dilo-ecommerce.herokuapp.com/api/news")
      .then(res => res.json())
      .then(data => {
        this.setState({
          allNews: data.data
        }, () => console.log(this.state.allNews));
      });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getNews(id);
    this.getAllNews();
  }

  render() {
    const { news, allNews } = this.state;
    return (
      <>
        <Grid container spacing={4}>
          <Grid item md={9}>
            <Typography variant="h3" gutterBottom>
              {news.title}
            </Typography>
            <img src={news.thumbnail} style={{ height: 500, width: "100%" }} />
            <Typography variant="body1">{news.body}</Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant="h5" gutterBottom>
              Berita Lainnya
            </Typography>
            {allNews.slice(0, 2).map(data => (
              <>
                <img
                  src={data.thumbnail}
                  style={{ height: 150, width: "100%" }}
                />
                <Typography variant="h5" gutterBottom>
                  {data.title}
                </Typography>
              </>
            ))}
          </Grid>
        </Grid>
      </>
    );
  }
}

export default NewsDetail;
