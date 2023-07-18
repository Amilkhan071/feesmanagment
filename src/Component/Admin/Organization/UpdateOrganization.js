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
export default function UpdateOrganization() {
  const params = useParams();
  const [getOrgName, setOrgName] = useState("");
  const [getOwnerName, setOwnerName] = useState("");
  const [getDob, setDob] = useState("");
  const [getGender, setGender] = useState("");
  const [getAddress, setAddress] = useState("");
  const [getState, setState] = useState("");
  const [getCity, setCity] = useState("");
  const [getMobile, setMobile] = useState("");
  const [getPhone, setPhone] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getOwnerPicture, setOwnerPicture] = useState("");
  const [getLogoPicture, setLogoPicture] = useState("");
  const [getPassword, setPassword] = useState("");
  const [cityData, setCityData] = useState([]);
  const [error, setError] = useState({});
  const [getStatus,setStatus]=useState('')


  const [showPassword, setShowPassword] = React.useState(false);

  const [getOwnerPicturePath, setOwnerPicturePath] = React.useState("");
  const [getLogoPicturePath, setLogoPicturePath] = React.useState("");
  const [getRecord, setRecord] = useState("");
  const[cnfmPassword,setCnfmPassword]=useState("")
  const [showConfirm,setShowConfirm]=useState('')

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickConfirmPassword = () => setShowConfirm((sho) => !sho);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const stateCityData = Object.keys(StateCity);

  const handleSubmitEdit = async () => {
    if(validation()){
    var body = {
      organizationid: params.orgid,
      organizationName: getOrgName,
      ownerName: getOwnerName,
      birthDate: getDob,
      gender: getGender,
      address: getAddress,
      state: getState,
      city: getCity,
      mobile: getMobile,
      phone: getPhone,
      email: getEmail,
      password: getPassword,
      status: getStatus
    };
    let result = await postData("organization/updateRecord", body);
    if (result) {
      alert("success");
      navigate('/maindashboard/displayorganization')
    } else {
      alert("failed");
    }
  }
  };
  const searchById = async () => {
    var body = { organizationid: params.orgid };
    var record = await postData("organization/displayById", body);
   // alert(record.birthdate)
    if (record != null) {
      setRecord(record);
      setOrgName(record.organizationname);

      setOwnerName(record.ownername);
      var bd = new Date(record.birthdate);
      var tbd = bd.getFullYear() + "/" + (bd.getMonth() + 1) + "/" + bd.getDate();
      setDob(tbd);
      //alert(tbd)
      setGender(record.gender);
      setAddress(record.address);
      setState(record.orgstate);
      setCityData(StateCity[record.orgstate]);
      setCity(record.orgcity);
      setMobile(record.mobile);
      setPhone(record.phone);
      setEmail(record.email);
      setPassword(record.password);
      setCnfmPassword(record.password)
      setStatus(record.status)
      setOwnerPicturePath(`${ServerURL}/images/${record.picture}`);
      setLogoPicturePath(`${ServerURL}/images/${record.logo}`);
      setLogoPicture(record.logo)
      setOwnerPicture(record.picture)
    } else {
    }
  };

  useEffect(() => {
    searchById();
  }, []);

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  const handleOwnerPicture = (event) => {
    setOwnerPicturePath(URL.createObjectURL(event.target.files[0]));
    setOwnerPicture(event.target.files[0]);
  };
  const handleLogoPicture = (event) => {
    setLogoPicturePath(URL.createObjectURL(event.target.files[0]));
    setLogoPicture(event.target.files[0]);
  };

  const showState = () => {
    return stateCityData?.map((item) => (
      <MenuItem value={item}>{item}</MenuItem>
    ));
  };

  const showCity = () => {
    return cityData?.map((item) => <MenuItem value={item}>{item}</MenuItem>);
  };

  const handleChangeState = (event) => {
    setState(event.target.value);
    setCityData(StateCity[event.target.value.trim()]);
  };

  const handleEditOwnerPicture = async () => {
    var formData = new FormData();
    formData.append("organizationid", params.orgid);
    formData.append("picture", getOwnerPicture);
    let config = { headers: { "content-type": "multipart/form-data" } };
    let result = await postDataAndImage(
      "organization/updatePicture",
      formData,
      config
    );
    if (result) {
      alert("update");
    } else {
      alert("not update");
    }
  };

  const handleEditLogo = async () => {
    var formData = new FormData();
    formData.append("organizationid", params.orgid);
    formData.append("logo", getLogoPicture);
    let config = { headers: { "content-type": "multipart/form-data" } };
    let result = await postDataAndImage(
      "organization/updateLogo",
      formData,
      config
    );
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: 'Updated',
      });
      

    } else {
      Swal.fire({
        icon: "error",
        title: "Ooops....",
        text: 'Not Updated',
      });
    }
  };

  const validation = () => {
    var isValid = true;

    if (!getOwnerName) {
      handleError("getOwnerName", "Please Input Name");
      isValid = false;
    }

    if (getOwnerName) {
      if (getOwnerName.length > 18 || getOwnerName.length < 4) {
        handleError(
          "getOwnerName",
          "Please Input Name Between 4 to 18 letters"
        );
        isValid = false;
      }
    }

    if (!/^[a-zA-Z()\s.]*$/.test(getOwnerName)) {
      handleError("getOwnerName", "Please Input Valid Name");
      isValid = false;
    }

    if (!getOrgName) {
      handleError("getOrgName", "Please Input organization name");
      isValid = false;
    }


    if (!/^[a-zA-Z0-9()\s.]*$/.test(getOrgName)) {
      handleError("getOrgName", "Please check organization name");
      isValid = false;
    }

    if (getOrgName) {
      if (getOrgName.length > 20 || getOrgName.length < 5) {
        handleError(
          "getOrgName",
          "Please Input Name Between 5 to 20 letters"
        );
        isValid = false;
      }
    }



    if (!getPassword) {
      handleError("getPassword", "Please Input password");
      isValid = false;
    }
    if (!getCity) {
      handleError("getCity", "Please Select City");
      isValid = false;
    }
    if (!getState) {
      handleError("getState", "Please Select State");
      isValid = false;
    }
    if (!getStatus) {
      handleError("getStatus", "Please Select Status");
      isValid = false;
    }
    // if (password.length > 8 || password.length < 8) {
    //   handleError("password", "Please Input 8 Digits password");
    //   isValid = false;
    // }

    if (getPassword.length) {
      if (
        !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          getPassword
        )
      ) {
        handleError(
          "getPassword",
          "Invalid Password,Password only contain 6 to 16 valid characters,have alphabets & at least a number, and one special character"
        );

        isValid = false;

      }
    }

    if (getMobile.length) {
      if (isNaN(getMobile) || getMobile.length < 10) {
        handleError("getMobile", "Please enter a valid mobile number");
        isValid = false;
      }
    }

    if (!getMobile) {
      handleError("getMobile", "Please Input mobile number");
      isValid = false;
      
    }

    if (getEmail.length) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(getEmail)) {
        handleError("getEmail", "Please enter a valid emailAddress");
        isValid = false;
       
      }
    }
    if (!getDob) {
      handleError("getDob", "Please select birthdate");
      isValid = false;
     
    }

    if (!getEmail) {
      handleError("getEmail", "Please Input Email Address");
      isValid = false;
     
    }
    if (!getAddress) {
      handleError("getAddress", "Please Input address");
      isValid = false;
      
    }

    if (getPhone.length < 10) {
      handleError("getPhone", "Please enter a valid Phone number");
      isValid = false;
    

    }

    if (isNaN(getPhone)) {
      handleError("getPhone", "Please enter a valid Phone number");
      isValid = false;
    }

    if (!getPhone) {
      handleError("getPhone", "Please enter a valid Phone number");
      isValid = false;
     
    }

    if (!getGender) {
      handleError("getGender", "Please Select gender");
      isValid = false;
      
      
    }
    if (!getOwnerPicture) {
      handleError("getOwnerPicture", "Please Select ownerpicture");
      isValid = false;
     
    }

    if (!getLogoPicture) {
      handleError("getLogoPicture", "Please Select logopicture");
      isValid = false;
      
    }

    if(cnfmPassword){ 
      if( getPassword !== cnfmPassword ){
        handleError("cnfmPassword", "Password does not match");
        isValid = false;
      }
  
    }
  
    if(!cnfmPassword){ 
   
        handleError("cnfmPassword", "Please Confirm Password");
        isValid = false;
      }


    return isValid;
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
                      Edit Organization
                    </div>
                  </div>
                </Grid>
                <Grid item xs={2}>
                  <div
                    onClick={() => navigate("/maindashboard/DisplayOrganization")}
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
                        Organization List
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
            <div style={{ marginLeft: 20 }}>Update Ragistration</div>
          </div>
        </Grid>
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            error={!error.getOrgName ? false : true}
            helperText={error.getOrgName}
            onFocus={() => handleError("getOrgName", null)}
            inputProps={{ style: { color: "#000" } }}
            id="standard-basic"
            label="Organization Name"
            variant="outlined"
            value={getOrgName}
            onChange={(e) => setOrgName(e.target.value.trimStart())}
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
          <TextField
            id="standard-basic"
            label="Owner Name"
            variant="outlined"
            error={!error.getOwnerName ? false : true}
            helperText={error.getOwnerName}
            onFocus={() => handleError("getOwnerName", null)}
            value={getOwnerName}
            onChange={(e) => setOwnerName(e.target.value.trimStart())}
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
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Birth Date"
              onChange={(item) => setDob(item)}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: "100%",
                  helperText: error.getDob,
                  error: !error.getDob ? false : true,
                  onFocus: () => handleError("getDob", null),
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={4} lg={4} sm={12} xs={12}>
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
    

        <Grid item md={4} lg={4} sm={12} xs={12}>
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

        <Grid item md={4} lg={4} sm={12} xs={12}>
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
        <Grid item md={4}  lg={4}sm={12} xs={12}>
        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                 error={!error.getStatus ? false : true}
                                 onFocus={() => handleError("getStatus", null)}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={getStatus}
                                    label="Select Status"
                                    onChange={(event)=>setStatus(event.target.value)}
                                >
                                    <MenuItem value={'Valid'}>Valid</MenuItem>
                                    <MenuItem value={'Invalid'}>Invalid</MenuItem>

                                   
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
              {error.getStatus}
            </div>
          )}
        </Grid>
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Mobile"
            variant="outlined"
            error={!error.getMobile ? false : true}
            helperText={error.getMobile}
            onFocus={() => handleError("getMobile", null)}
            fullWidth
            value={getMobile}
            inputProps={{ maxLength: 10 }}
            onChange={(e) => setMobile(e.target.value.trim())}
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
        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Phone"
            variant="outlined"
            error={!error.getPhone ? false : true}
            helperText={error.getPhone}
            onFocus={() => handleError("getPhone", null)}
            fullWidth
            inputProps={{ maxLength: 10 }}
            value={getPhone}
            onChange={(e) => setPhone(e.target.value.trim())}
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

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Email Address (optional)"
            variant="outlined"
            error={!error.getEmail ? false : true}
            helperText={error.getEmail}
            onFocus={() => handleError("getEmail", null)}
            fullWidth
            value={getEmail}
            onChange={(e) => setEmail(e.target.value.trim())}
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

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Password"
            variant="outlined"
            error={!error.getPassword ? false : true}
            helperText={error.getPassword}
            onFocus={() => handleError("getPassword", null)}
            value={getPassword}
            onChange={(e) => setPassword(e.target.value.trim())}
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

        <Grid item md={4} lg={4} sm={12} xs={12}>
          <TextField
            id="standard-basic"
            label="Confirm Password"
            variant="outlined"
            error={!error.cnfmPassword ? false : true}
            helperText={error.cnfmPassword}
            onFocus={() => handleError("cnfmPassword", null)}
            value={cnfmPassword}
            onChange={(e) => setCnfmPassword (e.target.value.trim())}
            type={showConfirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
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
            multiline
            rows={4}
            variant="outlined"
            error={!error.getAddress ? false : true}
            helperText={error.getAddress}
            onFocus={() => handleError("getAddress", null)}
            value={getAddress}
            onChange={(e) => setAddress(e.target.value.trimStart())}
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


      
        <Grid item md={1} lg={1} sm={3} xs={3}>

          <Avatar
            alt="Picture"
            src={getOwnerPicturePath}
            variant="circular"
            sx={{ width: 56, height: 56 }}
          />

       
        </Grid>

        <Grid item md={5} lg={5} sm={12} xs={12}>
          <Button variant="contained" component="label" fullWidth>
          Select Owner Picture
            
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => {handleOwnerPicture(event);handleError("getOwnerPicture", null)}}
            />
          </Button>
          <Button
            onClick={handleEditOwnerPicture}
            variant="contained"
            color="primary"
            fullWidth
            style={{marginTop:5}}
          >
            Edit Owner Picture
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



       
        <Grid item md={1} lg={1} sm={3} xs={3}>
          <Avatar
            alt="Logo"
            src={getLogoPicturePath}
            variant="circular"
            sx={{ width: 56, height: 56 }}
          />
         
        </Grid>
        <Grid item md={5} lg={5} sm={12} xs={12}>
          <Button variant="contained" component="label" fullWidth>
           Select Organization Logo
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={(event) => {handleLogoPicture(event);handleError("getLogoPicture", null)}}
            />
          </Button>
          <Button
           style={{marginTop:5}}
           onClick={handleEditLogo} variant="contained" color="primary" fullWidth>
            Edit Organization Logo
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
             {error.getLogoPicture}
            </div>
          )}

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
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
