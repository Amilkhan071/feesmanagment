import MaterialTable from "@material-table/core";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../Services/FetchNodeServices";
import "../../../Stylesheet.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function DisplayTiming() {
  const [timeTable, setTimeTable] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  const fetchAllTimeTable = async () => {
    var body = { organizationid: 1 };
    var result = await postData("timingtable/displayAll", body);
   //console.log(result);
    setTimeTable(result);
   alert(JSON.stringify(result));
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
    if(result)
    {
        Swal.fire({
            icon: "success",
            title: "Done",
            text: 'deleted',
          });
          window.location.reload();
      
 
   }
    else
    {
        Swal.fire({
            icon: "error",
            title: "Oops....",
            text: "Store Does Note Deleted",
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
                { title: "Transaction_Id", field: "transactionid" },
                { title: "Start Time", field: "btstart" },
                { title: "End Time", field: "btend" },
                { title: "Organisation_Id", field: "organizationid" },
               
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
                  // navigate("/productbycategory/" + item.categoryid)
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
              // components={{
              //   Action: (props) => (
              //     <Button
              //       onClick={(event) => props.action.onClick(event, props.data)}
              //       color="primary"
              //       variant="contained"
              //       style={{
              //         margin: 5,
              //         borderRadius: 0,
              //         textTransform: "none",
              //         background:
              //           props.action.icon == "edit"
              //             ? "#00b894"
              //             : props.action.icon == "add"
              //             ? "#00b894"
              //             : "red",
              //       }}
              //       size="small"
              //     >
              //       {/* {props.action.tooltip == "Delete" ? (
              //         <IconButton aria-label="delete"  color="default">
              //           <DeleteIcon />
              //         </IconButton>
              //       ) : (
              //         props.action.tooltip
              //       )}  */}
              //       {props.action.tooltip}
              //     </Button>
              //   ),
              // }}
              options={{
                pageSize: 10,
                pageSizeOptions: [10, 15, 25, 50],
                // grouping: true,
                search: true,
                actionsColumnIndex: -1,
                cellStyle: {
                  fontSize: 12,
                },
                tableLayout: "fixed",
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
