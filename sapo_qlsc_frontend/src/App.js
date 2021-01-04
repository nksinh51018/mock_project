import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import Login from "./pages/Login";
import MaintenanceCardUser from "./pages/MaintenanceCards/MaintenanceCardUser";
import PrivateRouter from "./utils/PrivateRouter";
import AdminRouter from "./utils/AdminRouter";
import { bindActionCreators } from "redux";
import * as usersAction from "./actions/users";
import * as maintenanceCardAddActions from "./actions/maintenanceCardAdd";
import { connect } from "react-redux";
import NotFound from "./pages/NotFound";
import "./App.less";
import { notification } from "antd";
const App = (props) => {
  const { usersActionsCreator } = props;
  const { actCheckUser } = usersActionsCreator;
  useEffect(() => {
    if (!window.location.href.startsWith("http://localhost:3000/user")) {
      actCheckUser();
    }
  }, [actCheckUser]);

  return (
    <div className="App" >
      <Router history={history}>
        <Switch>
          <Route
            path="/user/:id/:hmac"
            component={({match}) => <MaintenanceCardUser match={match}/>}
            exact={true}
          />
          <Route path="/login" component={() => <Login />} exact={true} />
          <Route
            path="/admin"
            component={() => <PrivateRouter component={AdminRouter} />}
            exact={false}
          />
          <Route exact path="/" component={() => <Redirect to="/admin" />} />
          <Route exact={true} path="*" component={() => <NotFound />} />
          {/* <Route exact path="/">
              {history.push("/admin")}
            </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    usersActionsCreator: bindActionCreators(usersAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(App);
