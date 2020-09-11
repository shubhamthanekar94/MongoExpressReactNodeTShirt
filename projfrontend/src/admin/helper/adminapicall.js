import { API } from "../../backend";

//Category Calls
//Create Category call
export const createCatagory = (userId, token, catagory) => {
  return fetch(`${API}/catagory/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catagory), //JSON.stringyfy used because in backend we are getting JSON response that we need to convert here in string
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//GET all Categories call
export const getCatagories = () => {
  return fetch(`${API}/catagories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Delete category call
export const deleteCatagory = (catagoryId, userId, token) => {
  return fetch(`${API}/catagory/${catagoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update category call
export const updateCatagory = (catagoryId, userId, token, catagory) => {
  return fetch(`${API}/catagory/${catagoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(catagory), //JSON.stringyfy used because in backend we are getting JSON response that we need to convert here in string
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get catagory
export const getCatagory = (catagoryId) => {
  return fetch(`${API}/catagory/${catagoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//product API calls
//Create Product call
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get all products
export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Delete a product
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Get a product
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//Update a product
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, //JSON.stringyfy used because in backend we are getting JSON response that we need to convert here in string
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
