import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const LeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Office Address</h4>
        <span className="">
          Sampige Rd, Malleshwaram, Bengaluru, Karnataka 56**03
        </span>
      </div>
    );
  };
  const RightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <li className="list-group-item">
          <span className="">Contact Number: +91-94********</span>
        </li>
        <li className="list-group-item">
          <span className="">Email: T-shirt@****.com</span>
        </li>
      </div>
    );
  };

  return (
    <Base
      title="Contact-Us"
      description="Support will be available 24/7"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3"> {LeftSide()}</div>
        <div className="col-9"> {RightSide()}</div>
      </div>
    </Base>
  );
};

export default ContactUs;
