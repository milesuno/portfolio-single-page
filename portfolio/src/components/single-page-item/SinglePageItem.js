import React, { Component } from "react";
import CarouselControls from "../carousel-controls/CarouselControls";
import ThumbNail from "../thumbnail/thumbnail";
import LgThumbNail from "../lg-thumbnail/lg-thumbnail";
import NavBar from "../navbar/nav-bar";
import "../../style-sheets/portfolio.css";
import Helmet from "react-helmet";
import courseData from "../../data/course-data.json";
import projectData from "../../data/project-data";
import uxData from "../../data/ux-data";
// import socialMediaData from "../../data/social-media-data.js";
import "../single-page-item/single-page-item.css";
import "../../style-sheets/portfolio.css";
import FooterNav from "../footer-nav/footer-nav";

//Single page need to be run on main page type and then display the data as a single page from the data sent from lg thumbnail.
//Check if all the data copied from Projects need for sinlge page to render

//FIX: This page can recieve data from the this.props.params if data is passed as a param for the route. This data can be used to filter through data provided to SPI via import to render the valid data

//FIX: Add all data into single array in state then filter state to render the unique page and data

//FIX: Carousel should function

class SinglePageItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgIndex: 0,
			selected: 0,
			autoPlay: "",
			data: [...courseData, ...projectData, ...uxData],
			dataFromThumbnail: 0,
			thumbnailSelected: false,
		};
	}

	componentDidMount() {
		//set the style of the button relating to the rendering page
	}

	getData = (data) => {
		//Gets data on specified Thumbnail and sends data to be rendered as Lg-Thumbnail
		const { imgIndex, autoPlay } = data;
		this.setState({ imgIndex, autoPlay });
	};

	render() {
		const { imgIndex, dataFromThumbnail, selected } = this.state;
		{
			console.log("SPI", this.props.match.params);
		}
		{
			console.log("SPI state", this.state.data);
		}

		return (
			<>
				{console.log("SPI props", this.props)}
				{/* //Pass this under each page type and get data to render this component elements */}
				{this.state.data
					.filter((pageData) => {
						return pageData.id === this.props.match.params.id;
					})
					.map((pageData) => {
						const {
							name,
							img,
							desc,
							role,
							tech,
							challenge,
							solution,
							source,
						} = pageData;

						return (
							<>
								<Helmet>
									<title>Portfolio - Projects</title>
									<meta
										name="description"
										content="Portfolio Projects"
									/>
									<link rel="icon" href="#" />
								</Helmet>
								<div className={"page-wrapper"}>
									<div className="page-width">
										{/* This is used to render single page items on Pop up or nav dropdown selections*/}
										<header>
											<NavBar />
										</header>
										<main className={"main-wrapper"}>
											<h1>{name}</h1>
											<div className="single-page-content-wrapper">
												<img
													src={img[imgIndex]}
													className={
														"lg-thumbnail-img"
													}
												/>
												{img.length > 1 ? (
													<CarouselControls
														getData={this.getData}
														img={img}
													/>
												) : null}
												<br />
												{desc ? (
													<p>
														<strong>
															Description:
														</strong>
														{desc}
													</p>
												) : null}
												{role ? (
													<p>
														<strong>Role:</strong>
														{role}
													</p>
												) : null}
												{tech ? (
													<p>
														<strong>
															Technologies:
														</strong>
														{tech}
													</p>
												) : null}
												{challenge ? (
													<p>
														<strong>
															Challenge:
														</strong>
														{challenge}
													</p>
												) : null}
												{solution ? (
													<p>
														<strong>
															Solution:
														</strong>
														{solution}
													</p>
												) : null}
												{source ? (
													<>
														<strong>
															Sources:
														</strong>
														{source.url ? (
															<p>
																URL:
																<a
																	href={
																		source.url
																	}
																>
																	{source.url}
																</a>
															</p>
														) : null}
														{source.github ? (
															<p>
																Github:
																<a
																	href={
																		source.github
																	}
																>
																	{
																		source.github
																	}
																</a>
															</p>
														) : null}
														{source.trello ? (
															<p>
																Trello:
																<a
																	href={
																		source.github
																	}
																>
																	{
																		source.trello
																	}
																</a>
															</p>
														) : null}
													</>
												) : null}
											</div>
										</main>
										<FooterNav isFooter={true} />
									</div>
								</div>
							</>
						);
					})}
			</>
		);
	}
}

export default SinglePageItem;
