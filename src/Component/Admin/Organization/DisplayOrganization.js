import MaterialTable from "@material-table/core";
import { AppBar, Avatar, Button, Grid, IconButton, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ServerURL, getData, postData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../../Services/FetchNodeServices";
import "../../../Stylesheet.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export default function DisplayOrganization() {
  const [organization, setOrganization] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();



  const fetchAllOrganization=async()=>{
    var list = await getData('organization/displayAll')
    console.log(list)
     setOrganization(list)
    // alert(JSON.parse(list))
   }
   useEffect(function(){
     fetchAllOrganization()
     
     },[])

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
        handleDelete(rowData.organizationid);
      }
    });
  };


  const handleDelete=async(id)=>{
    var body={'organizationid':id}
    var result=await postData('organization/deleteRecord',body)
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
                        List Of Organization
                      </div>
                      <div style={{ fontSize: 13}}>List of a stores</div>
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
                { title: "ID", field: "organizationid",},
                { title: "Name", field: "organizationname", },
                { title: "Owner", field: "ownername",  },
                { title: "Birth_Date", field: "birthdate",  },
                { title: "Gendor", field: "gender", },
                { title: "State", field: "orgstate",  },
                { title: "City", field: "orgcity", },
                { title: "Address", field: "address",  },
                { title: "Phone", field: "phone" },
                { title: "Mobile", field: "mobile" },
                { title: 'Logo', field: 'logo',
              render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.logo}`} style={{width:60,height:40}} variant="rounded" /> },
            
              { title: 'Picture', field: 'picture',
              render:(rowData)=><Avatar src={`${ServerURL}/images/${rowData.picture}`} style={{width:60,height:40}} variant="rounded" /> },
            

              ]}
              data={organization}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit",
                  onClick: (event, rowData) =>
                    navigate("/dashboard/UpdateOrganization/" + rowData.organizationid),
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
                  onClick: () => navigate("/dashboard/CreateOrganization"),
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
