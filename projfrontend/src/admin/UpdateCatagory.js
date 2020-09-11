import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getCatagory, updateCatagory } from "./helper/adminapicall";

const UpdateCatagory = ({ match }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );

  const preload = (catagoryId) => {
    getCatagory(catagoryId).then((data) => {
      console.log("data", data);
      console.log("catagory name is", data.name);
      if (data.error) {
        setError(true);
      } else {
        setName(data.name);
      }
    });
  };
  useEffect(() => {
    preload(match.params.catagoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    updateCatagory(match.params.catagoryId, user._id, token, { name }).then(
      (data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName(""); //to clear name filed after clicking on create button
        }
      }
    );
  };
  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category updated successfully</h4>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to update category</h4>;
    }
  };

  const myCatagoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the updated category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update a category here"
      description="Update existing category"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCatagoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCatagory;
