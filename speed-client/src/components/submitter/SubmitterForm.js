import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const SubmitterForm = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const [UI, setUI] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [researchType, setResearchType] = useState("");
  // ???
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(participantType);
    let body = {
      title: e.target[0].value,
      authors: e.target[1].value,
      journal: e.target[2].value,
      publicationYear: e.target[3].value,
      researchType: researchType,
      participantType: participantType
    };
    submitArticle(body);
  };

  const submitArticle = async (body) => {
    await axios
      .post(`${process.env.REACT_APP_DB_URL}/articles/addArticle`, body, {
        headers: { Authorization: AuthString },
      })
      .then((res) => {
        setUI(<p>This article has successfully added</p>);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Form style={{ width: "40vw" }} onSubmit={handleSubmit}>
        <h1 className="text-center mb-5">SPEED | Submit an Article </h1>
        {error && <h1>{error}</h1>}
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control placeholder="Enter title here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Authors</Form.Label>
          <Form.Control placeholder="Enter authors here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Journal</Form.Label>
          <Form.Control placeholder="Enter journals here..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publication Year</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter publication year here..."
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Research Type</Form.Label>
          <Form.Control
            as="select"
            value={researchType}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setResearchType(e.target.value);
            }}
          >
            <option>Enter research type</option>
            <option value="Case Study">Case Study</option>
            <option value="Experiment">Experiment</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Participant Type</Form.Label>
          <Form.Control
            as="select"
            value={participantType}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setParticipantType(e.target.value);
            }}
          >
            <option>Enter partcipant type</option>
            <option value="Student">Student</option>
            <option value="Practitioner">Practitioner</option>
            <option value="Researcher">Researcher</option>
          </Form.Control>
        </Form.Group>

        <div className="text-center">
          <Button className="text-uppercase" type="submit">
            Submit Article
          </Button>
        </div>

        {UI}
      </Form>
    </div>
  );
};
