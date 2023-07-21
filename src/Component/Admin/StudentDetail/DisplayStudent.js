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

export default function DisplayStudent() {
  const [organization, setOrganization] = useState([]);

  const [refresh, setRefresh] = useState(true);
  const navigate = useNavigate();
  const storedState = JSON.parse(localStorage.getItem("admin"));

  const fetchAllOrganization = async () => {
    let body = { organizationid: storedState?.organizationid };
    var list = await postData("studetail/displayAllRecord", body);
    setOrganization(list.data);
    // alert(JSON.parse(list))
  };

  useEffect(function () {
    fetchAllOrganization();
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
        handleDelete(rowData.studentid);
      }
    });
  };

  const handleDelete = async (id) => {
    var body = { studentid: id };
    var result = await postData("studetail/deleteRecord", body);

    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "Done",
        text: result.message,
      });
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops....",
        text: result.message,
      });
    }
  };

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
                        List Of Students
                      </div>
                      <div style={{ fontSize: 13 }}>List of a Students</div>
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
                { title: "StudentName", field: "studentname" },
                { title: "Fathername", field: "fathername" },
                { title: "State", field: "stustate" },
                { title: "City", field: "stucity" },
                { title: "Address", field: "address" },
                {
                  title: "Student photo",
                  field: "stuphoto",
                  render: (rowData) => (
                    <Avatar
                      src={`${ServerURL}/images/${rowData.picture}`}
                      style={{ width: 60, height: 40 }}
                      variant="rounded"
                    />
                  ),
                },
              ]}
              data={organization}
              actions={[
                {
                  icon: "edit",
                  tooltip: "Edit",
                  onClick: (event, rowData) =>
                    navigate("/dashboard/UpdateStudent/" + rowData.studentid),
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
                  onClick: () => navigate("/dashboard/CreateStudent"),
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
                // tableLayout: "fixed",
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
