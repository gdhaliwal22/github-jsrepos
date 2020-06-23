import React, { useEffect, useState, Fragment } from "react";
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
// catch handler
// set the state to an empty array
// check in our jsx and display that there's an error

function App() {
  const [repoList, setRepoList] = useState(null);
  console.log("repolist: ", repoList);

  useEffect(() => {
    getGithubRepos()
      .then((results) =>
        results.items.map(({ full_name, stargazers_count, html_url, id }) => {
          // throw new Error("my error");
          return { full_name, stargazers_count, html_url, id };
        })
      )
      .then((repoList) => setRepoList(repoList))
      .catch((err) => setRepoList([]));
  }, []);
  return (
    <div>
      {repoList === null ? (
        <div>Loading...</div>
      ) : repoList.length > 0 ? (
        <table>
          <body>
            <tr>
              <th>Full Name</th>
              <th>Stars</th>
              <th>Link</th>
            </tr>
            {repoList.map((repo) => {
              return (
                <Fragment key={repo.id}>
                  <tr>
                    <td>{repo.full_name}</td>
                    <td>{repo.stargazers_count}</td>
                    <td>
                      <a href={repo.html_url}>{repo.html_url}</a>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </body>
        </table>
      ) : (
        <div>Error lease try again</div>
      )}
    </div>
  );
}

export default App;
