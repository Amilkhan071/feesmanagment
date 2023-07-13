import {
  Box,
  Button,
  Grid,
  Hidden,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import "../Stylesheet2.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { postData } from "./Services/FetchNodeServices";
export default function OrgAdminLogin() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState({});

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };
  const validation = () => {
    var isValid = true;

    if (!userName) {
      handleError("userName", "Please fill out this userName.");
      isValid = false;
    }

    if (!password) {
      handleError("password", "Please fill out this Password.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (validation()) {
      var body = {
        organizationid: userName,
        password: password,
      };
      var response = await postData("organization/checkLogin", body);
      if (response) {
        localStorage.setItem("admin", JSON.stringify(response));
        alert("Login Sucessfully");
        navigate("/dashboard");
      } else {
        alert("error");
      }
    }
  };

  return (
    <div
      className="LoginContainer"
      style={{
        textAlign: "center",
        padding: 20,
      }}
    >
      <Grid
        style={{
          background: "#fff",
          width: 850,
          height: 600,
          padding: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px ",
          borderRadius: 10,
        }}
        container
      >
        <Hidden mdDown>
          <Grid style={{ textAlign: "left" }} item lg={7} sm={6} xs={10}>
            <img
              className="zoomlgimg"
              style={{ width: 250 }}
              src="/ss.png"
              alt="star"
            />
          </Grid>
        </Hidden>
        <Grid style={{ textAlign: "right" }} lg={5} sm={6} xs={10}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Organization Login
          </div>
          <Box style={{ marginTop: 40 }} component="form">
            <div>
              <TextField
                autoFocus={true}
                onChange={(e) => setUserName(e.target.value.trimStart())}
                color="secondary"
                variant="standard"
                placeholder="Username or E-mail"
                error={!error.userName ? false : true}
                helperText={error.userName}
                onFocus={() => handleError("userName", null)}
                value={userName}
                fullWidth
                InputProps={{
                  style: {
                    color: "#000",
                    height: 50,
                    borderRadius: 30,
                    borderColor: "#fff",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div style={{ marginTop: 25 }}>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="standard"
                type="password"
                color="secondary"
                value={password}
                placeholder="Password"
                error={!error.password ? false : true}
                helperText={error.password}
                onFocus={() => handleError("password", null)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    handleLogin();
                  }
                }}
                fullWidth
                InputProps={{
                  style: { color: "#000", height: 50, borderRadius: 30 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </Box>
          <div onClick={handleLogin} style={{ marginTop: 40 }}>
            <Button
              className="btn-hover color-7"
              style={{
                borderRadius: 30,
                height: 40,
                // borderColor: "#000",
                borderWidth: 2,
                fontWeight: 700,
                color: "#fff",
                // backgroundColor: "#58b747",
              }}
              //   variant="contained"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </div>
          <div
            // onClick={() => navigate("/changepassword/")}
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 12,
              color: "#808080",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
