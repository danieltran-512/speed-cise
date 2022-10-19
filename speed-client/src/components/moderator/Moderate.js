// show the article that the moderator has chosen. allow moderator to accept or reject the article.
import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const Moderate = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const navigate = useNavigate();
  const location = useLocation();
  const article = location.state.article;
  //Populate articles
  const [articles, setArticles] = useState([]);
  const [UI, setUI] = useState([]);

  useEffect(() => {
    if (article !== null) {
      generateUI(article);
    } else {
      setUI(<h1>Please find this article through your backlog</h1>);
    }
  }, []);

  const moderate = async (id, status) => {
    let body = {
      id: id,
      status: status,
    };
    await axios
      .put(
        `https://cise-speed-2022.herokuapp.com/articles/updateArticleStatus`,
        body,
        {
          headers: { Authorization: AuthString },
        }
      )
      .then((res) => {
        setUI(<h1>This article has successfully moderated</h1>);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // make UI
  const generateUI = (article) => {
    let temp = [];

    temp.push(
      <>
        <p>
          {article.title}
          <button onClick={() => moderate(article.id, "moderated")}>
            Approve
          </button>
          <button onClick={() => moderate(article.id, "rejected")}>
            Reject
          </button>
        </p>
      </>
    );
    setUI(temp);
  };

  //Navigate to the work backlog page
  const navigateWorkBacklog = () => {
    navigate("/moderatorbacklog");
  };
  return (
    <>
      <h1>Moderate Article</h1>
      <button onClick={() => navigateWorkBacklog()}>Go to work backlog</button>
      {UI}
    </>
  );
};
