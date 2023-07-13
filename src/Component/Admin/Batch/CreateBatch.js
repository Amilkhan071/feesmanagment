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
import { getData, postData } from "../../Services/FetchNodeServices";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function CreateBatch() {
  const [selectedDate1, setSelectedDate1] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [selectedDate2, setSelectedDate2] = useState(
    new Date("2014-08-18T21:11:54")
  );
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


  const [getMon, setMon] = useState({ value: "", state: false });
  const [getTue, setTue] = useState({ value: "", state: false });
  const [getWed, setWed] = useState({ value: "", state: false });
  const [getThu, setThu] = useState({ value: "", state: false });
  const [getFri, setFri] = useState({ value: "", state: false });
  const [getSat, setSat] = useState({ value: "", state: false });
  const [getReg, setReg] = useState({ value: "", state: false });

 

  const handleChangeMon = (event) => {
    if (event.target.checked)
      setMon({ value: "M", state: event.target.checked });
    else setMon({ value: "", state: event.target.checked });
  };

  const handleChangeTue = (event) => {
    if (event.target.checked)
      setTue({ value: "T", state: event.target.checked });
    else setTue({ value: "", state: event.target.checked });
  };

  const handleChangeWed = (event) => {
    if (event.target.checked)
      setWed({ value: "W", state: event.target.checked });
    else setWed({ value: "", state: event.target.checked });
  };

  const handleChangeThu = (event) => {
    if (event.target.checked)
      setThu({ value: "t", state: event.target.checked });
    else setThu({ value: "", state: event.target.checked });
  };

  const handleChangeFri = (event) => {
    if (event.target.checked)
      setFri({ value: "F", state: event.target.checked });
    else setFri({ value: "", state: event.target.checked });
  };

  const handleChangeSat = (event) => {
    if (event.target.checked)
      setSat({ value: "S", state: event.target.checked });
    else setSat({ value: "", state: event.target.checked });
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
    } else {
      setReg({ value: "", state: event.target.checked });
    }
  };
 
  const handleBatch = () =>{
    var date = new Date();
    var month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec", ]; 
   
   
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
      getReg.value;
    setStatus(status);
    var batchname =
      month[date.getMonth()] +
      " ," +
      date.getFullYear() +
      " ," +
      courseName +
      " " +
      batchStartTime +
      "," +
      status;
    setBatchName(batchname);
  };


  var navigate = useNavigate();


  const changeBatchTime = (event) => {
    var crst = event.target.value.split(",");
    setBatchTime(event.target.value);
    setBatchStartTime(crst[1]);
  };
  const handleCourse = (event) => {
    var crs = event.target.value.split(",");
    setCourseId(event.target.value);
    setCourseName(crs[1]);
  };
  const handleSubmit = async () => {
    if(validation()){
    var time = batchTime.split(",");
    var crs = courseId.split(",");
    var body = {
      organizationid: organizationId,
      coursename: crs[1],
      timing: time[1],
      status: getStatus,
      batchname: getBatchName,
    };
   var  result = await postData("batch/addNewRecord", body);
    if (result) {
     alert('submitted')
     navigate("/dashboard/DisplayBatch")
     } else {
alert('failed')
    }
  }
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

  const fillCourse = async () => {
    var body = { organizationid: 7 };
    var list = await postData("course/displayAll", body);
    setCourseNameList(list);
    // alert(JSON.stringify(list))
    //console.log(list);
  };

  
  const showCourse = () => {
    return courseNameList?.map((item) => (
      <MenuItem value={`${item.courseid},${item.coursename}`}>
        {item.coursename}
      </MenuItem>
    ));
  };

  const fillBatchTime = async () => {
    let list = await getData("timingtable/displayAlltimingtable");
    console.log(list);
    setBatchTimeList(list);
  };

  const showBatchTime = () => {
    return batchTimeList.map((item) => (
      <MenuItem value={`${item.transactionid},${item.btstart}`}>
        {item.btstart} to {item.btend}
      </MenuItem>
    ));
  };

  useState(() => {
    fillBatchTime();
    fillCourse();
  }, []);

 

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
            <div style={{ marginLeft: 20 }}>Batch Register</div>
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
              error={!error.courseId ? false : true}
              //helperText={error.courseId}
              onFocus={() => handleError("courseId", null)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Select Course"
              value={courseId}
              onChange={(event) => handleCourse(event)}
            >
              <MenuItem value={"Choose Course..."}>Choose Course...</MenuItem>
              {showCourse()}
            </Select>
          </FormControl>
          {error && (
            <div
              style={{
                fontSize: 12,
                color: "#d32f2f",
                paddingTop: 5,
              }}
            >
              {error.courseId}
            </div>
          )}
        </Grid>

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Batch Time</InputLabel>
            <Select
             error={!error.batchTime ? false : true}
             //helperText={error.courseId}
             onFocus={() => handleError("batchTime", null)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={batchTime}
              label="Batch Name"
              onChange={(event) => changeBatchTime(event)}
            >
              <MenuItem value={"Choose State..."}>
                Choose Batch Time...
              </MenuItem>
              {showBatchTime()}
            </Select>
          </FormControl>

          {error && (
            <div
              style={{
                fontSize: 12,
                color: "#d32f2f",
                paddingTop: 5,
              }}
            >
              {error.batchTime}
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
            <FormGroup row>
              <FormLabel component="legend" >
                Status
              </FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={getMon.state}
                    onChange={(event) => handleChangeMon(event)}
                    value="M"
                  />
                }
                label="Monday"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={getTue.state}
                    onChange={(event) => handleChangeTue(event)}
                    value="T"
                  />
                }
                label="Tuesday"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={getWed.state}
                    onChange={(event) => handleChangeWed(event)}
                    value="W"
                  />
                }
                label="Wednesday"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={getThu.state}
                    onChange={(event) => handleChangeThu(event)}
                    value="Th"
                  />
                }
                label="Thursday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={getFri.state}
                    onChange={(event) => handleChangeFri(event)}
                    value="F"
                  />
                }
                label="Friday"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={getSat.state}
                    onChange={(event) => handleChangeSat(event)}
                    value="S"
                  />
                }
                label="Saturday"
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
       
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
             error={!error.getBatchName ? false : true}
             helperText={error.getBatchName}
             onFocus={() => handleError("getBatchName", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Batch Name"
            variant="standard"
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
          md={2}
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
            // onClick={() => handleTarnsferStatus()}
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
