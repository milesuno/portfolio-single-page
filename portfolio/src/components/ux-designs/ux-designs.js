import React, { Component } from "react";
import Helmet from "react-helmet";
import ThumbNail from "../thumbnail/thumbnail";
import LgThumbNail from "../lg-thumbnail/lg-thumbnail";
import NavBar from "../navbar/nav-bar";

import "../../style-sheets/portfolio.css";

import data from "../../data/ux-data";
import FooterNav from "../footer-nav/footer-nav";

class UXDesigns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//State holds all UX the data for the <ThumbNail /> component. This is passed as a Prop.
			selected: 0,
			dataFromThumbnail: "",
			ux: data,
		};
	}

	getData = (data) => {
		//Gets data on specified Thumbnail and sends data to be rendered as Lg-Thumbnail
		this.setState({ selected: 1, dataFromThumbnail: data });
	};

	handleCloseLgThumbnail = (update) => {
		console.log("from lg-thumbnail", update);
		this.setState({ selected: update });
	};
	// FIX: <lg-thumbnail /> element rendering issue
	render() {
		const { ux, selected, dataFromThumbnail } = this.state;
		return (
			<>
				<Helmet>
					<title>Portfolio - UX Designs</title>
					<meta
						name="description"
						content="UX designers produced for projects"
					/>
				</Helmet>
				<div className="page-wrapper">
					<div className="page-width">
						{selected ? (
							<>
								{/* This is used to render single page items on Pop up or nav dropdown selections*/}
								<header>
									<NavBar />
								</header>
								<main className={"main-wrapper"}>
									<h1>UX Designs</h1>
									<h3>2019</h3>
									<LgThumbNail
										dataFromThumbnail={dataFromThumbnail}
										closeLgThumbnail={
											this.handleCloseLgThumbnail
										}
									/>
									<section
										className={"elements-wrapper"}
									></section>
									<section className={"elements-wrapper"}>
										{ux.map((ux) => (
											//data is exported before reaching ThumbNail as ThumbNail will accept data from multiple sources - therefore must be generic.
											<ThumbNail
												key={ux.key}
												id={ux.id}
												type={ux.type}
												img={ux.img}
												name={ux.name}
												desc={ux.desc}
												role={ux.role}
												tech={ux.tech}
												challenge={ux.challenge}
												solution={ux.solution}
												source={ux.source}
												getData={this.getData}
											/>
										))}
									</section>
								</main>
								<FooterNav isFooter={true} />
							</>
						) : (
							<>
								{/* This is used to render large pop modal items on click*/}

								<header>
									<NavBar />
								</header>
								<main className={"main-wrapper"}>
									<h1>UX Designs</h1>
									<h3>2019</h3>
									<section className={"elements-wrapper"}>
										{ux.map((ux) => (
											//data is exported before reaching ThumbNail as ThumbNail will accept data from multiple sources - therefore must be generic.
											<ThumbNail
												key={ux.key}
												id={ux.id}
												type={ux.type}
												img={ux.img}
												name={ux.name}
												desc={ux.desc}
												role={ux.role}
												tech={ux.tech}
												challenge={ux.challenge}
												solution={ux.solution}
												source={ux.source}
												getData={this.getData}
											/>
										))}
									</section>
								</main>
								<FooterNav isFooter={true} />
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default UXDesigns;
