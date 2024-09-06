import React, { Component } from "react";
import axios from "axios";
import "./index.css";

class AddressForm extends Component {
  state = {
    address: "",
    city: "",
    state: "",
    postalCode: "",
    error: null,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { address, city, state, postalCode } = this.state;

    try {
      await axios.put(`http://localhost:8000/addresses/${id}`, {
        address,
        city,
        state,
        postal_code: postalCode,
      });
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error.message);
      this.setState({ error: "Failed to update address." });
    }
  };

  render() {
    const { address, city, state, postalCode, error } = this.state;

    return (
      <div className="address-form">
        <h3>Update Address</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={city}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={state}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={postalCode}
            onChange={this.handleChange}
          />
          <button type="submit">Update Address</button>
        </form>
      </div>
    );
  }
}

export default AddressForm;
