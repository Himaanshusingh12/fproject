import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function Chart_Account() {
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div class="wrapper">
				<div className="content-wrapper">
					<p>This is Chart of Account page</p>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default Chart_Account;
