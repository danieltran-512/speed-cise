import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Search } from "../components/Search";
import { SearchResults } from "../components/SearchResults";
import { Landing } from "../components/Landing";
import { ResultDetails } from "../components/ResultDetails";
import { LogIn } from "../components/authentication/LogIn";
import { SignUp } from "../components/authentication/SignUp";
import { ModeratorWorkBacklog } from "../components/moderator/ModeratorWorkBacklog";
import { Moderate } from "../components/moderator/Moderate";

export const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:id" element={<SearchResults />} />
        <Route path="/search/:id/:id" element={<ResultDetails />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/moderatorbacklog" element={<ModeratorWorkBacklog />} />
        <Route path="/moderate/:id" element={<Moderate />} />
      </Routes>
    </Router>
  );
};
