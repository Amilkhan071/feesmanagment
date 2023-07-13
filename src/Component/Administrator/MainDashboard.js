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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../../Stylesheet.css";
import MainSidebar from "./MainSidebar";
import CreateOrganization from "../Admin/Organization/CreateOrganization";
import UpdateOrganization from "../Admin/Organization/UpdateOrganization";
import DisplayOrganization from "../Admin/Organization/DisplayOrganization";

export default function MainDashboard() {
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
        <MainSidebar />
      </Grid>

      <Grid item lg={10} md={9} xs={12} sm={12}>
        <Routes>
         
      
      <Route
            element={<CreateOrganization />}
            path={"/CreateOrganization"}
          />
          <Route

            element={<UpdateOrganization/>}
            path={"/UpdateOrganization/:orgid"}
          />
      
           <Route
            element={<DisplayOrganization />}
            path={"/DisplayOrganization"}
          />

        </Routes>
      </Grid>
    </Grid>
  );
}
