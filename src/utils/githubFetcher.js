import { RootObject } from "./contracts";
const axios = require("axios");
///////////////////////////////////////////
//
//  call generateFinalJSON() with await,
//  return object will be:
//   {
//      allNotReviewedProjects: Array(153) [ {…}, {…}, {…}, … ]
// ​
//      allProjects: Array(179) [ {…}, {…}, {…}, … ]
// ​
//      allReviewedProjects: Array(26) [ {…}, {…}, {…}, … ]
// ​
//      allUsers: (75) [ {…}, {…}, {…}, … ]
//    }
//  Note: Add your github token in var GIT_TOKEN
//
///////////////////////////////////////////////

var GIT_TOKEN = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
var iterateArray = [];
var totalCount = 0;
var uri = `https://api.github.com/graphql`;
var data = [];
var projects = [];
var users = [];
var notReviewed = [];
var reviewed = [];
const regexProject = /(\[.*?Project.*?\])/;
// const regexProject = /\[[pP]roject[- 0-9a-zA-Z]*[\[0-9a-zA-Z \]]*(\])(?!.*\])[ -]*/;

export const generateFinalJSON = async () => {
  iterateArray = [];
  totalCount = 0;
  data = [];
  projects = [];
  users = [];
  notReviewed = [];
  reviewed = [];

  let query = `
    query totalIssues{
      repositoryOwner(login: "tanaypratap") {
        repository(name: "teamtanay.jobchallenge.dev") {
          issues(first: 100) {
            totalCount

          }
        }
      }
    }
    `;

  let p1 = await axios.post(
    uri,
    { query },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + GIT_TOKEN,
      },
    }
  );
  getTotalCount(p1.data);
  await getData();
  const res = {
    allProjects: projects,
    allUsers: users,
    allReviewedProjects: reviewed,
    allNotReviewedProjects: notReviewed,
  };
  console.log("res", res);
  return res;
};

async function getData() {
  var cursor = "";
  let query = `
    query getdata{
      repositoryOwner(login: "tanaypratap") {
        repository(name: "teamtanay.jobchallenge.dev") {
          issues(first: 100) {
            edges {
              cursor
              node {
                labels(first: 10){
                  edges {
                    node {
                      description
                      name
                    }
                  }
                }
                id
                url
                title
                number
                createdAt
                body
                author {
                  ... on User {
                    name
                    avatarUrl
                    login
                    id
                    url
                  }
                }
              }
            }
          }
        }
      }
  }`;
  let res = await axios.post(
    uri,
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + GIT_TOKEN,
      },
    }
  );

  data = [...res.data.data.repositoryOwner.repository.issues.edges];
  cursor = getCursor(res.data.data.repositoryOwner.repository.issues.edges);

  for (let i = 1; i < iterateArray.length; i++) {
    let query = `
      query getdata($after: String){
        repositoryOwner(login: "tanaypratap") {
          repository(name: "teamtanay.jobchallenge.dev") {
            issues(first: 100, after: $after) {
                edges {
                cursor
                node {
                  labels(first: 10){
                    edges {
                      node {
                        description
                        name
                      }
                    }
                  }
                  id
                  url
                  title
                  number
                  createdAt
                  body
                  author {
                    ... on User {
                      name
                      avatarUrl
                      login
                      id
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }`;
    let res = await axios.post(
      uri,
      {
        query,
        variables: { after: cursor },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + GIT_TOKEN,
        },
      }
    );
    data = [...data, ...res.data.data.repositoryOwner.repository.issues.edges];
    cursor = getCursor(res.data.data.repositoryOwner.repository.issues.edges);
  }
  getProjects(data);
  getUsers(projects);
  getReviewedData(projects);
}

function getReviewedData(projects) {
  projects.map((project) => {
    var temp = false;
    if (project.labels.edges.length > 0) {
      project.labels.edges.map((label) => {
        if (label.node.name === "Reviewed-By-Mentor") {
          temp = true;
          reviewed.push(project);
        }
      });
      if (!temp) {
        notReviewed.push(project);
      }
    } else {
      notReviewed.push(project);
    }
  });
}

function getProjects(array) {
  array.forEach((item) => {
    if (item.node.labels.edges.length > 0) {
      item.node.labels.edges.map((label) => {
        if (
          label.node.name === "Feedback-pending" ||
          label.node.name === "Reviewed-By-Mentor"
        ) {
          projects.push(item.node);
        }
      });
    }
  });
}

function getTotalCount(data) {
  totalCount = data.data.repositoryOwner.repository.issues.totalCount;
  while (totalCount > 0) {
    iterateArray.push(Math.min(totalCount, 100));
    totalCount = totalCount - 100;
  }
  totalCount = data.data.repositoryOwner.repository.issues.totalCount;
}

function getCursor(data) {
  return data.slice(-1)[0].cursor;
}

function getUsers(projects) {
  projects.forEach((project) => {
    if (
      users.some((item) => {
        return item.login === project.author.login;
      })
    ) {
      const index = users.findIndex(
        (item) => item.login === project.author.login
      );
      users[index].totalProjects = users[index].totalProjects + 1;
      users[index].projects.push(project.id);
    } else {
      var projectsArray = [];
      projectsArray.push(project.id);
      users.push({
        ...project.author,
        totalProjects: 1,
        projects: projectsArray,
      });
      return true;
    }
  });
}
