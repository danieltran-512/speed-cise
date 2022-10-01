import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useAuth } from "./authentication/AuthSetUp";
import { Role } from "./authentication/AuthSetUp";

export const Landing = () => {
  const { user } = useAuth();

  if (user.role === Role.Moderator) {
    return Landing;
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Container
        className=" border rounded p-4 text-center"
        style={{ width: "40%" }}
      >
        <Row>
          <Col className="text-uppercase">
            <h1>Speed</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Software Practice Empirical Evidence Database</p>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col>
            <Link to={"/search"}>
              <button className="btn btn-outline-primary btn-block">
                Search Article
              </button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-5 text-right">
          <Col>
            <p>
              or <a href="/login">Log in</a>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
