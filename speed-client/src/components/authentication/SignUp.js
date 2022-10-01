import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthSetUp";

// finish sign up page
export const SignUp = () => {
  const navigate = useNavigate();
  const { signup, isAuthed } = useAuth();
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value); <- username
    // console.log(e.target[1].value); <- password
    // console.log(e.target[2].value); <- confirmed password
    // console.log(e.target[3].value); <- first name
    // console.log(e.target[4].value); <- last name
    // console.log(e.target[5].value); <- email
    let username = e.target[0].value;
    let password = e.target[1].value;
    let confirmedPassword = e.target[2].value;
    let firstName = e.target[3].value;
    let lastName = e.target[4].value;
    let email = e.target[5].value;

    if (password === confirmedPassword) {
      const newUser = {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
        accountType: "submitter",
      };

      signup(newUser)
        .then((res) => {
          console.log(res?.message);
          setError("");
          if (res?.response?.status === 400) {
            setError("Try again");
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Confirmed password is not the same.");
    }
  };
  //Log In form
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Form style={{ width: "40vw" }} onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">SPEED | Sign Up</h1>
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
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password here..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="Enter your first name here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Enter your last name here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Enter your email here..." />
        </Form.Group>

        <div className="text-center">
          <Button className="text-uppercase" type="submit">
            Create an account
          </Button>
        </div>

        <hr></hr>

        <p className="text-center">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </div>
  );
};
