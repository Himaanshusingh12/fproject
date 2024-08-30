import React from "react";

function Footer() {
	return (
		<>
			<footer className="footer mt-5py-5 bg-dark text-white">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<h5>About Us</h5>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.</p>
						</div>
						<div className="col-md-4 text-center">
							<h5>Company Name</h5>
							<p>Example Inc.</p>
							<p>&copy; 2023 Example Inc. All rights reserved.</p>
						</div>
						<div className="col-md-4">
							<h5>Contact Us</h5>
							<ul className="list-unstyled">
								<li>
									<i className="bi bi-envelope" />
									<a href="mailto:info@example.com">info@example.com</a>
								</li>
								<li>
									<i className="bi bi-phone" />
									<a href="tel:+1234567890">+123 456 7890</a>
								</li>
								<li>
									<i className="bi bi-map-marker" />
									<a href="#">123 Main St, Anytown, USA</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}

export default Footer;
