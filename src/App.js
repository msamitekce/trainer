import React from "react";
import "./index.css";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Trainings from "./components/menu-components/Trainings";
import Customers from "./components/menu-components/Customers";
import Calendar from "./components/menu-components/Calendar";

export default function App() {
  const routes = ["/trainings", "/customers", "/calendar"];
  return (
    <div className="App">
      <BrowserRouter>
        <Route
          path="/"
          render={(history) => (
            <AppBar>
              <Tabs
                value={
                  history.location.pathname !== "/"
                    ? history.location.pathname
                    : false
                }
              >
                {console.log(history.location.pathname)}
                <Tab
                  value={routes[0]}
                  label="Trainings"
                  component={Link}
                  to={routes[0]}
                />
                <Tab
                  value={routes[1]}
                  label="Customers"
                  component={Link}
                  to={routes[1]}
                />
                 <Tab
                  value={routes[2]}
                  label="Calendar"
                  component={Link}
                  to={routes[2]}
                />
              </Tabs>
            </AppBar>
          )}
        />

        <Switch>
          <Route path="/trainings" component={Trainings} />
          <Route path="/customers" component={Customers} />
          <Route path="/calendar" component={Calendar} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
