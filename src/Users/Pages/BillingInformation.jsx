import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function BillingInformation() {
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<h5>BillingInformation</h5>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default BillingInformation;
