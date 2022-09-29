import React from 'react'
import { useLocation } from 'react-router-dom';

export const SearchResults = () => {
    const location = useLocation();
    console.log(location.state);
    return (
      <div>ResultDetails for {location.state.claim}</div>
    )
}
