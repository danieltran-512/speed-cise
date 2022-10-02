// show all submitted articles. allow moderator to assign themselves an article to moderate.
import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const ModeratorLanding = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const navigate = useNavigate();
  //Populate articles
  const [articles, setArticles] = useState([]);
  let workDistributionParam = {
    status: "submitted",
  };

  //retrieve articles for work distribution
  useEffect(() => {
    async function fetchWorkDistribution() {
      await axios
        .get(
          `${process.env.REACT_APP_DB_URL}/articles/getArticlesForWorkDistribution`,
          {
            params: workDistributionParam,
            headers: { Authorization: AuthString },
          }
        )
        .then((res) => {
          setArticles(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    fetchWorkDistribution();
  }, []);

  //Navigate to the work backlog page
  const navigateWorkBacklog = (claim, event) => {
    navigate("/search/" + claim, {
      state: {},
    });
  };
  return (
    <>
      <h1>moderator</h1>
    </>
  );
};
