import React from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";

function AccountReport() {
	return (
		<>
			<Bheader />
			<BSlidnav />
			<div className="wrapper">
				<div className="content-wrapper">
					<h1>Account_Report</h1>
				</div>
			</div>
			<Bfooter />
		</>
	);
}

export default AccountReport;
