import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const SubmitterLanding = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const navigate = useNavigate();

  //Navigate to the work backlog page
  const navigateHome = () => {
    navigate("/");
  };

  const navigateSubmitterForm = () => {
    navigate("/submitterform");
  };

  return (
    <>
      <h1>Welcome {user.username}</h1>
      <button onClick={() => navigateHome()}>Go Home</button>
      <button onClick={() => navigateSubmitterForm()}>Submit Form</button>
      <h2>submitter landing</h2>
    </>
  );
};
