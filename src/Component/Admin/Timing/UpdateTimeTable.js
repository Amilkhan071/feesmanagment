import {
  AppBar,
  Button,
  Grid,
  Hidden,
  TextField,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { postData } from "../../Services/FetchNodeServices";

export default function UpdateTimeTable() {
  const params = useParams();
  const [selectedDate1, setSelectedDate1] = useState(new Date(""));
  const [selectedDate2, setSelectedDate2] = useState(new Date(""));
  const [organizationId, setOrganizationId] = useState("");
  const [btstart, setbtstart] = useState("");
  const [btend, setbtend] = useState("");
  const [error, setError] = useState({});
  var navigate = useNavigate();

  const searchById = async () => {
    var body = { transactionid: params.trnsid };
    var record = await postData("timingtable/displayById", body);
    console.log(record);
    alert(JSON.stringify(record));
    if (record != null) {
      setOrganizationId(record.organizationid);
      var st = new Date("2019/01/01 " + record.btstart + " GMT+0530");
      var et = new Date("2019/01/01 " + record.btend + " GMT+0530");
      setSelectedDate1(st);
      setSelectedDate2(et);
    } else {
      alert("Failed");
    }
  };
  useEffect(() => {
    searchById();
  }, []);
  const handleDateChange1 = (date) => {
    alert(date);
    var time = new Date(date);
    var h = time.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    setSelectedDate1(date);
    setbtstart(h);
  };

  const handleDateChange2 = (date) => {
    var time = new Date(date);
    var h = time.toLocaleString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    setSelectedDate2(date);
    setbtend(h);
  };

  const handleSubmitEdit = async () => {
    if (validation()) {
      var body = {
        transactionid: params.trnsid,
        btStart: btstart,
        btEnd: btend,
      };
      var result = await postData("timingtable/updateRecord", body);
      if (result) {
        alert("updated");
        navigate("/dashboard/DisplayTiming");
      } else {
        alert("failed");
      }
    }
  };

  const validation = () => {
    var isValid = true;

    if (!organizationId) {
      handleError("organizationId", "Please Input organizationId");
      isValid = false;
    }
    if (!btstart) {
      handleError("btstart", "Please Input Start Time");
      isValid = false;
    }
    if (!btend) {
      handleError("btend", "Please Input Start End");
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
                      Update Time
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
                        Time List
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
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            error={!error.organizationId ? false : true}
            helperText={error.organizationId}
            onFocus={() => handleError("organizationId", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Organization Id"
            variant="standard"
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

        <Grid item md={12} lg={12} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={selectedDate1}
              onChange={handleDateChange1}
              label="Batch Time Start"
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: "100%",
                  helperText: error.btStart,
                  error: !error.btStart ? false : true,
                  onFocus: () => handleError("btStart", null),
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

        <Grid item md={12} lg={12} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={selectedDate2}
              onChange={handleDateChange2}
              label="Batch Time End"
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: "100%",
                  helperText: error.selectedDate2,
                  error: !error.selectedDate2 ? false : true,
                  onFocus: () => handleError("selectedDate2", null),
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
            onClick={() => handleSubmitEdit()}
            variant="contained"
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
