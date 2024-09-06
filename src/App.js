import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerProfile from "./components/CustomerProfile";
import UpdateCustomer from "./components/UpdateCustomer";
import AddressForm from "./components/AddressForm";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Switch>
          <Route exact path="/" component={CustomerList} />
          <Route exact path="/form" component={CustomerForm} />
          <Route exact path="/update/:id" component={UpdateCustomer} />
          <Route exact path="/customer/:id" component={CustomerProfile} />
          <Route exact path="update-address/:id" component={AddressForm} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
