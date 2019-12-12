import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import Login from './components/Login';
import Register from './components/Register';

const useStyles = theme => ({
    handler: {
        textAlign: "right",
        margin: "20px 0 30px 0",
        fontSize: 18,
        textDecoration: "none",
        color: theme.palette.text.primary
    }
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false
        }
    }

    render() {
        const { login } = this.state
        const { classes } = this.props

        return (
            <Router>
                <Grid container direction="column" style={{width: 400, margin: "0 auto"}}>
                    <Typography component="h2" variant="h4" align="center" style={{margin: "50px 0 40px 0"}}>{!login? 'Masukkan Data Anda' : 'Daftarkan Diri Anda'}</Typography>

                    <Route exact component={Login} path="/account/login" />
                    <Route component={Register} path="/account/register" />

                    <Link to={`/account/${login? 'login' : 'register'}`} onClick={() => {
                        this.setState({login: !this.state.login})
                    }} className={classes.handler}>{login? 'Masuk' : 'Daftar'}</Link>
                </Grid>    
            </Router>
        );
    }
}

export default withStyles(useStyles)(App);