import MaterialTable from "@material-table/core";
import {
  AppBar,
  Grid,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {  getData, postData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import "../../../Stylesheet.css";
import Swal from "sweetalert2";

export default function DisplayTiming() {
const storedState = JSON.parse(localStorage.getItem("admin"));

  const [timeTable, setTimeTable] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();


  const fetchAllTimeTable = async () => {
   // var body = { organizationid:storedState.organizationid  };
    var result = await getData("timingtable/displayAlltimingtable");
   //console.log(result);
    setTimeTable(result.data);
  };
  useEffect(function () {
    fetchAllTimeTable();
  }, []);

  const handleDeletconfrim = (rowData) => {
    Swal.fire({
      title: "Are you sure want to Delete?",
      text: "This data will be delete parmanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.value) {
        handleDelete(rowData.transactionid);
      }
    });
  };
  const handleDelete=async(id)=>{
    var body={'transactionid':id}
    let result=await postData('timingtable/deleteRecord',body)
    if(result.status)
    {
        Swal.fire({
            icon: "success",
            title: "Done",
            text: result.message,
          });
          window.location.reload();
      
 
   }
    else
    {
        Swal.fire({
            icon: "error",
            title: "Oops....",
            text: result.message,

          });
    }
  

  
  }
 

  const displayCategories = () => {
    return (
      <div style={{ width: "90%", height: "90%" }} className="store_form_3">
        <Grid container>
          <Grid item xs={12}>
            <AppBar position="static" style={{ background: "#273c75" }}>
              <Toolbar>
                <Grid
                  container
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={10}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: "bold" }}>
                        List Of Batch Time
                      </div>
                      <div style={{ fontSize: 13 }}>List of a stores</div>
                    </div>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              style={{ borderRadius: 0 }}
              title={false}
              columns={[
                { title: "Transaction Id", field: "transactionid" },
                { title: "Start Time", field: "btstart" },
                { title: "End Time", field: "btend" },
                { title: "Organisation Id", field: "organizationid" },
               
              ]}
              data={timeTable}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit",
                  onClick: (event, rowData) =>
                    navigate(
                      "/dashboard/UpdateTimeTable/" + rowData.transactionid
                    ),
                },
                {
                  icon: "delete",
                  tooltip: "Delete",
                  onClick: (event, rowData) => handleDeletconfrim(rowData),
                },

                {
                  icon: "add",
                  tooltip: "Add Store",
                  isFreeAction: true,
                  onClick: () => navigate("/dashboard/TimeTable"),
                },
              ]}
           
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 15, 25, 50],
                // grouping: true,
                search: true,
                actionsColumnIndex: -1,
                cellStyle: {
                  fontSize: 12,
                },
                //tableLayout: "fixed",
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };
  // end- table//

  return <div className="store_form_1">{displayCategories()}</div>;
}
