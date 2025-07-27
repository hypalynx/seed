import { h, Fragment } from "preact";
import { Link, Route, Router, Switch, useLocation } from "wouter-preact";
import { Counter } from "./page/Counter";
import { Index } from "./page/Index";
import { DesignPreview } from "./page/DesignPreview";
import { Nav } from "./component/Nav";

export const App = () => {
  const [location] = useLocation();

  return (
    <Fragment>
      <Nav />

      <main class={`mx-auto max-w-container`}>
        <Router>
          <div className="route-container" key={location}>
            <Switch>
              <Route path="/counter" component={Counter} />
              <Route path="/design" component={DesignPreview} />
              <Route path="/" component={Index} />

              <Route path="*">No such page!</Route>
            </Switch>
          </div>
        </Router>
      </main>
    </Fragment>
  );
};
