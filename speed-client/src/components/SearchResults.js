import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';

export const SearchResults = () => {
    //Get information from the previous page
    const location = useLocation();

    //Set a list of articles based on the claims
    const [articles, setArticles] = useState([]);

    useEffect(()=>{
      //Retrieve the claim details from the database
      axios.get(`http://localhost:4000/articles/${location.state.claim}`)
      .then(res => {
        setArticles(res.data);
      }
      )
      .catch(err => console.log(err));
    },[])

    return (
      <div>
        Result Details for {location.state.claimTitle}
        {articles.map((article,index) => (
          <div key={article._id}>
            <hr></hr>
            <p> {index+1}. {article.title}</p>
            <hr></hr>
          </div>))}

        <Link to='/search'>
          Search for another practice
        </Link>
      </div>
    )
}
