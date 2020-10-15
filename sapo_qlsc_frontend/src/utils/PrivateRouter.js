import * as React from "react";
import { Route, Redirect } from "react-router";

const PrivateRouter = ({ component: Component, ...rest }) => {
  const localData = localStorage.getItem("Authorization");

  if (localData) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      <Route {...rest} render={(props) => <Component {...props} />} />
    );
  } else {
    return (
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      <Route
        {...rest}
        render={() => <Redirect to={{ pathname: "/login" }} />}
      />
    );
  }
};

export default PrivateRouter;
