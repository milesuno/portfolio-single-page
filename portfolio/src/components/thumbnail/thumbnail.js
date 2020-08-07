import React, { Component } from "react";
import "./thumbnail.css";
import LgThumbNail from "../lg-thumbnail/lg-thumbnail";
import CarouselControls from "../carousel-controls/CarouselControls";

/*
React will apply props object with data passed to from the parent passing it props. 
In this instance ThumbNail as data passed to it from 2 different parents, 
but I do not need to specify or use [square] syntax to access the data passed  
*/
class ThumbNail extends Component {
	constructor(props) {
		super(props);
		//state is used to populate data in lg-thumbnail on thumbnail click
		this.state = {
			imgIndex: 0,
			selected: 0,
			autoPlay: "",
			id: this.props.id,
			type: this.props.type,
			name: this.props.name,
			img: this.props.img,
			desc: this.props.desc,
			role: this.props.role,
			tech: this.props.tech,
			challenge: this.props.challenge,
			solution: this.props.solution,
			source: this.props.source,
			checkScroll: "",
			isLoaded: false,
		};
	}

	componentDidMount() {
		// fetch("https://avatars2.githubusercontent.com/u/45498063?s=460&u=ccf1d781a20680c9787cdae4bdaba9a1f540b02f&v=4").then(res => res.blob()).then(img => console.log(img))
		console.log("DID: img Lag:", this.state.img);
		let checkScroll;
		const thumbnails = document.querySelectorAll(
			"div.thumbnail-page-wrapper"
		);
		this.setState({ isLoaded: true });
		checkScroll = (e) => {
			this.debounce(
				thumbnails.forEach((thumbnail) => {
					const thumbnailCoords = thumbnail.getBoundingClientRect();
					const nav = document.querySelector(".nav");
					const navCoords = nav.getBoundingClientRect();

					//the value of the whole viewport + half of the thumbnail hieght
					//This is used to calculate if this number is more of less than the top off the viewport
					let slideIn =
						window.scrollY +
						window.innerHeight /*Page Bottom*/ -
						thumbnailCoords.height / 2; /*Half of image height*/

					// px where image top starts + image height = px for image bottom
					let thumbnailBottom =
						thumbnail.offsetTop + thumbnailCoords.height;
					let thumbnailHalfway =
						thumbnail.offsetTop + thumbnailCoords.height / 2;

					//***Flag Var - return true or false. This will be used to trigger other functions

					// If slideIn px is greater than image top then return true
					const isHalfway = slideIn > thumbnail.offsetTop;

					const isPassedThumbnailHalfway =
						window.scrollY + navCoords.bottom > thumbnailHalfway;

					//if top of browser is less than image bottom return true
					const isNotscrolledPassed =
						window.scrollY < thumbnailBottom;

					// console.log({
					// 	slideIn,
					// 	thumbnailBottom,
					// 	isHalfway,
					// 	isNotscrolledPassed,
					// 	thumbnailHalfway,
					// });

					if (!isHalfway) thumbnail.style.setProperty("opacity", 0);

					if (isHalfway && isNotscrolledPassed)
						thumbnail.style.setProperty("opacity", 1);

					if (isPassedThumbnailHalfway)
						thumbnail.style.setProperty("opacity", 0);
				})
			);
		};

		this.setState({ checkScroll });
		document.addEventListener("scroll", checkScroll);
	}

	componentWillUnmount() {
		document.removeEventListener("scroll", this.state.checkScroll);
	}

	debounce = (func, wait = 20, immediate = true) => {
		var timeout;
		return function () {
			var context = this,
				args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	getData = (data) => {
		//Gets data on specified Thumbnail and sends data to be rendered as Lg-Thumbnail
		console.log("Data from Carousel", data);
		const { imgIndex } = data;
		this.setState({ imgIndex });
	};

	handleCloseLgThumbnail = (update) => {
		console.log("from lg-thumbnail", update);
		const body = document.querySelector("body");

		body.style.setProperty("overflow", "");

		this.setState({ selected: update });
	};

	thumbNailSwitch = () => {
		console.log("onClick");
		let selected = this.state.selected;

		if (selected === 0) {
			selected++;
			this.setState({ selected });
			this.props.getData(this.state);
		} else if (selected === 1) {
			selected--;
			this.setState({ selected });
			this.props.getData(this.state);
		}

		console.log("Selected", this.state.selected);
	};

	render() {
		const { name, img } = this.props;
		const { imgIndex } = this.state;
		console.log("props in thumbnail", this.props);
		console.log("state selected in thumbnail", this.state);

		return (
			<>
				<div className="thumbnail-page-wrapper fade">
					<div
						className="thumbnail-wrapper"
						onClick={this.thumbNailSwitch}
					>
						{/* {this.props.img ? ( */}
						<img src={img[imgIndex]} className={"thumbnail-img"} />
						{/* ) : <div>"NOPE"</div>} */}
						<h2 className="thumbnail-title">{name}</h2>
					</div>
					{/* {img.length > 1 ? (
							<CarouselControls
								getData={this.getData}
								img={this.props.img}
							/>
						) : null} */}
				</div>
			</>
		);
	}
}

export default ThumbNail;
