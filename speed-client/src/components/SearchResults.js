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
      .get(`${process.env.REACT_APP_DB_URL}/articles/${location.state.claim}`)
      .then((res) => {
        res.data.map((i) => {
          let temp = new Date(i.publicationYear);
          i.publicationYear = temp.getFullYear();
        });
        setArticles(res.data);
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
