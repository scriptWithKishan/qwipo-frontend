import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

class CustomerProfile extends Component {
  state = {
    customer: null,
    addresses: [],
    error: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      const customerResponse = await axios.get(
        `https://qwipo-backend-uko3.onrender.com/customers/${id}`
      );
      const addressesResponse = await axios.get(
        `https://qwipo-backend-uko3.onrender.com/addresses/${id}`
      );
      this.setState({
        customer: customerResponse.data,
        addresses: addressesResponse.data,
      });
    } catch (error) {
      console.error("Error loading customer data:", error.message);
      this.setState({ error: "Failed to load customer data." });
    }
  }

  deleteProfile = async () => {
    const { id } = this.props.match.params;
    const { history } = this.props;

    try {
      await axios.delete(`http://localhost:8000/customers/${id}`);
      history.replace("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  render() {
    const { customer, addresses, error } = this.state;

    return (
      <div className="customer-profile">
        {error && <p className="error">{error}</p>}
        {customer ? (
          <>
            <h3>Customer Profile</h3>
            <p>
              Name: {customer.first_name} {customer.last_name}
            </p>
            <p>Phone: {customer.phone_number}</p>
            <p>Email: {customer.email}</p>
            <h4>Addresses:</h4>
            <ul>
              {addresses.map((address) => (
                <li key={address.id}>
                  {address.address}, {address.city}, {address.state}
                </li>
              ))}
            </ul>
            <Link className="update-link" to={`/update/${customer.id}`}>
              Edit Customer
            </Link>
            <Link className="update-link" to={`/update-address/${customer.id}`}>
              Edit Address
            </Link>
            <button className="delete-btn" onClick={this.deleteProfile}>
              Delete
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default CustomerProfile;
