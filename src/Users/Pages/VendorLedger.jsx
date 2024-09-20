import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function VendorLedger() {
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div class="wrapper">
				<div className="content-wrapper">
					<p>vendor statement</p>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default VendorLedger;
