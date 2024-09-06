import React, { createContext, Component } from "react";

export const CustomerContext = createContext();

class CustomerProvider extends Component {
  state = {
    customer: null,
  };

  setCustomer = (customer) => {
    this.setState({ customer });
  };

  render() {
    return (
      <CustomerContext.Provider
        value={{
          customer: this.state.customer,
          setCustomer: this.setCustomer,
        }}
      >
        {this.props.children}
      </CustomerContext.Provider>
    );
  }
}

export default CustomerProvider;
