import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from "react-router-dom";
import LandingPage from "./components/landing-page/landing-page";
import UXDesigns from "./components/ux-designs/ux-designs";
import Projects from "./components/projects/Projects";
import Courses from "./components/courses/courses";
import AboutMe from "./components/about-me/about-me";
import PageNotFound from "./components/page-not-found/page-not-found";
import "./App.css";
import SinglePageItem from "./components/single-page-item/SinglePageItem";
import projects from "../src/data/project-data";
import landingPageBG from "./landing-video/landing-bg.png";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			projects: null,
		};
	}

	render() {
		return (
			<Router className={"app"}>
				<Switch>
					<Route path="/" exact component={LandingPage} />
					<Route path="/projects" exact component={Projects} />
					<Route path="/uxdesigns" exact component={UXDesigns} />
					<Route path="/courses" exact component={Courses} />

					<Route path="/aboutme" exact component={AboutMe} />

					<Route
						path="/projects/:id"
						exact
						component={SinglePageItem}
					/>
					<Route
						path="/uxdesigns/:id"
						exact
						component={SinglePageItem}
					/>
					<Route
						path="/courses/:id"
						exact
						component={SinglePageItem}
					/>
					<Route path="" component={PageNotFound} />
					<Route path="*" component={PageNotFound} />
				</Switch>
			</Router>
		);
	}
}

export default App;
