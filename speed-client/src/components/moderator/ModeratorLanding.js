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
  const [UI, setUI] = useState([]);
  let workDistributionParam = {
    status: "submitted",
  };

  //retrieve articles for work distribution
  useEffect(() => {
    async function fetchWorkDistribution() {
      await axios
        .get(
          `${process.env.REACT_APP_DB_URL}/articles/getArticlesForModeratorDistribution`,
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

  useEffect(() => {
    generateUI(articles);
  }, [articles]);

  const selfAssign = async (id) => {
    let body = {
      id: id,
      moderatorID: user.id,
    };
    await axios
      .put(
        `${process.env.REACT_APP_DB_URL}/articles/updateArticleModeratorID`,
        body,
        {
          headers: { Authorization: AuthString },
        }
      )
      .then((res) => {
        setArticles(articles.filter((i) => i.id !== id));
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  // make UI
  const generateUI = (articles) => {
    let temp = [];

    articles.map((article, index) => {
      temp.push(
        <>
          <p>
            {index + 1}. {article.title}{" "}
            <button onClick={() => selfAssign(article.id)}>Self-Assign</button>
          </p>
        </>
      );
    });
    setUI(temp);
  };

  //Navigate to the work backlog page
  const navigateWorkBacklog = () => {
    navigate("/moderatorbacklog");
  };
  return (
    <>
      <h1>Welcome {user.username}</h1>
      <button onClick={() => navigateWorkBacklog()}>Go to work backlog</button>
      <h2>Please self-assign articles from below to moderate.</h2>
      {UI}
    </>
  );
};
