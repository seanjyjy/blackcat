import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { useAuth } from "./contexts/AuthContext";
import { apiFetchAuthentication } from "./api";

import ProtectedRoute from "./components/ProtectedRoute";

const Login = lazy(
  () => import(/* webpackChunkName: "login-chunk" */ "./components/Login")
);
const Posts = lazy(
  () => import(/* webpackChunkName: "posts-chunk" */ "./components/Posts")
);
const FullPost = lazy(
  () =>
    import(
      /* webpackChunkName: "fullpost-chunk" */ "./components/Posts/FullPost"
    )
);

const App = (): JSX.Element => {
  const { auth, setAuth, setName, setAvatar } = useAuth();

  useEffect(() => {
    if (!auth) {
      (async () => {
        const res = await apiFetchAuthentication();
        const { data, err } = res;
        if (err) return;
        if (data?.success) {
          setAuth(true);
          setAvatar(data.avatar);
          setName(data.name);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFetchAuthentication]);

  return (
    <Suspense fallback={<div />}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <ProtectedRoute
            auth={auth}
            component={Posts}
            path="/posts/:queryParams?"
            exact
          />
          <ProtectedRoute
            auth={auth}
            component={FullPost}
            path="/post/:uuid"
            exact
          />
          <Route path="*">
            {auth ? <Redirect to="/posts" /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </Suspense>
  );
};

export default App;
