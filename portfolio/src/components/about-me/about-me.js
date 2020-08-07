import React, { Component } from "react";
import Helmet from "react-helmet";
import SocialMediaNav from "../social-media-nav/social-media-nav";
import NavBar from "../navbar/nav-bar";
import CV from "../../data/GideonMilesOluku-cv.pdf";
import img from "../../data/git-profile-img.png";

import "../../style-sheets/portfolio.css";
import "./about-me.css";
import FooterNav from "../footer-nav/footer-nav";

class AboutMe extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<Helmet>
					<title>Portfolio - About Me</title>
					<meta
						name="description"
						content="About me page, highlighting resume achievements and channels to contact me"
					/>
				</Helmet>
				<div className="page-wrapper">
					<div className="page-width">
						<header>
							<NavBar />
						</header>
						<main className="main-wrapper">
							<h1>About Me</h1>
							<div className="about-me-wrapper">
								<img className="about-me-img" src={img} />
								<a className="download" href={CV} download>
									<button>Download CV</button>
								</a>
								<div className="social-nav-btns about-me">
									<SocialMediaNav />
								</div>
								<p>
									I am a Web Developer and Business Graduate,
									with a background in agile web development,
									project management and experience in
									start-up business development.
								</p>
								<p>
									I am a highly motivated self-starter. I have
									always been passionate about bringing ideas
									into reality, demonstrated in my histroy of
									project management and business development.
									This interest led to my interest in
									technology and programming. I attended a
									bootcamp to further my knowledge on the
									subject, as well as deepen the understanding
									of the work I would delegate to teams for
									development - for commerical projects and my
									own self-funded projects. This opened my
									eyes to the vast opportunities possible
									through programming and development, and has
									been a major  driver in my interest in
									technology, as the scope of development is
									almost unlimited.
								</p>
								<p>
									I have a passion for creative production -
									Planning, Design, Prototyping. However, I
									particularly enjoy software development due
									to the fasinating underlaying Computer
									Science mechanics that drive the
									development. That only adds depth to the
									development of innovative new products and
									solutions to problems - and how they are
									actually executed under the surface.
								</p>
								<p>
									My passion for software development has led
									me to volunteer and teach at Code Your
									Future - the boot-camp I graduated from. I
									help to teach programming fundamentals on
									the weekends for disadvantaged groups - this
									is can be challenging but is very rewarding
									as students can often ask questions that you
									have to think deeply about. I feel my unique
									experience in both business studies and web
									development make me a valuabale and
									versatile developer. Who can work within
									development teams as well as lead.
								</p>
							</div>
						</main>
						<FooterNav isFooter={true} />
					</div>
				</div>
			</>
		);
	}
}

export default AboutMe;
