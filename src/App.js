import React from "react";
import "./App.css";
import NavBar from "./components/NavBar.js";
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Grid
        container
        justify="center"
        spacing={2}
        style={{ margin: "0 auto", width: "60%", marginTop: "8%" }}
      >
        <Grid item xs={4}>
          <div onClick={() => window.location.href="/customers"} className="box-large red">Customers</div>
        </Grid>
        <Grid item xs={4}>
          <div onClick={() => window.location.href="/trainings"} className="box-large blue">Training</div>
        </Grid>
        <Grid item xs={4}>
          <div onClick={() => window.location.href="/calender"} className="box-large purple">Calender</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
