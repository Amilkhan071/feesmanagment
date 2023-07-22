import {
  AppBar,
  Button,
  FormControl,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  TextField,
  Toolbar,
  Select,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
  ListItemText,
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
import { getData, postData } from "../../Services/FetchNodeServices";
import OutlinedInput from "@mui/material/OutlinedInput";
import Swal from "sweetalert2";

export default function UpdateBatch() {
  const params = useParams();
  const storedState = JSON.parse(localStorage.getItem("admin"));

  const [organizationId, setOrganizationId] = useState("");
  const [btstart, setbtstart] = useState("");
  const [btend, setbtend] = useState("");
  const [error, setError] = useState({});
  const [batchTime, setBatchTime] = useState("");
  const [batchTimeList, setBatchTimeList] = useState([]);
  const [courseNameList, setCourseNameList] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [batchStartTime, setBatchStartTime] = useState("");
  const [courseName, setCourseName] = useState("");
  const [inputBatchName, setInputBatchName] = useState("");
  const [getBatchName, setBatchName] = useState("");
  const [getStatus, setStatus] = useState("");
  const [getBST, setBST] = useState("");

  const [getMon, setMon] = useState({ value: "", state: false });
  const [getTue, setTue] = useState({ value: "", state: false });
  const [getWed, setWed] = useState({ value: "", state: false });
  const [getThu, setThu] = useState({ value: "", state: false });
  const [getFri, setFri] = useState({ value: "", state: false });
  const [getSat, setSat] = useState({ value: "", state: false });
  const [getReg, setReg] = useState({ value: "", state: false });
  const [getSun, setSun] = useState({ value: "", state: false });

  const fillCourse = async () => {
    var body = { organizationid: storedState?.organizationid };
    var list = await postData("course/displayAll", body);
    setCourseNameList(list.data);
  };

  const fillCourseById = async (cid) => {
    var body = { courseid: cid };
    var list = await postData("course/displayById", body);
    setCourseName(list.data.coursename);
  };
  const searchById = async () => {
    let body = { batchid: params.batchid };
    let record = await postData("batch/displayById", body);

    if (record.data != null) {
      setOrganizationId(record.data.organizationid);
      setCourseId(record.data.coursename);
      setCourseName(record.data.tempcoursename);
      // setBST(record.data.starttime + " to " + record.data.endtime);
      setBST(record.data.starttime);
      setBatchTime(record.data.batchtime);
      setStatus(record.data.status);
      setBatchStartTime(record.data.batchtime)
      var sts = record.data.status.split(/(?<=^(?:.{3})+)(?!$)/);

      for (var i = 0; i < sts.length; i++) {
        if (sts[i] == "Mon") {
          setMon({ value: "Mon", state: true });
        } else if (sts[i] == "Tue") {
          setTue({ value: "Tue", state: true });
        } else if (sts[i] == "Thu") {
          setThu({ value: "Thu", state: true });
        } else if (sts[i] == "Wed") {
          setWed({ value: "Wed", state: true });
        } else if (sts[i] == "Fri") {
          setFri({ value: "Fri", state: true });
        } else if (sts[i] == "Sat") {
          setSat({ value: "Sat", state: true });
        } else if (sts[i] == "Sun") {
          setSun({ value: "Sun", state: true });
        } else if (sts[i] == "R") {
          setReg({ value: "R", state: true });
        }
      }

      setBatchName(record.data.batchname);
    } else {
      Swal.fire({
        icon: "error",
        title: "Ooops...",
        text: record.message,
      });
    }
  };
  const showCourse = () => {
    return courseNameList?.map((item) => (
      <MenuItem value={item.courseid}>{item.coursename}</MenuItem>
    ));
  };

  const fillBatchTime = async () => {
    var body = { organizationid:storedState?.organizationid  };
    var  list = await postData("timingtable/displayAll",body);
    setBatchTimeList(list.data);
  };

 

  const showBatchTime = () => {
    return batchTimeList?.map((item) => (
      <MenuItem value={`${item.btstart} to ${item.btend}`}>
        {item.btstart} to {item.btend}
      </MenuItem>
    ));
  };

  const handleChangeMon = (event) => {
    if (event.target.checked)
      setMon({ value: "Mon", state: event.target.checked });
    else setMon({ value: "", state: event.target.checked });
  };

  const handleChangeTue = (event) => {
    if (event.target.checked)
      setTue({ value: "Tue", state: event.target.checked });
    else setTue({ value: "", state: event.target.checked });
  };

  const handleChangeWed = (event) => {
    if (event.target.checked)
      setWed({ value: "Wed", state: event.target.checked });
    else setWed({ value: "", state: event.target.checked });
  };

  const handleChangeThu = (event) => {
    if (event.target.checked)
      setThu({ value: "Thu", state: event.target.checked });
    else setThu({ value: "", state: event.target.checked });
  };

  const handleChangeFri = (event) => {
    if (event.target.checked)
      setFri({ value: "Fri", state: event.target.checked });
    else setFri({ value: "", state: event.target.checked });
  };

  const handleChangeSat = (event) => {
    if (event.target.checked)
      setSat({ value: "Sat", state: event.target.checked });
    else setSat({ value: "", state: event.target.checked });
  };

  const handleChangeSun = (event) => {
    if (event.target.checked)
      setSun({ value: "Sun", state: event.target.checked });
    else setSun({ value: "", state: event.target.checked });
  };


  const handleChangeReg = (event) => {
    if (event.target.checked) {
      setReg({ value: "R", state: event.target.checked });
      setMon({ value: "", state: false });
      setTue({ value: "", state: false });
      setWed({ value: "", state: false });
      setFri({ value: "", state: false });
      setSat({ value: "", state: false });
      setThu({ value: "", state: false });
      setSun({ value: "", state: false });

    } else {
      setReg({ value: "", state: event.target.checked });
    }
  };

  var navigate = useNavigate();

  const changeBatchTime = (event) => {
    setBatchTime(event.target.value);
    setBatchStartTime(event.target.value);
  };
  const handleCourse = (event) => {
    setCourseId(event.target.value);
    fillCourseById(event.target.value);
  };

  const handleBatch = () => {
    var date = new Date();
    var month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var status =
      getMon.value +
      "" +
      getTue.value +
      "" +
      getWed.value +
      "" +
      getThu.value +
      "" +
      getFri.value +
      "" +
      getSat.value +
      "" +
      getSun.value +
      "" +
      getReg.value;
    setStatus(status);

    var batchname =
      month[date.getMonth()] +
      ", " +
      date.getFullYear() +
      ", " +
      courseName +
      ", " +
      batchStartTime +
      ", " +
      status;
    setBatchName(batchname);
  };

  const validation = () => {
    var isValid = true;

    if (!organizationId) {
      handleError("organizationId", "Please Input organizationId");
      isValid = false;
    }
    if (!courseId) {
      handleError("courseId", "Please Select Course");
      isValid = false;
    }
    if (!batchTime) {
      handleError("batchTime", "Please Select batchTime");
      isValid = false;
    }

    if (!getBatchName) {
      handleError("getBatchName", "Please Inpute Batch Name");
      isValid = false;
    }

    return isValid;
  };
  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  useEffect(() => {
    searchById();
    fillBatchTime();
    fillCourse();
  }, []);

  const handleEdit = async () => {
    if (validation()) {
      let body = {
        batchid: params.batchid,
        courseid: courseId,
        timings: batchTime,
        status: getStatus,
        batchname: getBatchName,
      };
      let result = await postData("batch/updateBatch", body);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Done",
          text: result.message,
        });
        navigate("/dashboard/displaybatch");
      } else {
        Swal.fire({
          icon: "error",
          title: "Ooops...",
          text: result.message,
        });
      }
    }
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
                      Batch
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    onClick={() => navigate("/dashboard/DisplayBatch")}
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
                        Batch List
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
            <div style={{ marginLeft: 20 }}>Batch Update</div>
          </div>
        </Grid>
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            error={!error.organizationId ? false : true}
            helperText={error.organizationId}
            onFocus={() => handleError("organizationId", null)}
            inputProps={{ style: { color: "#000" } }}
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Course"
              value={courseId}
              onChange={(event) => handleCourse(event)}
            >
              {showCourse()}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={batchTime}
              label="Batch Time"
              onChange={(event) => changeBatchTime(event)}
            >
              {showBatchTime()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {" "}
          <div
            style={{
              colors: "#273c75",

              fontSize: 20,
              fontWeight: "bold",

              letterSpacing: 3,
            }}
          >
            Status
          </div>{" "}
        </Grid>
        <Grid item xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={getMon.state}
                  onChange={(event) => handleChangeMon(event)}
                  value="Mon"
                />
              }
              label="Monday"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={getTue.state}
                  onChange={(event) => handleChangeTue(event)}
                  value="Tue"
                />
              }
              label="Tuesday"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={getWed.state}
                  onChange={(event) => handleChangeWed(event)}
                  value="Wed"
                />
              }
              label="Wednesday"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={getThu.state}
                  onChange={(event) => handleChangeThu(event)}
                  value="Thu"
                />
              }
              label="Thursday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={getFri.state}
                  onChange={(event) => handleChangeFri(event)}
                  value="Fri"
                />
              }
              label="Friday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={getSat.state}
                  onChange={(event) => handleChangeSat(event)}
                  value="Sat"
                />
              }
              label="Saturday"
            />
 <FormControlLabel
              control={
                <Checkbox
                  checked={getSun.state}
                  onChange={(event) => handleChangeSun(event)}
                  value="Sun"
                />
              }
              label="Sunday"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={getReg.state}
                  onChange={(event) => handleChangeReg(event)}
                  value="R"
                />
              }
              label="Regular"
            />
          </FormGroup>
        </Grid>

        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            // error={!error.inputBatchName ? false : true}
            // helperText={error.inputBatchName}
            // onFocus={() => handleError("inputBatchName", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Batch Name"
            variant="outlined"
            value={getBatchName}
            // onChange={(e) => setInputBatchName(e.target.value.trim())}
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
        <Grid
          item
          lg={2}
          md={4}
          sm={6}
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            style={{
              backgroundColor: "purple",
              borderRadius: 0,
              fontWeight: 400,
              height: 40,
              padding: 10,
              fontSize: 12,
            }}
            onClick={handleBatch}
            variant="contained"
            fullWidth
          >
            Generate Batch
          </Button>
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
            onClick={() => handleEdit()}
            variant="contained"
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
