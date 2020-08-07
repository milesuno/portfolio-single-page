import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./nav-bar.css";
import courseData from "../../data/course-data.json";
import projectData from "../../data/project-data";
import uxData from "../../data/ux-data";
import socialMediaData from "../../data/social-media-data.js";
import menu from "../../landing-video/icons8-menu-squared-96.png";
import closeMenu from "../../landing-video/icons8-close-window-96.png";
import scrollTopBtnIcon from "../../data/page-btns/icons8-slide-up-100.png";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			course: courseData,
			project: projectData,
			ux: uxData,
			socialMedia: socialMediaData,
			menuToggle: true,
			isLandingPage: this.props.isLandingPage || false,
		};
	}
	//ADD: Create eventlistener on nav for mouseleave, this should create a mouseclick event that will close the navbtns

	//FIX: display menu above 736px -> display: flex; flex-direction: row;
	componentDidMount() {
		if (this.props.isLandingPage) {
			this.setState({ isLandingPage: true });
			// console.log("isLandingPage", this.state.isLandingPage);
		}
		// console.log("isLandingPage", this.props);

		const navBtns = document.querySelectorAll("li.nav-item");
		const scrollTopBtn = document.querySelector("div.scroll-top-btn");
		const collaspedMenuBtn = document.querySelector(".collasped-menu-btn");
		window.onscroll = this.toggleScrollTopBtn;

		navBtns.forEach((navBtn) => {
			console.dir(navBtn);
			navBtn.addEventListener("mouseenter", this.handleMouseEnter);
			navBtn.addEventListener("mouseleave", this.handleMouseLeave);
		});
	}

	componentWillUnmount() {
		window.onscroll = "";
	}

	// handleMouseEnter = (e) => {
	// 	console.log("Enter", e.target);
	// 	if (!e.target.children[0].name) return;
	// 	const nav = document.querySelector(".nav");
	// 	const navBtns = document.querySelectorAll("li.nav-item");
	// 	const allDropdownList = document.querySelectorAll(`.dropdown-list`);
	// 	const dropdownList = document.querySelector(
	// 		`.dropdown-list.${e.target.children[0].name}`
	// 	);
	// 	const dropdownBackground = document.querySelector(
	// 		".dropdownBackground"
	// 	);

	// 	//Make dropdown visible on enter
	// 	dropdownList.style.setProperty("display", "flex");
	// 	dropdownList.style.setProperty("position", "relative");
	// 	dropdownList.style.setProperty("flex-direction", "column");

	// 	//coords can't be access till it is displayed
	// 	let dropdownCoords = dropdownList.getBoundingClientRect();
	// 	let navCoords = nav.getBoundingClientRect();

	// 	//Adjust dropdown BG to match dropdown list measurements
	// 	dropdownBackground.style.setProperty(
	// 		"height",
	// 		`${dropdownCoords.height}px`
	// 	);
	// 	dropdownBackground.style.setProperty(
	// 		"width",
	// 		`${dropdownCoords.width}px`
	// 	);
	// 	dropdownBackground.style.setProperty(
	// 		"top",
	// 		`${dropdownCoords.y - navCoords.y}px`
	// 	);
	// 	dropdownBackground.style.setProperty(
	// 		"left",
	// 		`${dropdownCoords.x - navCoords.x}px`
	// 	);
	// 	dropdownBackground.style.setProperty("opacity", 1);

	// 	// Move dropdown BG to match dropdown list

	// 	console.log({
	// 		dropdownList,
	// 		allDropdownList,
	// 		dropdownCoords,
	// 		dropdownBackground,
	// 	});
	// };

	// handleMouseLeave = (e) => {
	// 	if (!e.target.children[0].name) return;
	// 	console.log("Leave", e.target);
	// 	const navBtns = document.querySelectorAll("li.nav-item");

	// 	const dropdownList = document.querySelector(
	// 		`.dropdown-list.${e.target.children[0].name}`
	// 	);
	// 	const dropdownBackground = document.querySelector(
	// 		".dropdownBackground"
	// 	);

	// 	dropdownList.style.setProperty("display", "none");
	// 	dropdownBackground.style.setProperty("opacity", 0);

	// 	console.log({ dropdownList });
	// 	// dropdownList.style.flexDirection = "column";
	// };

	handleMouseClick = (e) => {
		//Set dataset on element and only display the element with the active property
		//use target to set display of li.items
		if (!e.target.name) return;
		e.preventDefault();
		console.log(e.target);

		const dropdownList = document.querySelector(
			`.dropdown-list.${e.target.name}`
		);

		const otherDropdownLists = [
			...document.querySelectorAll(".dropdown-list"),
		].filter((list) => list.className !== dropdownList.className);

		const allDropdownList = document.querySelectorAll(`.dropdown-list`);

		if (dropdownList.active) {
			dropdownList.style.setProperty("display", "none");
			dropdownList.active = false;
		} else {
			dropdownList.active = true;
			otherDropdownLists.forEach((odl) => (odl.active = false));

			allDropdownList.forEach((list) => {
				if (list.active) {
					console.log("Display: flex");
					list.style.setProperty("display", "flex");
					list.style.setProperty("flex-direction", "column");
				} else {
					console.log("Display: none");
					list.style.setProperty("display", "none");
				}
			});
		}
	};

	showMenuButtons = () => {
		//FIX: changing the navBtns to a dropdown list should also change the mouseOver events to onClick event
		//SOLUTION: Work out which element is triggering the event so make e.target the same OR use element through quertselector
		const navContent = document.querySelector(".nav-content");
		const navBtns = document.querySelectorAll("li.nav-item");
		const dropdownLists = document.querySelectorAll(".dropdown-list");
		const shortMenuCoords = document
			.querySelector(".short-nav")
			.getBoundingClientRect();
		const collaspedMenuBtn = document.querySelector(".collasped-menu-btn");
		const linkBtns = document.querySelectorAll(".link.lg-display");
		linkBtns.forEach((btn) => (btn.href = ""));
		const shortNav = document.querySelector(".short-nav");

		console.log({
			collaspedMenuBtn,
			navBtns,
			navContent,
			linkBtns,
			dropdownLists,
		});

		if (this.state.menuToggle) {
			if (this.state.isLandingPage) {
				shortNav.style.setProperty("justify-content", "flex-end");
				navContent.style.setProperty("display", "flex");
				// navContent.style.setProperty("", "flex");
				navContent.style.setProperty("flex-direction", "column");
				navContent.style.setProperty("position", "absolute");
				navContent.style.setProperty("transform", "translate(0, 0%)");
				navContent.style.setProperty("width", "200px");
				navContent.style.setProperty("top", "60px");

				navContent.style.setProperty("opacity", 1);
			} else {
				collaspedMenuBtn.style.setProperty("display", "flex");
				navContent.style.setProperty("display", "flex");
				navContent.style.setProperty("flex-direction", "column");
				navContent.style.setProperty("position", "absolute");
				navContent.style.setProperty("transform", "translate(0, 0%)");
				navContent.style.setProperty("width", "100%");
				navContent.style.setProperty("top", "60px");
				navContent.style.setProperty("opacity", 1);
				navContent.style.setProperty(
					"transition",
					"all 0.6s ease-in-out"
				);
				// navContent.style.setProperty("top", `${shortMenuCoords.bottom}px`);
			}

			dropdownLists.forEach((dropdownList) => {
				dropdownList.style.setProperty("background", "white");
				dropdownList.style.setProperty("width", "100%");
				dropdownList.style.setProperty("margin", "0px");
			});

			navBtns.forEach((navBtn) => {
				console.log("NAVBTN");
				let button = navBtn.firstChild;
				let droplist = navBtn.lastChild;
				navBtn.style.setProperty("width", "100%");
				button.style.setProperty("width", "100%");
				button.style.setProperty("padding", "10px");
				droplist.style.setProperty("display", "none");
				navBtn.removeEventListener("mouseenter", this.handleMouseEnter);
				navBtn.removeEventListener("mouseleave", this.handleMouseLeave);

				navBtn.addEventListener("click", this.handleMouseClick);
				console.log({ button, droplist });
			});
			this.setState({ menuToggle: false });
		} else {
			collaspedMenuBtn.style.setProperty("display", "flex");
			navContent.style.setProperty("position", "absolute");
			navContent.style.setProperty("transform", "translate(0, -300%)");
			navContent.style.setProperty("opacity", 0);

			// navContent.style.setProperty("flex-direction", "row");
			// navContent.style.setProperty("position", "relative");

			// navContent.style.setProperty("transform", "translate(0, 0%)");

			dropdownLists.forEach((dropdownList) => {
				dropdownList.style.setProperty("background", "");
				dropdownList.style.setProperty("width", "125px");
				dropdownList.style.setProperty("margin", "10px");
			});

			this.setState({ menuToggle: true });
		}
	};

	toggleScrollTopBtn = (e) => {
		console.dir(window.scrollY);
		const scrollTopBtn = document.querySelector("div.scroll-top-btn");
		if (window.scrollY > window.innerHeight * 0.66) {
			scrollTopBtn.style.setProperty("opacity", 0.6);
			scrollTopBtn.style.setProperty("visibility", "visible");
			scrollTopBtn.style.setProperty(
				"top",
				`${window.innerHeight - 110}px`
			);
			scrollTopBtn.style.setProperty("right", "20px");
		} else {
			scrollTopBtn.style.setProperty("opacity", 0);
			scrollTopBtn.style.setProperty("visibility", "hidden");
		}
	};

	// scrollToTop = () => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		left: 0,
	// 		behavior: "smooth",
	// 	});
	// };

	render() {
		const { menuToggle } = this.state;
		return (
			<nav className="nav">
				{console.log({ menuToggle })}

				{/* {console.log("NAV Props", courseData, projectData, uxData)} */}
				<div className="dropdownBackground">
					<div className="arrow"></div>
				</div>
				<div className="short-nav">
					<div className="logo-container">
						<Link to="/">
							<p className="logo-signature">Gideon Miles Oluku</p>
						</Link>
					</div>
					<div
						className="collasped-menu-btn"
						onClick={this.showMenuButtons}
					>
						{this.state.menuToggle ? (
							<img src={menu} />
						) : (
							<img src={closeMenu} />
						)}
					</div>
					<ul className="nav-content">
						<Link className="link lg-display" to="/projects">
							<li className="nav-item project">
								<a className="button" name="project">
									PROJECTS
								</a>
								<ul className="dropdown-list project">
									{!this.state.menuToggle ? (
										<li className="short-nav-all-items dropdown-item">
											<Link to={`/projects`}>
												All Projects
											</Link>
										</li>
									) : null}

									{
										/*Loop through all projects and render a list of these items as <li>*/
										projectData.map((project) => {
											// console.log(project);
											return (
												<li className="dropdown-item">
													<Link
														to={`/projects/${project.id}`}
													>
														{project.name}
													</Link>
												</li>
											);
										})
									}
								</ul>
							</li>
						</Link>
						{/* <Link className="link lg-display" to="/uxdesigns">
							<li className="nav-item ux">
								<a className="button" name="ux">
									UX/UI DESIGNS
								</a>
								<ul className="dropdown-list ux">
									{!this.state.menuToggle ? (
										<li className="short-nav-all-items dropdown-item">
											<Link to={`/uxdesigns`}>
												All UX designs
											</Link>
										</li>
									) : null}
									{
										uxData.map((ux) => {
											return (
												<li className="dropdown-item">
													<Link
														to={`/uxdesigns/${ux.id}`}
													>
														{ux.name}
													</Link>
												</li>
											);
										})
									}
								</ul>
							</li>
						</Link> */}
						<Link className="link lg-display" to="/courses">
							<li className="nav-item courses">
								<a className="button" name="courses">
									COURSES
								</a>
								<ul className="dropdown-list courses">
									{!this.state.menuToggle ? (
										<li className="short-nav-all-items dropdown-item">
											<Link to={`/courses`}>
												All Courses
											</Link>
										</li>
									) : null}
									{
										/*Loop through all projects and render a list of these items as <li>*/
										courseData.map((course) => {
											// console.log(course);
											return (
												<li className="dropdown-item">
													<Link
														to={`/courses/${course.id}`}
													>
														{course.name}
													</Link>
												</li>
											);
										})
									}
								</ul>
							</li>
						</Link>
						<Link className="link lg-display" to="/aboutme">
							<li className="nav-item about-me">
								<a className="button" name="about-me">
									ABOUT ME
								</a>
								<ul className="dropdown-list about-me">
									{socialMediaData.map((media) => {
										// console.log(course);
										return (
											<li className="dropdown-item">
												<a>{media.medium}</a>
											</li>
										);
									})}
								</ul>
							</li>
						</Link>
					</ul>
					<div
						className="scroll-top-btn"
						onClick={() =>
							window.scrollTo({
								top: 0,
								left: 0,
								behavior: "smooth",
							})
						}
					>
						<img src={scrollTopBtnIcon} />
					</div>
				</div>
			</nav>
		);
	}
}

export default NavBar;
