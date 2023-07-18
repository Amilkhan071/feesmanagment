import {
  AppBar,
  Button,
  Grid,
  Hidden,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postData } from "../../Services/FetchNodeServices";
import Swal from "sweetalert2";

export default function TimeTable() {
  const storedState = JSON.parse(localStorage.getItem("admin"));
  const [selectedDate1, setSelectedDate1] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedDate2, setSelectedDate2] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [organizationId, setOrganizationId] = useState(storedState.organizationid);
  const [btstart, setbtstart] = useState("");
  const [btend, setbtend] = useState("");
  const [error, setError] = useState({});
  var navigate = useNavigate();

  const handleDateChange1 = (date) => {
    alert(date)
    var time = new Date(date);
    var h = time.toLocaleString("en-us", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    setbtstart(h);
    setSelectedDate1(date);
  };

  const handleDateChange2 = (date) => {
    var time = new Date(date);
    var h = time.toLocaleString("en-us", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    setbtend(h);
    setSelectedDate2(date);
  };

  const handleSubmit = async () => {
    if (validation()) {
      var body = {
        organizationid: 1,
        btStart: btstart,
        btEnd: btend,
      };

      var result = await postData("timingtable/addNewRecord", body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: result.message,

        });
      
        navigate("/dashboard/displayTiming");

      } else {
        Swal.fire({
          icon: "error",
          title: "Ooops....",
          text: result.message,

        });
      }
    }
  };

  const validation = () => {
    var isValid = true;

    if (!organizationId) {
      handleError("organizationId", "Please Input organizationId");
      isValid = false;
    }
   
    if (isNaN(organizationId)) {
      handleError("organizationId", "Please Input valid organization id");
      isValid = false;
    }

   

    return isValid;
  };
  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

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
          <AppBar position="static" style={{ background: "#273c75" }}>
            <Toolbar>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={10}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: "bold" }}>
                      Batch Time
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    onClick={() => navigate("/dashboard/DisplayTiming")}
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
                        Batch Time List
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <div
            style={{
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 3,
            }}
          >
            <div>
              <img src="/course.png" width="60" />
            </div>
            <div style={{ marginLeft: 20 }}>Time Register</div>
          </div>
        </Grid>
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            error={!error.organizationId ? false : true}
            helperText={error.organizationId}
            onFocus={() => handleError("organizationId", null)}
            inputProps={{maxLength:10, style: { color: "#000" }, }}
            id="standard-basic"
            label="Organization Id"
            variant="outlined"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value.trim())}
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

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <TimePicker
            
              //value={selectedDate1}
              onChange={handleDateChange1}
              label="Batch Start Time"
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: "100%",
                  required:true
                },
              }}
            />
            {/* <DatePicker
                  label="Birth Date"
                  //  value={getDob}
                 // onChange={(item) => setDob(item)}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      fullWidth: "100%",
                    },
                  }}
                /> */}
          </LocalizationProvider>
        </Grid>

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              //   value={selectedDate2}
              onChange={handleDateChange2}
              label="Batch End Time"
              onError={!error.selectedDate2 ? false : true}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: "100%",
                  required:true
                },
              }}
            />
            {/* <DatePicker
                  label="Birth Date"
                  //  value={getDob}
                 // onChange={(item) => setDob(item)}
                  slotProps={{
                    textField: {
                      variant: "standard",
                      fullWidth: "100%",
                    },
                  }}
                /> */}
          </LocalizationProvider>
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
              backgroundColor: "#273c75",
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
            SET TIME
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
