import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Styles from "./searchTable/tableStyles";
import Table from "./searchTable/EvidenceTable";
import tablecolumns from "./searchTable/tableColumns";

export const SearchResults = () => {
  //Get information from the previous page
  const location = useLocation();

  //Set a list of articles based on the claims
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    //Retrieve the claim details from the database
    axios
      .get(
        `https://cise-speed-2022.herokuapp.com/articles/${location.state.claim}`
      )
      .then((res) => {
        let temp = [];
        res.data.map((i) => {
          let tempDate = new Date(i.publicationYear);
          i.publicationYear = tempDate.getFullYear();
          if (
            i.publicationYear >= location.state.earliestYear &&
            i.publicationYear <= location.state.latestYear
          ) {
            temp.push(i);
          }
        });
        setArticles(temp);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="text-center m-3">
        <Link to="/" className="text-dark text-decoration-none">
          <h1>SPEED</h1>
        </Link>
        <p>Software Practice Empirical Evidence Database</p>
        <hr></hr>
        <h3>
          {" "}
          Results for <strong>'{location.state.claimTitle}'</strong>
        </h3>
      </div>

      <Styles className="m-5">
        <Table data={articles} columns={tablecolumns} />
      </Styles>

      <div className="text-center mb-5">
        <Link to="/search">Search for another practice</Link>
      </div>
    </div>
  );
};
