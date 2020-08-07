import React, { Component } from "react";
import rewindBtn from "../../data/carousel-btns/rewind.png";
import leftBtn from "../../data/carousel-btns/sort-left.png";
import stopBtn from "../../data/carousel-btns/stop.png";
import rightBtn from "../../data/carousel-btns/sort-right.png";
import fastForwardBtn from "../../data/carousel-btns/fast-forward.png";

import "./CarouselControls.css";

class CarouselControls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgIndex: 0,
			selected: 0,
			autoPlay: "",
			img: this.props.img,
			isPlay: false,
		};
	}

	componentWillUnmount() {
		clearInterval(this.state.autoPlay);
	};
	
	handleIncrementCarousel = () => {
		let imgIndex = this.state.imgIndex;
		imgIndex++;
		if (imgIndex >= this.state.img.length) {
			imgIndex = 0;
			this.setState({ imgIndex });
		}

		this.setState({ imgIndex });
		this.props.getData({ imgIndex });
	};

	handleDecrementCarousel = () => {
		let imgIndex = this.state.imgIndex;
		imgIndex--;
		if (imgIndex < 0) {
			imgIndex = this.state.img.length - 1;
			this.setState({ imgIndex });
		}
		this.setState({ imgIndex });
		console.log("decrement img", imgIndex);
		this.props.getData({ imgIndex });
	};

	handleStopImageChange = () => {
		console.log("Stop Image");
		clearInterval(this.state.autoPlay);
	};

	handleAutoForward = () => {
		console.log("Auto Forward Image");
		clearInterval(this.state.autoPlay);

		let autoPlay = setInterval(() => {
			this.handleIncrementCarousel();
		}, 1500);
		this.setState({ autoPlay });
	};

	handleAutoBackward = () => {
		console.log("Auto Backward Image");
		clearInterval(this.state.autoPlay);

		let autoPlay = setInterval(() => {
			console.log("Last Pic");
			this.handleDecrementCarousel();
		}, 1500);
		this.setState({ autoPlay });
	};

	render() {
		return (
			<div className={"button-container"}>
				<button onClick={this.handleAutoBackward}>
					<img src={rewindBtn} />
				</button>
				<button onClick={this.handleDecrementCarousel}>
					<img src={leftBtn} />
				</button>
				<button onClick={this.handleStopImageChange}>
					<img src={stopBtn} />
				</button>
				<button onClick={this.handleIncrementCarousel}>
					<img src={rightBtn} />
				</button>
				<button onClick={this.handleAutoForward}>
					<img src={fastForwardBtn} />
				</button>
			</div>
		);
	}
}

export default CarouselControls;
