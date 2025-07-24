import { h, Fragment } from 'preact';
import { Link, Route, Switch } from 'wouter-preact';
import { Counter } from './page/Counter';
import { Index } from './page/Index';
import { DesignPreview } from './page/DesignPreview';
import { Nav } from './component/Nav';

export const App = () => {
  return <Fragment>
    <Nav/>

    <Switch>
      <Route path="/counter" component={Counter} />
      <Route path="/design" component={DesignPreview} />
      <Route path="/" component={Index} />

      <Route>No such page!</Route>
    </Switch>
  </Fragment>
};
