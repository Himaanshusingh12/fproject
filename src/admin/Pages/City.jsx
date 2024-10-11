import React from "react";
import Aheader from "../Components/Aheader";
import Slidnav from "../Components/Slidnav";
import Afooter from "../Components/Afooter";

function City() {
	return (
		<>
			<Aheader />
			<Slidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<h3>city</h3>
				</div>
			</div>
			<Afooter />
		</>
	);
}

export default City;
