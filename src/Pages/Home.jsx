import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function Home() {
	return (
		<>
			<Header />
			<div className="container">
				{/* Hero Section */}
				<section className="hero text-center my-5">
					<div className="row">
						<div className="col-md-6">
							<h1 className="display-4">Welcome to Our Website</h1>
							<p className="lead">We offer the best services to help you succeed.</p>
							<a href="#services" className="btn btn-primary btn-lg mt-3">
								Our Services
							</a>
						</div>
						<div className="col-md-6">
							<img
								src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2021/01/240185b5bee6bf5504eaccb94236ce2b.jpeg"
								className="img-fluid rounded"
								alt="Hero"
							/>
						</div>
					</div>
				</section>

				{/* Features Section */}
				<section className="features text-center my-5">
					<h2 className="mb-5 mt-3">Why Choose Us</h2>
					<div className="row">
						<div className="col-md-4">
							<i className="bi bi-briefcase-fill fs-1"></i>
							<h3 className="my-3">Professional Service</h3>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo odio aliquam laudantium voluptatibus culpa quibusdam repellat. Ullam dignissimos ab
								cupiditate, sit, delectus et veniam eius accusantium asperiores perferendis reprehenderit eos.
							</p>
						</div>
						<div className="col-md-4">
							<i className="bi bi-people-fill fs-1"></i>
							<h3 className="my-3">Dedicated Team</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus beatae cum, assumenda velit est natus rerum ipsa qui accusantium incidunt
								veritatis corrupti officia tempora, architecto dicta at eos, perferendis ullam.
							</p>
						</div>
						<div className="col-md-4">
							<i className="bi bi-award-fill fs-1"></i>
							<h3 className="my-3">Award-Winning</h3>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia laudantium, vero, temporibus maiores mollitia illum est nisi ipsa libero ab
								facilis vitae quod debitis ad placeat optio. Repellendus, delectus quia?
							</p>
						</div>
					</div>
				</section>

				{/* Call to Action Section */}
				<section className="cta text-center my-5 p-5 bg-dark text-white rounded">
					<h2>Ready to Get Started?</h2>
					<p>Contact us today and let's start your journey to success.</p>
					<a href="#contact" className="btn btn-success btn-lg mt-3">
						Contact Us
					</a>
				</section>

				{/* Services Section */}
				<section id="services" className="services text-center my-5">
					<h2 className="mb-5">Our Services</h2>
					<div className="row">
						<div className="col-md-4 mb-4">
							<div className="card  bg-secendary border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-gear-fill fs-3 mb-3 text-primary"></i>
									<h3
										// className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service One
									</h3>
									<p className="card-text">
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas tempore vero ex id harum quam itaque maxime non, deleniti iusto
										repudiandae tempora voluptate. praesentium ratione sint officia suscipit.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-gear-fill fs-3 mb-3 text-primary"></i>
									<h3
										// className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service Two
									</h3>
									<p className="card-text">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel reiciendis sunt, architecto velit debitis fugit maxime non facere. Sequi
										ullam, magni harum corporis quidem ab praesentium ratione sint officia suscipit.
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-bag-fill fs-3 mb-3 text-primary"></i>
									<h3
										// className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service Three
									</h3>
									<p className="card-text">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eius, maxime quam harum quibusdam id doloribus facilis possimus animi.
										Nemo consequatur fuga quod debitis maiores amet dignissimos soluta quasi eos?
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-bag-fill fs-3 mb-3 text-primary"></i>
									<h3
										//  className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service Four
									</h3>
									<p className="card-text">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eius, maxime quam harum quibusdam id doloribus facilis possimus animi.
										Nemo consequatur fuga quod debitis maiores amet dignissimos soluta quasi eos?
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-bag-fill fs-3 mb-3 text-primary"></i>
									<h3
										// className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service Five
									</h3>
									<p className="card-text">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eius, maxime quam harum quibusdam id doloribus facilis possimus animi.
										Nemo consequatur fuga quod debitis maiores amet dignissimos soluta quasi eos?
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-4 mb-4">
							<div className="card border-light shadow-sm">
								<div className="card-body text-center">
									<i className="bi bi-bag-fill fs-3 mb-3 text-primary"></i>
									<h3
										// className="card-title mb-3"
										style={{ textAlign: "center" }}
									>
										Service Six
									</h3>
									<p className="card-text">
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore eius, maxime quam harum quibusdam id doloribus facilis possimus animi.
										Nemo consequatur fuga quod debitis maiores amet dignissimos soluta quasi eos?
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Reviews Section */}
				<section id="reviews" className="reviews text-center my-5">
					<h2 className="mb-5">What Our Clients Say</h2>
					<div className="row">
						<div className="col-md-4">
							<blockquote className="blockquote">
								<p>"Great service, highly recommend!"</p>
								<footer className="blockquote-footer">Client Name</footer>
							</blockquote>
						</div>
						<div className="col-md-4">
							<blockquote className="blockquote">
								<p>"Exceptional quality and customer service."</p>
								<footer className="blockquote-footer">Client Name</footer>
							</blockquote>
						</div>
						<div className="col-md-4">
							<blockquote className="blockquote">
								<p>"I'm very satisfied with the results."</p>
								<footer className="blockquote-footer">Client Name</footer>
							</blockquote>
						</div>
					</div>
				</section>
			</div>
			<Footer />
		</>
	);
}

export default Home;
