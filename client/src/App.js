import { Route } from "react-router-dom";
import "./App.css";

import countryDetail from "./components/countryDetail";
import CreateActivity from "./components/createActivity";

import Home from "./components/home";
import LandingPage from "./components/landinPage/LandingPage";
import EditActivity from "./editActivity";



function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path={"/home"} component={Home} />
      <Route exact path={"/activities"} component={CreateActivity} />
      <Route exact path="/editactivity" component={EditActivity} />
      <Route path="/country/:id" component={countryDetail} />
    </div>
  );
}

export default App;
