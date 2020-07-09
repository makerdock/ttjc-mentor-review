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
    if (project.node.labels.edges.length > 0) {
      project.node.labels.edges.map((label) => {
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

function checkFinalist(project) {
  return project.node.labels.edges.some((label) => {
    return label.node.name === "the finalist";
  });
}

function getProjects(array) {
  projects = array.filter((issue) => {
    if (issue.node.labels.edges.length === 0) return false;
    return issue.node.labels.edges.find(
      (label) =>
        label.node.name === "Feedback-pending" ||
        label.node.name === "Reviewed-By-Mentor"
    );
  });
  projects.sort((a, b) => {
    const checkA = checkFinalist(a);
    const checkB = checkFinalist(b);
    if (checkA === checkB) return 0;
    if (checkA) return 1;
    if (checkB) return -1;
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
    let isFinalist = project.node.labels.edges.find(
      (label) => label.node.name === "the finalist"
    )
      ? true
      : false;

    if (
      users.some((item) => {
        return item.login === project.node.author.login;
      })
    ) {
      const index = users.findIndex(
        (item) => item.login === project.node.author.login
      );
      users[index].totalProjects = users[index].totalProjects + 1;
      users[index].projects.push(project.node.id);
      if (!users[index].isFinalist) users[index].isFinalist = isFinalist;
    } else {
      var projectsArray = [];
      projectsArray.push(project.node.id);
      users.push({
        ...project.node.author,
        totalProjects: 1,
        projects: projectsArray,
        isFinalist: isFinalist,
      });
      return true;
    }
  });
}
