import React from 'react';
import PublicHome from './view/homePublic';
import InitialScreen from './view/initialScreen';
import DisplayResults from './view/displayResults';
import DisplayRe from './view/DisplayRe'
import loginpage from './view/loginPage'
import { Projects, AddProjects, OpenProjects } from "./view/pages/projects";
import {
  Services,
  ServicesOne,
  ServicesTwo,
  ServicesThree,
} from "./view/pages/services";
import { Events, EventsOne, EventsTwo } from "./view/pages/events";
import Contact from "./view/pages/contactUs";
import Support from "./view/pages/support";

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={loginpage}/>
          <Route exact path="/intialScreen" component={InitialScreen}/>
          <Route exact path="/homePage" component={PublicHome}/>
          <Route path="/dashboard" component={DisplayRe}/>
          {/* <Route path="/projects" exact component={Projects} />
          <Route path="/projects/add" exact component={AddProjects} />
          <Route path="/projects/open" exact component={OpenProjects} />
          <Route path="/services" exact component={Services} />
          <Route path="/services/services1" exact component={ServicesOne} />
          <Route path="/services/services2" exact component={ServicesTwo} />
          <Route path="/services/services3" exact component={ServicesThree} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/events" exact component={Events} />
          <Route path="/events/events1" exact component={EventsOne} />
          <Route path="/events/events2" exact component={EventsTwo} />
          <Route path="/support" exact component={Support} /> */}
          
        </Switch>
      </Router>
    </>
  );
}

export default App;
