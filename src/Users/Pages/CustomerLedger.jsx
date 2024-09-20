import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function CustomerLedger() {
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<h3>Customer_Ledger</h3>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default CustomerLedger;
