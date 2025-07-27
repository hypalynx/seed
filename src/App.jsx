import { h, Fragment } from 'preact';
import { Link, Route, Switch, useLocation } from 'wouter-preact';
import { useState, useEffect } from 'preact/hooks';
import { Counter } from './page/Counter';
import { Index } from './page/Index';
import { DesignPreview } from './page/DesignPreview';
import { Nav } from './component/Nav';

export const App = () => {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (location !== displayLocation) {
      // Start exit transition
      setTransitionStage('exit');
      
      // After exit completes, update location and enter
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('enter');
      }, 200); // Match CSS transition duration
      
      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return <Fragment>
    <Nav/>

    <main class={`mx-auto max-w-container`}>
      <Switch>
        <Route path="/counter" component={Counter} />
        <Route path="/design" component={DesignPreview} />
        <Route path="/" component={Index} />

        <Route path="*">No such page!</Route>
      </Switch>
    </main>
  </Fragment>
};
