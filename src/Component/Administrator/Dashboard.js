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

import CreateEnquiries from "../Admin/Enquiries/CreateEnquiries";
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
            element={<CreateOrganization />}
            path={"/CreateOrganization"}
          />
          <Route

            element={<UpdateOrganization />}
            path={"/UpdateOrganization/:orgid"}
          />
           <Route
            element={<UpdateCourse />}
            path={"/UpdateCourse/:crsid"}
          />
           <Route
            element={<DisplayOrganization />}
            path={"/DisplayOrganization"}
          />
            <Route
            element={<DisplayCourse />}
            path={"/DisplayCourse"}
          />
          <Route element={<CreateEnquiries />} path={"/createenquiries"} />
          <Route element={<CreateCourse />} path={"/CreateCourse"} />

          
       <Route
            element={<UpdateOrganization />}
            path={"/UpdateOrganization/:orgid"}
          />
          <Route
            element={<TimeTable />}
            path={"/TimeTable"}
          />
             <Route
            element={<DisplayTiming />}
            path={"/DisplayTiming"}
          />
           <Route
            element={<UpdateTimeTable />}
            path={"/UpdateTimeTable/:trnsid"}
          />
           <Route
            element={<CreateBatch />}
            path={"/CreateBatch"}
          />
          <Route
            element={<DisplayBatch />}
            path={"/DisplayBatch"}
          />
             <Route
            element={<UpdateBatch />}
            path={"/UpdateBatch/:batchid"}
          />
        </Routes>
      </Grid>
    </Grid>
  );
}
