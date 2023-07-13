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

export default function DisplayBatch() {
  const [timeTable, setTimeTable] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();

  const fetchAllBatch = async () => {
    var body = { organizationid: 7};
    var result = await postData("batch/displayAll", body);
    //alert(JSON.stringify(result))
    setTimeTable(result);
  };
  useEffect(function () {
    fetchAllBatch();
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
        handleDelete(rowData.batchid);
      }
    });
  };

  const handleDelete=async(batchid)=>{
    var body={'batchid':batchid}
      var  result=await postData('batch/deleteBatch',body)
   
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
                        List Of Batch 
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
                { title: "Batch_Id", field: "batchid" },
                { title: "Course_name", field: "coursename" },
                { title: "Time", field: "batchtime" },
                { title: "Status", field: "status" },
                { title: "Batch_name", field: "batchname" },
                { title: "Organization_id", field: "organizationid" },
               
              ]}
              data={timeTable}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit",
                  onClick: (event, rowData) =>
                    navigate(
                      "/dashboard/UpdateBatch/" + rowData.batchid
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
                  onClick: () => navigate("/dashboard/CreateBatch"),
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
