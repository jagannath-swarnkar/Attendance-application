import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import "./App.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" style={{ display: "flex" }}>
        <div className="container" style={{ display: "flex" }}>
          <div className="no bold">No.</div>
          <div className="student-name bold ">Student Name</div>
          <div className="attendance-status bold ">Attendance Status</div>
        </div>
        <div title="Logout">
          <ExitToAppIcon
            color="error"
            cursor="pointer"
            onClick={() => {
              reactLocalStorage.clear();
              window.location.reload();
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
}
