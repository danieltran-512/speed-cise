import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthSetUp";

export const LogIn = () => {
  const navigate = useNavigate();
  const { signin, isAuthed } = useAuth();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value); <- username
    // console.log(e.target[1].value); <- password
    // console.log(e.target[2].checked); <- remember
    let username = e.target[0].value;
    let password = e.target[1].value;
    let remember = e.target[2].value;
    signin(username, password, remember)
      .then((res) => {
        // console.log(res?.message);
        // console.log("res: " + res);
        setError("");
        if (res?.response?.status === 400) {
          setError("Username or password incorrect");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        //   setError(error?.error);
      });
  };
  //Log In form
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Form style={{ width: "40vw" }} onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">SPEED | Log In</h1>
        {error && <h1>{error}</h1>}
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter your username here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password here..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Remember Me</Form.Label>
          <Form.Check type="switch" id="custom-switch" />
        </Form.Group>

        <div className="text-center">
          <Button className="text-uppercase" type="submit">
            Log In
          </Button>
        </div>

        <hr></hr>

        <p className="text-center">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </Form>
    </div>
  );
};
