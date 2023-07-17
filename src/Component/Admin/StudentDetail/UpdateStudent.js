import React, { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  Hidden,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import "../../../Stylesheet.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  ServerURL,
  postData,
  postDataAndImage,
} from "../../Services/FetchNodeServices";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StateCity from "../../StateCity.json";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormHelperText } from "@material-ui/core";
import Swal from "sweetalert2";
export default function UpdateStudent(){
  const storedState = JSON.parse(localStorage.getItem("admin"));

  const params = useParams();
  const navigate = useNavigate();
  const [getstuname, setstuname] = React.useState("");
  const [getfathername, setfathername] = React.useState("");
  const [getdob, setdob] = React.useState("");
  const [getGender, setGender] = React.useState("female");
  const [getemail, setemail] = React.useState("");
  const [getmobile, setmobile] = React.useState("");
  const [getparentmobile, setparentmobile] = React.useState("");
  const [getphoneno, setphoneno] = React.useState("");
  const [getwhatsappnumber, setwhatsappnumber] = React.useState("");
  const [getpassword, setpassword] = React.useState("");
  const [getaddress, setaddress] = React.useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getPhoto, setPhoto] = React.useState("");
  const [getstudentphoto, setstudentphoto] = React.useState("");
  const [getqualification, setqualification] = React.useState("");
  const [getqualificationremark, setqualificationremark] = React.useState("");
  const [getInstituename, setInstituename] = React.useState("");
  const [getCourseId, setCourseId] = React.useState("");
  const [getCourseIdList, setCourseIdList] = React.useState([]);
  const [getCurrentDate, setCurrentDate] = React.useState("");
  const [getRemark, setRemark] = React.useState("");
  const [cityData, setCityData] = useState([]);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = React.useState(false);
 
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

 

  const handleSubmitEdit = async () => {
    var body = {
      organizationid: storedState.organizationid,
      studentid:params.stdid ,
      studentname:getstuname,
      fathername: getfathername,
      birthdate: getdob,
      gender: getGender,
      email: getemail,
      mobile: getmobile,
      parentno: getparentmobile,
      phoneno: getphoneno,
      Whatsappnumber: getwhatsappnumber,
      password: getpassword,
      address: getaddress,
      stustate: getState,
      stucity: getCity,
      stuphoto: getPhoto,
      stuqualification: getqualification,
      quaremark: getqualificationremark,
      institutename: getInstituename,
      courseid: getCourseId,
      currentdate: getCurrentDate,
      remark: getRemark,
    };
    var result = await postData("studetail/updateRecord", body);
    console.log(body);
    if (result) {
      alert("Record update");
    } else {
      alert("Record failed update");
    }
  };
  const handlephoto = (event) => {
    setstudentphoto(URL.createObjectURL(event.target.files[0]));
    setPhoto(event.target.files[0]);
  }

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  const stateCityData = Object.keys(StateCity);

  const fillCourse = async () => {
    var body = { organizationid: storedState.organizationid };
    var record = await postData("course/displayAll", body);

    setCourseIdList(record);
  };

  function showCourse() {
    return getCourseIdList.map((item) => (
      <MenuItem value={item.courseid}>{item.coursename}</MenuItem>
    ));
  }

  const searchById = async () => {
    let body = {
      studentid: params.stdid,
      organizationid: storedState.organizationid,
    };
    let record = await postData("studetail/displayById", body);
    // alert(JSON.stringify(record))

    if (record != null) {
      setstuname(record.studentname); // database column name studentname like this
      setfathername(record.fathername);
      var bd = new Date(record.birthdate);
      var tbd =
        bd.getFullYear() + "/" + (bd.getMonth() + 1) + "/" + bd.getDate();
      setdob(tbd);
      setGender(record.gender);
      setemail(record.email);
      setmobile(record.mobile);
      setparentmobile(record.parentmobileno);
      setphoneno(record.phoneno);
      setwhatsappnumber(record.whatsappnumber);
      setpassword(record.password);
      setaddress(record.address);
      setState(record.stustate);
      setCityData(StateCity[record.stustate]);
      setCity(record.stucity);
      setstudentphoto(`${ServerURL}/images/${record.picture}`);
      setqualification(record.qualification);
      setqualificationremark(record.quaremark);
      setInstituename(record.institutename);
      setCourseId(record.courseid);
      setCurrentDate(record.currentdate);
      setRemark(record.remark);
    } else {
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  useEffect(function () {
    fillCourse();
  }, []);


 

  

  const showState = () => {
    return stateCityData?.map((item) => (
      <MenuItem value={item}>{item}</MenuItem>
    ));
  };
  const editStudentPicture = async () => {
    var formData = new FormData();
    formData.append("organizationid", storedState.organizationname);
    formData.append("studentid", params.stdid);
    formData.append("picture", getPhoto);
    let config = { headers: { "content-type": "multipart/form-data" } };
    let result = await postDataAndImage(
      "studetail/updateLogo",
      formData,
      config
    );
    if (result) {
      alert("Logo  Updated..");
    } else {
      alert("Fail to Update Logo...");
    }
  };

  const showCity = () => {
    return cityData?.map((item) => <MenuItem value={item}>{item}</MenuItem>);
  };

  const handleChangeState = (event) => {
    setState(event.target.value);
    setCityData(StateCity[event.target.value.trim()]);
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
                      Edit Students
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    onClick={() => navigate("/dashboard/Displaystudent")}
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
                        Students List
                      </div>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            // error={!error.getorganizationid ? false : true}
            // helperText={error.getorganizationid}
            // onFocus={() => handleError("getorganizationid", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Organization id"
            variant="outlined"
            value={storedState.organizationid}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            error={!error.getstuname ? false : true}
            helperText={error.getstuname}
            onFocus={() => handleError("getstuname", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Student Name"
            variant="outlined"
            value={getstuname}
            onChange={(e) => setstuname(e.target.value.trimStart())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Father's Name"
            variant="outlined"
            error={!error.getfathername ? false : true}
            helperText={error.getfathername}
            onFocus={() => handleError("getfathername", null)}
            value={getfathername}
            onChange={(e) => setfathername(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth Date"
              //  value={getDob}
              onChange={(item) => setdob(item)}
              //defaultValue={getDob}
               //value={getDob}
              slotProps={{
                textField: {
                  variant: "standard",
                  fullWidth: "100%",
                  helperText: error.getDob,
                  error: !error.getDob ? false : true,
                  onFocus: () => handleError("getDob", null),
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
      
        <Grid item md={6}>
          <FormControl error={!error.getGender ? false : true}>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
             onFocus={() => handleError("getGender", null)}

              value={getGender}
              onChange={(event) => setGender(event.target.value)}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormHelperText style={{ color: "#d32f2f" }}>
              {error.getGender}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Email Address"
            variant="outlined"
            error={!error.getemail ? false : true}
            helperText={error.getemail}
            onFocus={() => handleError("getemail", null)}
            fullWidth
            value={getemail}
            onChange={(e) => setemail(e.target.value.trim())}
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

        <Grid item md={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
             error={!error.getState ? false : true}
             onFocus={() => handleError("getState", null)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getState}
              label="Select State"
              onChange={(event) => handleChangeState(event)}
            >
              <MenuItem value={"Choose State..."}>Choose State...</MenuItem>
              {showState()}
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
              {error.getState}
            </div>
          )}
        </Grid>

        <Grid item md={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              error={!error.getCity ? false : true}
              onFocus={() => handleError("getCity", null)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getCity}
              label="Select City"
              onChange={(event) => setCity(event.target.value)}
            >
              {showCity()}
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
              {error.getCity}
            </div>
          )}
        </Grid>
       
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Mobile"
            variant="outlined"
            error={!error.getmobile ? false : true}
            helperText={error.getmobile}
            onFocus={() => handleError("getmobile", null)}
            fullWidth
            value={getmobile}
            inputProps={{ maxLength: 10 }}
            onChange={(e) => setmobile(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Parent's Mobile No"
            variant="outlined"
            error={!error.getparentmobile ? false : true}
            helperText={error.getparentmobile}
            onFocus={() => handleError("getparentmobile", null)}
            fullWidth
            value={getparentmobile}
            inputProps={{ maxLength: 10 }}
            onChange={(e) => setparentmobile(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Phone No"
            variant="outlined"
            error={!error.getphoneno ? false : true}
            helperText={error.getphoneno}
            onFocus={() => handleError("getPhone", null)}
            fullWidth
            inputProps={{ maxLength: 10 }}
            value={getphoneno}
            onChange={(e) => setphoneno(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Whats App Number"
            variant="outlined"
            error={!error.getwhatsappnumber ? false : true}
            helperText={error.getwhatsappnumber}
            onFocus={() => handleError("getwhatsappnumber", null)}
            fullWidth
            inputProps={{ maxLength: 10 }}
            value={getwhatsappnumber}
            onChange={(e) => setwhatsappnumber(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Password"
            variant="outlined"
            error={!error.getpassword ? false : true}
            helperText={error.getpassword}
            onFocus={() => handleError("getpassword", null)}
            value={getpassword}
            onChange={(e) => setpassword(e.target.value.trim())}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
        <Grid item md={12} lg={12} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Address"
            variant="outlined"
            error={!error.getaddress ? false : true}
            helperText={error.getaddress}
            onFocus={() => handleError("getaddress", null)}
            value={getaddress}
            onChange={(e) => setaddress(e.target.value.trimStart())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getState}
              label="Select State"
              onChange={(event) => handleChangeState(event)}
            >
              {showState()}
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
              {error.getState}
            </div>
          )}
        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getCity}
              label="Select City"
              onChange={(event) => setCity(event.target.value)}
            >
              {showCity()}
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
              {error.getCity}
            </div>
          )}
        </Grid>

        <Grid item md={6} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Qualification</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getqualification}
              label="Select Qualification"
              onChange={(event) => setqualification(event.target.value)}
            >
              <MenuItem value={"12"}>12</MenuItem>
              <MenuItem value={"Graduate"}>Graduate</MenuItem>
              <MenuItem value={"PostGraduate"}>Post Graduate</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
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
              {error.getqualification}
            </div>
          )}
        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Qualification Remark"
            variant="outlined"
            error={!error.getqualificationremark ? false : true}
            helperText={error.getqualificationremark}
            onFocus={() => handleError("getqualificationremark", null)}
            fullWidth
            value={getqualificationremark}
            onChange={(e) => setqualificationremark(e.target.value.trimStart())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Institute Name"
            variant="outlined"
            error={!error.getInstituename ? false : true}
            helperText={error.getInstituename}
            onFocus={() => handleError("getInstituename", null)}
            fullWidth
            value={getInstituename}
            onChange={(e) => setInstituename(e.target.value.trim())}
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
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Course id</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={getCourseId}
              label="Select Course id"
              onChange={(event) => setCourseId(event.target.value)}
            >
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
              {error.getCourseId}
            </div>
          )}
        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Current Date"
            variant="outlined"
            error={!error.getCurrentDate ? false : true}
            helperText={error.getCurrentDate}
            onFocus={() => handleError("getCurrentDate", null)}
            fullWidth
            value={getCurrentDate}
            onChange={(e) => setCurrentDate(e.target.value.trim())}
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
            label="Remark"
            variant="outlined"
            error={!error.getRemark ? false : true}
            helperText={error.getRemark}
            onFocus={() => handleError("getRemark", null)}
            fullWidth
            value={getRemark}
            onChange={(e) => setRemark(e.target.value.trimStart())}
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
        <Grid item md={3} lg={4} sm={12} xs={12}>
          <Button variant="contained" component="label" fullWidth>
            Photograph
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => handlephoto(event)}
            />
          </Button>
          {error && (
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
          )}

        </Grid>
        <Grid item md={6} lg={4} sm={12} xs={12}>
          <Avatar
            alt="photo"
            src={getstudentphoto}
            variant="circular"
            sx={{ width: 56, height: 56 }}
          />
          <Button
            onClick={editStudentPicture}
            variant="contained"
            color="primary"
          >
            Student picture
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
            onClick={() => handleSubmitEdit()}
            variant="contained"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
