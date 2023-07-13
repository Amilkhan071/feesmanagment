
import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SettingsIcon from "@mui/icons-material/Settings";
import BuildIcon from "@mui/icons-material/Build";
import { useNavigate } from "react-router-dom";
import { Avatar, Collapse, Grid, List } from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../Stylesheet.css";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

export default function MainSidebar() {
  const storedState = JSON.parse(localStorage.getItem("admin"));

  const [openn, setOpenn] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);
  const [four, setFour] = useState(false);
  const [five, setFive] = useState(false);
  const [six, setSix] = useState(false);

  const handleClick = () => {
    setOpenn(!openn);
    setTwo(false);
    setThree(false);
    setFour(false);
    setFive(false);
  };

  const handleClickTwo = () => {
    setTwo(!two);
    setOpenn(false);
    setThree(false);
    setFour(false);
    setFive(false);
  };
  const handleClickThree = () => {
    setThree(!three);
    setOpenn(false);
    setTwo(false);
    setFour(false);
    setFive(false);
  };
  const handleClickFour = () => {
    setFour(!four);
    setThree(false);
    setOpenn(false);
    setTwo(false);

    setFive(false);
  };
  const handleClickFive = () => {
    setFive(!five);
    setFour(false);
    setThree(false);
    setOpenn(false);
    setTwo(false);
  };
  var navigate = useNavigate();
  const handleClickLogOut = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };
  return (
    <>
      <div
        className="Stylesheet_scrollitem Resposnse_Width"
        style={{
          background: "#273c75",
          height: "100vh",
          position: "fixed",
          //width:"250px"
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          transition: "0.3s",
        }}
      >
        <React.Fragment>
          <Grid container>
            <Grid item xs={12}>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  flexDirection: "column",
                  paddingTop: 25,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Avatar sx={{ padding: 1 }}>AH</Avatar>
                </div>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: 400,
                    fontSize: 18,
                    paddingTop: 15,
                  }}
                >
                 LEENA
                </div>
              </div>
            </Grid>

            <Grid item xs={12} style={{ color: "#fff" }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#fff" }} primary="Dashboard" />
              </ListItemButton>
            </Grid>
            <Grid item xs={12} style={{ color: "#fff" }}>
              <ListItemButton>
                <ListItemText
                  style={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "flex-start",
                  }}
                  primary="ADMIN"
                />
              </ListItemButton>
            </Grid>

            <Grid item xs={12} style={{ paddingTop: 10 }}>
              <ListItemButton onClick={()=>navigate('/maindashboard/displayOrganization')}>
                <ListItemIcon>
                  <SettingsIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#fff" }} primary="Organization" />
              
                  <KeyboardArrowRightIcon style={{ color: "#fff" }} />
               
              </ListItemButton>
           
            </Grid>

            <Grid item xs={12} style={{ paddingTop: 10 }}>
              <ListItemButton onClick={handleClickLogOut}>
                <ListItemIcon>
                  <PowerSettingsNewIcon style={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText style={{ color: "#fff" }} primary="Log Out" />
              </ListItemButton>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    </>
  );
}
