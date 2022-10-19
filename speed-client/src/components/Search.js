import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";

export const Search = () => {
  const year = new Date().getFullYear() - 20;
  const years = Array.from(new Array(20), (val, index) => index + year);
  const [earliestYear, setEarliestYear] = useState(year - 1);
  const [latestYear, setLatestYear] = useState(year + 20);
  const [error, setError] = useState("");
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

  const [practice, setPractice] = useState("");
  const [practiceDisplay, setPracticeDisplay] = useState("");

  const navigate = useNavigate();

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
    if (earliestYear <= latestYear) {
      navigate("/search/" + claim, {
        state: {
          practice: practice,
          claim: claim,
          claimTitle: event.target.innerHTML,
          earliestYear: earliestYear,
          latestYear: latestYear,
        },
      });
    } else {
      setError("Please make sure that your year range is valid.");
    }
  };

  const handleEarliestYearChange = (e) => {
    setEarliestYear(e.target.value);
  };

  const handleLatestYearChange = (e) => {
    setLatestYear(e.target.value);
  };

  return (
    <div className="vh-100 bg-light">
      <div className="text-center p-3">
        <Link to="/" className="text-dark text-decoration-none">
          <h1>SPEED</h1>
        </Link>
        <p>Software Practice Empirical Evidence Database</p>
      </div>
      <div
        className="d-flex flex-column gap-3 justify-content-center align-items-center"
        style={{ height: "50vh", width: "100vw" }}
      >
        <Container
          className=" border rounded p-4 text-left bg-white"
          style={{ width: "40%" }}
        >
        {error && <p>{error}</p>}
        {!practice && (
          <div className="text-center">
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
          <>
            <label>
              1. Select the earliest published year:
              <select
                value={earliestYear}
                onChange={(e) => handleEarliestYearChange(e)}
              >
                <option key={`earliestYear`} value={year - 1}>
                  --
                </option>
                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </label>
            <br></br>
            <br></br>
            <label>
              2. Select the latest published year:
              <select
                value={latestYear}
                onChange={(e) => handleLatestYearChange(e)}
              >
                <option key={`latestYear`} value={year + 20}>
                  --
                </option>
                {years.map((year, index) => {
                  return (
                    <option key={`year${index}`} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </label>
            <br></br>
            <br></br>
            <label>
              3. Select a claim for your practice
            </label>
            <DropdownButton
              title={`Select a claim for ${practiceDisplay}`}
              onSelect={navigateClaim}
            >
              {claims.map((claim) => (
                <Dropdown.Item eventKey={claim.id} key={claim.id}>
                  {claim.claim}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <div className="text-center">
            ...or &nbsp;
            <Link onClick={() => setPractice("")}>
              Select another practice
            </Link>
            </div>
          </>
        )}
        </Container>
      </div>
    </div>
  );
};
