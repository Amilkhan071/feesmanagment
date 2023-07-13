import React, { useState } from "react";
import { Avatar, FormHelperText, Grid, Hidden, TextField } from "@mui/material";
import "../../../Stylesheet.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { postDataAndImage } from "../../Services/FetchNodeServices";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function CreateCourse() {
  const [getCourseName, setCourseName] = React.useState("");
  const [getCourseDuration, setCourseDuration] = React.useState("");
  const [getCourseFees, setCourseFees] = React.useState("");
  const [getDescription, setDescription] = React.useState("");
  const [getCourseLogo, setCourseLogo] = React.useState([]);
  const [getCourseLogoPath, setCourseLogoPath] = React.useState([]);
  const [error, setError] = useState({});

  const storedState = JSON.parse(localStorage.getItem("admin"));

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("organizationid", storedState.organizationid);
      formData.append("courseName", getCourseName);
      formData.append("courseDuration", getCourseDuration);
      formData.append("courseFees", getCourseFees);
      formData.append("description", getDescription);
      formData.append("courseLogo", getCourseLogo);

      let config = { headers: { "content-type": "multipart/form-data" } };
      console.log("config :", formData);
      // console.log('kk',config)
      let result = await postDataAndImage(
        "course/addNewCourse",
        formData,
        config
      );
      console.log("result", result);

      if (result) {
        alert("Course Submitted..");
      } else {
        alert("Fail to Submit Course...");
      }
    }
  };
  const handleCourseLogo = (event) => {
    setCourseLogoPath(URL.createObjectURL(event.target.files[0]));
    setCourseLogo(event.target.files[0]);
  };

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  const validation = () => {
    var isValid = true;

    if (!getCourseName) {
      handleError("getCourseName", "Please Input coursename");
      isValid = false;
    }

    if (!getCourseDuration) {
      handleError("getCourseDuration", "Please Input courseduration");
      isValid = false;
    }
    if (!getCourseFees) {
      handleError("getCourseFees", "Please Input coursefees");
      isValid = false;
    }
    if (!getDescription) {
      handleError("getDescription", "Please Input description");
      isValid = false;
    }

    return isValid;
  };
  const RegexLetter = /^[a-zA-Z\s]*$/;

  return (
    <div className="store_form_1">
      <Grid
        className="store_form_2"
        container
        style={{
          width: "90%",
          height: "90%",
          marginBottom: 22,
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <AppBar position="static" style={{ background: "#00b894" }}>
            <Toolbar>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={10}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: "bold" }}>
                      courses
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    onClick={() => navigate("/dashboard/DisplayCourse")}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        cursor: "pointer",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ paddingRight: 5 }}>
                        <Hidden smDown>
                          <AssignmentIcon fontSize="14" />
                        </Hidden>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: "bold" }}>
                        courses List
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            error={!error.getOrgName ? false : true}
            helperText={error.getOrgName}
            onFocus={() => handleError("getOrgName", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Organization Id"
            variant="standard"
            value={storedState.organizationid}
            // onChange={(e) => setOrgName(e.target.value.trimStart())}
            sx={(theme) => {
              return {
                "& label.Mui-focused": {
                  color: "#000",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
              };
            }}
            fullWidth
          />
        </Grid>
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Course Name"
            variant="standard"
            error={!error.getCourseName ? false : true}
            helperText={error.getCourseName}
            onFocus={() => handleError("getCourseName", null)}
            value={getCourseName}
            onChange={(e) => setCourseName(e.target.value.trimStart())}
            fullWidth
            onKeyDown={(event) => {
              if (!RegexLetter.test(event.key)) {
                event.preventDefault();
              }
            }}
            sx={(theme) => {
              return {
                "& label.Mui-focused": {
                  color: "#000",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
              };
            }}
          />
        </Grid>
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Course Duration"
            variant="standard"
            error={!error.getCourseDuration ? false : true}
            helperText={error.getCourseDuration}
            onFocus={() => handleError("getCourseDuration", null)}
            value={getCourseDuration}
            onChange={(e) => setCourseDuration(e.target.value.trim())}
            fullWidth
            sx={(theme) => {
              return {
                "& label.Mui-focused": {
                  color: "#000",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
              };
            }}
          />
        </Grid>
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Course Fees"
            variant="standard"
            error={!error.getCourseFees ? false : true}
            helperText={error.getCourseFees}
            onFocus={() => handleError("getCourseFees", null)}
            value={getCourseFees}
            onChange={(e) => setCourseFees(e.target.value.trim())}
            fullWidth
            type="number"
            sx={(theme) => {
              return {
                "& label.Mui-focused": {
                  color: "#000",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
              };
            }}
          />
        </Grid>
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            error={!error.getDescription ? false : true}
            helperText={error.getDescription}
            onFocus={() => handleError("getDescription", null)}
            value={getDescription}
            onChange={(e) => setDescription(e.target.value.trimStart())}
            fullWidth
            sx={(theme) => {
              return {
                "& label.Mui-focused": {
                  color: "#000",
                },

                "& .MuiInput-underline:after": {
                  borderBottomColor: "#000",
                },
              };
            }}
          />
        </Grid>
        <Grid item md={3} lg={3} sm={12} xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Picture
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => handleCourseLogo(event)}
            />
          </Button>
          <div
            style={{
              color: "#d32f2f",
              fontSize: 12,
              marginTop: 5,
              fontWeight: 400,
            }}
          >
            {error.getOwnerPicture}
          </div>
        </Grid>
        <Grid item md={3} lg={3}>
          <Avatar
            alt="Course Logo"
            src={getCourseLogoPath}
            variant="circular"
            sx={{ width: 56, height: 56 }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: 10,
          }}
        >
          <Button
            style={{
              backgroundColor: "#00b894",
              borderRadius: 0,
              width: 100,
              height: 40,
              padding: 10,
              fontWeight: "bold",
              fontSize: 12,
            }}
            onClick={() => handleSubmit()}
            variant="contained"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}