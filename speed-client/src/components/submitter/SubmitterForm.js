import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";
import "./SubmitterForm.css";

export const SubmitterForm = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const [UI, setUI] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [researchType, setResearchType] = useState("");
  const [practice, setPractice] = useState("");
  const [practiceDisplay, setPracticeDisplay] = useState("");
  const [claimID, setClaimID] = useState("");
  const [claimTitle, setClaimTitle] = useState(`Select a specifc claim`);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    console.log(participantType);
    if (claimID === "") return;
    console.log("claimID: " + claimID);
    let body = {
      title: e.target[0].value,
      authors: e.target[1].value,
      journal: e.target[2].value,
      publicationYear: e.target[3].value,
      researchType: researchType,
      participantType: participantType,
      status: "submitted",
      claimID: claimID,
    };
    submitArticle(body);
  };

  //Populate the practice list from the menu 
  const [practiceList, setPracticeList] = useState([]);

  //retrieve list of practice from database
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DB_URL}/practices`)
      .then((res) => {
        setPracticeList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Set the selected practice
  const handleSelect = (eventKey, event) => {
    setPractice(eventKey);
    setPracticeDisplay(event.target.innerHTML);
  };

  //Set the claims for the selected practice
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    if (!practice) return;
    axios
      .get(`${process.env.REACT_APP_DB_URL}/claims/${practice}`)
      .then((res) => {
        setClaims(res.data);
      })
      .catch((err) => console.log(err));
  }, [practice]);

  //Navigate to the claim page
  const navigateClaim = (claim, event) => {
    setClaimID(claim);
    setClaimTitle(event.target.innerHTML);
  };
  //d-flex justify-content-center align-items-center
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
    <div className="d-flex justify-content-center align-items-center p-5">
      <Form style={{ width: "50vw" }} className="border rounded p-5" onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3">
          <Form.Label>Claim Type</Form.Label>
          {error && <p>{error}</p>}
          {!practice && (
            <div className="dropdown">
              <DropdownButton
                variant={practice ? "outline-secondary" : "outline-primary"}
                title="Select a software engineering practice"
                onSelect={handleSelect}
              >
                {practiceList.map((practice) => (
                  <Dropdown.Item
                    eventKey={practice.id}
                    key={practice.title}
                    name={practice.title}
                  >
                    {practice.title}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          )}

          {practice && (
            <div className="dropdown">
              <DropdownButton title={claimTitle} onSelect={navigateClaim}>
                {claims.map((claim) => (
                  <Dropdown.Item eventKey={claim.id} key={claim.id}>
                    {claim.claim}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <p>Or...</p>
              <Button
                variant="outline-secondary"
                onClick={() => setPractice("")}
              >
                Select another practice
              </Button>
            </div>
          )}
        </Form.Group>

        <div className="text-center">
          <Button className="text-uppercase" type="submit">
            Submit Article
          </Button>
        </div>

        {UI}
        <br></br>
        <div className="text-center">
          <Link to={"/"}>
            <button className="btn btn-outline-primary btn-block">
              Go back to Home
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};
