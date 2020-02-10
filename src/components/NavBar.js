import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import Trainings from "./Trainings.js";
import Calender from "./Calender.js";
import Customers from "./Customers.js";



const NavBar = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      textAlign: "left"
    },
    buttonColor: {
      color: "white",
      fontSize: "1rem"
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Personal Trainer Company
            </Typography>
            <Link to="/">
              <Button className={classes.buttonColor}>Home</Button>
            </Link>{" "}
            <Link to="/customers">
              <Button className={classes.buttonColor}>Customers</Button>
            </Link>{" "}
 
            <Link to="/trainings">
              <Button className={classes.buttonColor}>Trainings</Button>
            </Link>{" "}
            <Link to="/calender">
              <Button className={classes.buttonColor}>Calendar</Button>
            </Link>{" "}
          </Toolbar>
        </AppBar>

        <Switch>
        <Route path="/customers" component={Customers} />
          <Route path="/trainings" component={Trainings} />
          <Route path="/calender" component={Calender} />
        </Switch>
      </Router>
    </>
  );
};

export default NavBar;
