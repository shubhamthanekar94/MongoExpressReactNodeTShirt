import { API } from "../../backend";
//API means -> http://localhost:8000/api/

export const signup = (user) => {
  //user is a parameter coming from FE
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  //user is a parameter coming from FE
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window != "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signuout = (next) => {
  if (typeof window != "undefined") {
    localStorage.removeItem("jwt"); //it clears localstorage which in under inspect=>application=>localstorage so that to removed logged in user details
    next();
    //logout user from backend:
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout Success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
