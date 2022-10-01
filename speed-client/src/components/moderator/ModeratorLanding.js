// show all submitted articles. allow moderator to assign themselves an article to moderate.
import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const Landing = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  //Populate articles
  const [articles, setArticles] = useState([]);

  //retrieve articles for work distribution
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_DB_URL}/articles/getArticlesForWorkDistribution`,
        {
          headers: { Authorization: AuthString },
        }
      )
      .then((res) => {
        setArticles(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const navigate = useNavigate();

  //Navigate to the claim page
  const navigateClaim = (claim, event) => {
    navigate("/search/" + claim, {
      state: {
        practice: practice,
        claim: claim,
        claimTitle: event.target.innerHTML,
      },
    });
  };
  return <></>;
};
