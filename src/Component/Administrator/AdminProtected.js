import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProtected(props) {
  const navigate = useNavigate();
  const { Component } = props;
  //const Admin = localStorage.getItem("admin");

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("admin"));

    if (storedState == null) {
      navigate("/orgadminlogin");
    }
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
}
