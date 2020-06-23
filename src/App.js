import React, { useEffect, useState } from "react";
import "./App.css";

// as a user, I want to see all javascript repos with over 25k stars, srted by most to least order
// as a user, I want to see the name, number of starts, and link to the repo
// as a user I want to know when I have an error

//github api documenation

// https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

// create a query

// https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc

// name, number of stars, link to repo

// name
// stargazers_url
// html_url
// id

function getGithubRepos() {
  return fetch(
    "https://api.github.com/search/repositories?q=stars:>25000+language:javascript&sort=stars&order=desc"
  ).then((data) => data.json());
}

// make an api call on app load
//useEffect - make api call

// parse the data
// set to state
// display data in some manner
// handle loading and error states

function App() {
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    getGithubRepos().then((results) =>
      results.items
        .map(({ full_name, stargazers_count, html_url, id }) => {
          console.log({ full_name, stargazers_count, html_url, id });
          return { full_name, stargazers_count, html_url, id };
        })
        .then((repoList) => setRepoList(repoList))
    );
  }, []);
  return <div>Hello</div>;
}

export default App;
