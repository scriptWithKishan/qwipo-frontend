import React, { Component } from "react";
import axios from "axios";
import './index.css';

class CustomerForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    error: null
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, email } = this.state;

    try {
      await axios.post("https://qwipo-backend-uko3.onrender.com/customers", {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email
      });
      this.setState({ firstName: "", lastName: "", phoneNumber: "", email: "", error: null });
      alert("Customer created successfully!");
    } catch (error) {
      console.error("Error creating customer:", error.message);
      this.setState({ error: "Failed to create customer." });
    }
  };

  render() {
    const { firstName, lastName, phoneNumber, email, error } = this.state;

    return (
      <div className="customer-form">
        <h3>Create Customer</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <button type="submit">Create Customer</button>
        </form>
      </div>
    );
  }
}

export default CustomerForm;
