import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const handleSubmit = () => {
    alert("Not yet developed.");
  };
  //Log In form
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Form style={{ width: "40vw" }} onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">SPEED | Sign Up</h1>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Username</Form.Label>
          <Form.Control
            id="disabledTextInput"
            placeholder="Enter your username here..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Password</Form.Label>
          <Form.Control
            type="password"
            id="disabledTextInput"
            placeholder="Enter your password here..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="disabledTextInput">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            id="disabledTextInput"
            placeholder="Enter your password here..."
          />
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
