import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./index.css";

class CustomerList extends Component {
  state = {
    customers: [],
    isLoading: true,
    error: null,
    search: "",
    filterName: "",
    filterCity: "",
    currentPage: 1,
    totalCustomers: 0,
    customersPerPage: 10,
  };

  async componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = async () => {
    const { search, filterName, filterCity, currentPage, customersPerPage } =
      this.state;
    this.setState({ isLoading: true });

    try {
      const response = await axios.get(
        `https://qwipo-backend-uko3.onrender.com/customers?_page=${currentPage}&_limit=${customersPerPage}&search=${search}&filterName=${filterName}&filterCity=${filterCity}`
      );
      this.setState({
        customers: response.data.customers,
        totalCustomers: response.data.total,
        isLoading: false,
      });
      console.log(response);
    } catch (error) {
      console.error("Error loading customers:", error.message);
      this.setState({ error: "Failed to load customers.", isLoading: false });
    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleFilterChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page }, this.loadCustomers);
  };

  render() {
    const {
      customers,
      isLoading,
      error,
      search,
      filterName,
      filterCity,
      currentPage,
      totalCustomers,
      customersPerPage,
    } = this.state;
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    return (
      <div className="customer-list">
        <h2>Customer List</h2>

        <div className="filter-container">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={this.handleSearchChange}
          />
          <input
            type="text"
            name="filterName"
            placeholder="Filter by Name..."
            value={filterName}
            onChange={this.handleFilterChange}
          />
          <input
            type="text"
            name="filterCity"
            placeholder="Filter by City..."
            value={filterCity}
            onChange={this.handleFilterChange}
          />
          <button onClick={this.loadCustomers}>Search</button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                <Link
                  className="customer-list-link"
                  to={`/customer/${customer.id}`}
                >
                  <p>
                    {customer.first_name} {customer.last_name}
                  </p>
                  <p>{customer.email}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className={page + 1 === currentPage ? "active" : ""}
              onClick={() => this.handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default CustomerList;
