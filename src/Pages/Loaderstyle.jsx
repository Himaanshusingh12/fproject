import React from "react";

function Loaderstyle() {
	const loaderStyle = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
	};
	// here

	return (
		<>
			<div style={loaderStyle}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<p className="mt-3">Loading, please wait...</p>
			</div>
		</>
	);
}

export default Loaderstyle;
