import axios from "axios";
const ServerURL = "http://localhost:3001"

const getData = async (url) => {
    try {
      var response = await fetch(`${ServerURL}/${url}`,{
        headers:{
          Authorization:"Bearer " +JSON.parse(localStorage.getItem("TOKEN"))
        },
      });
      var result = await response.json();
      return result;
    } catch (e) {
      return { status: false };
    }
  };
  
  const postData = async (url, body) => {
    try {
      var response = await axios.post(`${ServerURL}/${url}`, body,{
        headers:{
          Authorization:"Bearer " +JSON.parse(localStorage.getItem("TOKEN"))
        },
      });
      var result = await response.data;
      return result;
    } catch (error) {
      return false;
    }
  };
  
  const putData = async (url, body) => {
    try {
      var response = await axios.put(`${ServerURL}/${url}`, body,{
        headers:{
          Authorization:"Bearer " +localStorage.getItem("TOKEN")
        },
      });
      var result = await response.data;
      return result;
    } catch (error) {
      return false;
    }
  };
  
  const deleteData = async (url, body) => {
    try {
      var response = await axios.delete(`${ServerURL}/${url}`, body,{
        headers:{
          Authorization:"Bearer " +localStorage.getItem("TOKEN")
        },
      });
      var result = await response.data;
      return result;
    } catch (error) {
      
      return false;
    }
  };
  const postDataAndImage = async (url, formData,) => {
    try {
      var response = await axios.post(`${ServerURL}/${url}`, formData, {
        headers:{
          Authorization:"Bearer " +JSON.parse(localStorage.getItem("TOKEN"))
        }
      });
      console.log(response.data);
      //  var result=response.data[0].result
      var result = await response.data;
      console.log('mmmsfafaf', response);
      return result;
    } catch (e) {
      console.log(e);
    }
  };
  
  export { ServerURL, postData,postDataAndImage, getData, putData, deleteData };
  