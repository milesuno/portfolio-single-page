import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./lg-thumbnail.css";
import CarouselControls from "../carousel-controls/CarouselControls";
import SinglePageItem from "../single-page-item/SinglePageItem";
import closeBtn from "../../data/page-btns/icons8-close-window-48.png";

//LG THUMBNAIL to become pop up modal with the following details:
//Image carosel, controls, desc, my role.
//Stand alone page component will display all the available information on a item.
//Stand alone page will be linked too from dropdown list or via "More..." button in Lg Thumbnail

//FIX: clicking more should link to  SPI without setting the ovreflow to hidden (or unsetting the overflow)

class LgThumbNail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 0, //if "more..." is clicked then render stand alone page
			imgIndex: 0,
			autoPlay: "",
			img: this.props.img,
		};
	}

	componentDidMount() {
		const body = document.querySelector("body");
		body.style.setProperty("overflow", "hidden");

		const modal = document.querySelector(".modal");
		const modalContent = document.querySelector(".modal-content");

		const setModalAnimationAndCloseModal = () => {
			this.setModalCloseAnimation();

			//timeout allows animation to happen before re-render
			setTimeout(() => {
				this.props.closeLgThumbnail(0);
			}, 100);
		};

		modal.addEventListener("click", setModalAnimationAndCloseModal);

		modalContent.addEventListener("mouseleave", () => {
			console.log("leave");

			return modal.addEventListener("click", setModalAnimationAndCloseModal);
		});

		modalContent.addEventListener("mouseenter", () => {
			console.log("enter");
			return modal.removeEventListener("click", setModalAnimationAndCloseModal);
		});
	}

	componentWillUnmount() {
		const body = document.querySelector("body");
		body.style.setProperty("overflow", "");
	}

	getData = (data) => {
		//Gets data on specified Thumbnail and sends data to be rendered as Lg-Thumbnail
		const { imgIndex, autoPlay } = data;
		this.setState({ imgIndex, autoPlay });
	};
	//DELETE? is this code doing anything?

	descCharLimit = () => {
		console.log("desc in limit", this.state.desc);
	};

	//DELETE? is this code doing anything?
	thumbNailSwitch = () => {
		console.log("onClick");
		let selected = this.state.selected;

		if (selected === 0) {
			selected++;
			// this.props.getData(this.state); //Send data to SinglePage
			this.setState({ selected });
		} else if (selected === 1) {
			selected--;
			this.setState({ selected });
		}

		console.log("Selected", this.state.selected);
	};

	setModalCloseAnimation = () => {
		const modal = document.querySelector(".modal-content");
		modal.style.setProperty("animation", "zoom-out 0.15s 1");
	};

	render() {
		const { imgIndex, selected } = this.state;
		const {
			id,
			type,
			name,
			img,
			desc,
			role,
			tech,
			challenge,
			solution,
			source,
		} = this.props.dataFromThumbnail;
		console.log("LG thumbnail", this.state.selected, this.props);

		return (
			<>
				{!selected ? (
					<template id="myModal" className="modal">
						>
						<div className="modal-content">
							<div className={"lg-thumbnail-page-wrapper"}>
								<button
									className={"lg-thumbnail-button"}
									onClick={() => {
										this.setModalCloseAnimation();

										//timeout allows animation to happen before re-render
										setTimeout(() => {
											this.props.closeLgThumbnail(0);
										}, 100);
									}}
								>
									<img src={closeBtn} />
								</button>
								<div className="lg-thumbnail-wrapper">
									<h1 className={"lg-thumbnail-title"}>
										{name}
									</h1>
									<img
										src={img[imgIndex]}
										className={"lg-thumbnail-img"}
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
											<strong>Description:</strong>
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
											<strong>Technologies:</strong>
											{tech}
										</p>
									) : null}
									{challenge ? (
										<p>
											<strong>Challenge:</strong>
											{challenge}
										</p>
									) : null}
									{solution ? (
										<p>
											<strong>Solution:</strong>
											{solution}
										</p>
									) : null}
									{source ? (
										<>
											<strong>Sources:</strong>
											{source.url ? (
												<p>
													URL:
													<a href={source.url}>
														{source.url}
													</a>
												</p>
											) : null}
											{source.github ? (
												<p>
													Github:
													<a href={source.github}>
														{source.github}
													</a>
												</p>
											) : null}
											{source.trello ? (
												<p>
													Trello:
													<a href={source.github}>
														{source.trello}
													</a>
												</p>
											) : null}
										</>
									) : null}
								</div>
							</div>
						</div>
					</template>
				) : (
					<>
						//This is replaces the pop up which means the other
						items that aren't selected will still be displayed. This
						in effect still replaces the original thumbnail
						<SinglePageItem
							// if selected return SinglePageItem
							key={id}
							img={img}
							name={name}
							desc={desc}
							role={role}
							tech={tech}
							challenge={challenge}
							solution={solution}
							source={source}
						/>
					</>
				)}
			</>
		);
	}
}

export default LgThumbNail;
