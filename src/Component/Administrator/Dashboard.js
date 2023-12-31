import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../../Stylesheet.css";
import CreateOrganization from "../Admin/Organization/CreateOrganization";

import UpdateOrganization from "../Admin/Organization/UpdateOrganization";

import CreateCourse from "../Admin/Courses/CreateCourse";
import DisplayCourse from "../Admin/Courses/DisplayCourse";
import UpdateCourse from "../Admin/Courses/UpdateCourse";

import DisplayOrganization from "../Admin/Organization/DisplayOrganization";
import TimeTable from "../Admin/Timing/TimeTable";
import DisplayTiming from "../Admin/Timing/DisplayTiming";
import UpdateTimeTable from "../Admin/Timing/UpdateTimeTable";
import CreateBatch from "../Admin/Batch/CreateBatch";
import DisplayBatch from "../Admin/Batch/DisplayBatch";
import UpdateBatch from "../Admin/Batch/UpdateBatch";
import DisplayStudent from "../Admin/StudentDetail/DisplayStudent";
import CreateStudent from "../Admin/StudentDetail/CreateStudent";
import UpdateStudent from "../Admin/StudentDetail/UpdateStudent";
import AdminProtected from "./AdminProtected";

export default function Dashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleStatus = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className="menuicon">
        <AppBar position="static" style={{ background: "#273c75" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleStatus}
            >
              <MenuIcon onClick={handleStatus} />
            </IconButton>
            <Typography variant="h6" Component="div" sx={{ flexGrow: 1 }}>
              THE MOBILE PLUS
            </Typography>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid item lg={2} md={3} className="SideBarContainer">
        <Sidebar />
      </Grid>

      <Grid item lg={10} md={9} xs={12} sm={12}>
        <Routes>
          <Route
            element={<AdminProtected Component={CreateCourse} />}
            path={"/CreateCourse"}
          />
          <Route
            element={<AdminProtected Component={DisplayCourse} />}
            path={"/DisplayCourse"}
          />
          <Route
            element={<AdminProtected Component={UpdateCourse} />}
            path={"/UpdateCourse/:crsid"}
          />
          {/* <Route element={<CreateCourse />} path={"/CreateCourse"} />
          <Route element={<DisplayCourse />} path={"/DisplayCourse"} />
          <Route element={<UpdateCourse />} path={"/UpdateCourse/:crsid"} /> */}

          <Route
            element={<AdminProtected Component={TimeTable} />}
            path={"/TimeTable"}
          />
          <Route
            element={<AdminProtected Component={DisplayTiming} />}
            path={"/DisplayTiming"}
          />
          <Route
            element={<AdminProtected Component={UpdateTimeTable} />}
            path={"/UpdateTimeTable/:trnsid"}
          />
          {/* <Route element={<TimeTable />} path={"/TimeTable"} />
          <Route element={<DisplayTiming />} path={"/DisplayTiming"} />
          <Route
            element={<UpdateTimeTable />}
            path={"/UpdateTimeTable/:trnsid"}
          /> */}
          <Route
            element={<AdminProtected Component={CreateBatch} />}
            path={"/CreateBatch"}
          />
          <Route
            element={<AdminProtected Component={DisplayBatch} />}
            path={"/DisplayBatch"}
          />
          <Route
            element={<AdminProtected Component={UpdateBatch} />}
            path={"/UpdateBatch/:batchid"}
          />
          {/* <Route element={<CreateBatch />} path={"/CreateBatch"} />
          <Route element={<DisplayBatch />} path={"/DisplayBatch"} />
          <Route element={<UpdateBatch />} path={"/UpdateBatch/:batchid"} /> */}
          <Route
            element={<AdminProtected Component={CreateStudent} />}
            path={"/CreateStudent"}
          />
          <Route
            element={<AdminProtected Component={DisplayStudent} />}
            path={"/DisplayStudent"}
          />
          <Route
            element={<AdminProtected Component={UpdateStudent} />}
            path={"/UpdateStudent/:stdid"}
          />
          {/* <Route element={<DisplayStudent />} path={"/DisplayStudent"} />
          <Route element={<CreateStudent />} path={"/CreateStudent"} />
          <Route element={<UpdateStudent />} path={"/UpdateStudent/:stdid"} /> */}
        </Routes>
      </Grid>
    </Grid>
  );
}
