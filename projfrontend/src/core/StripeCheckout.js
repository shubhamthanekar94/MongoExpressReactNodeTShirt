import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };
  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
        //call further methods
        const { status } = response;
        console.log("Payment Success", status);
        //create order part starts
        /*const orderData = {
          products: products,
          transaction_id: response.transaction.id,
          amount: response.transaction.amount,
        };
        createOrder(userId, token, orderData);
*/
        //create order part ends
        cartEmpty(() => {
          console.log("Did we got a crash?");
        });
        setReload(!reload);
      })
      .catch((error) => console.log(error));
  };
  const showStripeButton = () => {
    return isAuthenticated() && products.length > 0 ? (
      <StripeCheckoutButton
        stripeKey="pk_test_51Gqg0JEJfUY1x7Yj9emUbwrE8DumBDIxwmaFzG3X54b32NxZbMvQcmKZhRMhNMtOZc49nWo5dUz7Ww3FPMTbPyeu00trSLytWY"
        token={makePayment}
        amount={getFinalAmount() * 100}
        name="Buy Tshirts"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success">Pay with stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">
          Please Signin here or Add some products
        </button>
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white">Your bill amount is $ {getFinalAmount()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
