import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
import Login from "./pages/Login";
import PrivateRouter from "./utils/PrivateRouter";
import AdminRouter from "./utils/AdminRouter";
import { bindActionCreators } from "redux";
import * as usersAction from './actions/users';
import * as maintenanceCardAddActions from './actions/maintenanceCardAdd';
import { connect } from "react-redux";
import NotFound from "./pages/NotFound";
import './App.less';
import { notification } from "antd";
const App = (props) => {
  const { usersActionsCreator } = props;
  const { actCheckUser } = usersActionsCreator;
  useEffect(() => {
    actCheckUser();
  }, [actCheckUser]);

  // useEffect(() => {
  //   if (props.user.id !== 0) {
  //     props.user.stompClient.connect({}, function (frame) {
  //       props.user.stompClient.subscribe("/topic/messages/" + props.user.id, function (response) {
  //         let data = JSON.parse(response.body);
  //         console.log(data);
  //         if (data.type.toString() === "1") {
  //           const key = `open${Date.now()}`;
  //           notification.open({
  //             message: 'Đã nhận được phiếu sửa chữa mới',
  //             onClick: () => {
  //               notification.close(key)
  //               History.push("/admin/maintenanceCards/" + data.message)
  //             },
  //             duration: 10,
  //             style: {
  //               cursor: "pointer"
  //             },
  //             key
  //           });
  //         }
  //         else if (data.type.toString() === "2") {
  //           const key = `open${Date.now()}`;
  //           notification.open({
  //             message: 'Một phiếu mới chờ thanh toán',
  //             onClick: () => {
  //               notification.close(key)
  //               History.push("/admin/maintenanceCards/" + data.message)
  //             },
  //             duration: 10,
  //             style: {
  //               cursor: "pointer"
  //             },
  //             key
  //           });
  //           if (window.location.pathname === `/admin/maintenanceCards/${data.message}`) {
              
  //           }
  //         }

  //       });
  //     });
  //   }
  // }, [props.user.id]);

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    usersActionsCreator: bindActionCreators(usersAction, dispatch),
  }
}


export default connect(null, mapDispatchToProps)(App);
