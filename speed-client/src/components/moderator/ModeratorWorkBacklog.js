// show all self-assigned articles that have not been moderated yet. allow moderator to choose an article
// to moderate
import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../authentication/AuthSetUp";

export const ModeratorWorkBacklog = () => {
  const { user, jwt } = useAuth();
  const AuthString = "Bearer ".concat(jwt);
  const navigate = useNavigate();
  //Populate articles
  const [articles, setArticles] = useState([]);
  const [UI, setUI] = useState([]);

  //retrieve articles for work distribution
  useEffect(() => {
    async function fetchAssignedWork() {
      await axios
        .get(
          `https://cise-speed-2022.herokuapp.com/articles/getArticlesForModerator/${user.id}`,
          {
            headers: { Authorization: AuthString },
          }
        )
        .then((res) => {
          setArticles(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }
    fetchAssignedWork();
  }, []);

  useEffect(() => {
    if (articles.length > 0) {
      generateUI(articles);
    } else {
      setUI(<h1>No articles to self-assign!</h1>);
    }
  }, [articles]);

  const moderate = async (article) => {
    navigate("/moderate/" + article.id, {
      state: {
        article: article,
      },
    });
  };

  // make UI
  const generateUI = (articles) => {
    let temp = [];

    articles.map((article, index) => {
      temp.push(
        <>
          <p>
            {index + 1}. {article.title}{" "}
            <button onClick={() => moderate(article)}>Moderate</button>
          </p>
        </>
      );
    });
    setUI(temp);
  };

  //Navigate to the work backlog page
  const navigateHome = () => {
    navigate("/");
  };
  return (
    <>
      <h1>Welcome {user.username}</h1>
      <button onClick={() => navigateHome()}>Go Home</button>
      <h2>Please choose any of your assigned articles to moderate</h2>
      {UI}
    </>
  );
};
