import React, { Component } from "react";
import SocialMediaNav from "../social-media-nav/social-media-nav";
import img from "../../data/git-profile-img.png";
import { Link } from "react-router-dom";

import "./profile-card.css";

class ProfileCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="profile-card">
				<Link to="/aboutme">
					<img className="profile-card-img" src={img} />
					<h1>Gideon Miles Oluku</h1>
				</Link>
				<SocialMediaNav />
			</div>
		);
	}
}

export default ProfileCard;
