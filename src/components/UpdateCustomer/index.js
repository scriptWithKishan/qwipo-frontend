import React, { Component } from "react";
import axios from "axios";
import "./index.css";

class UpdateCustomer extends Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    error: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      const response = await axios.get(`http://localhost:8000/customers/${id}`);
      const { first_name, last_name, phone_number, email } = response.data;
      this.setState({
        firstName: first_name,
        lastName: last_name,
        phoneNumber: phone_number,
        email: email,
      });
    } catch (error) {
      console.error("Error loading customer data:", error.message);
      this.setState({ error: "Failed to load customer data." });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { firstName, lastName, phoneNumber, email } = this.state;
    const { history } = this.props;

    try {
      await axios.put(`http://localhost:8000/customers/${id}`, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        email: email,
      });
      history.push(`/customer/${id}`);
    } catch (error) {
      console.error("Error updating customer:", error.message);
      this.setState({ error: "Failed to update customer." });
    }
  };

  render() {
    const { firstName, lastName, phoneNumber, email, error } = this.state;

    return (
      <div className="update-customer">
        <h3>Update Customer</h3>
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
          <button type="submit">Update Customer</button>
        </form>
      </div>
    );
  }
}

export default UpdateCustomer;
