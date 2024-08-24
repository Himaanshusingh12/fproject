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
              <p className="lead">
                We offer the best services to help you succeed.
              </p>
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
          <h2 className="mb-5">Why Choose Us</h2>
          <div className="row">
            <div className="col-md-4">
              <i className="bi bi-briefcase-fill fs-1"></i>
              <h3 className="my-3">Professional Service</h3>
              <p>We provide top-notch services with a professional touch.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-people-fill fs-1"></i>
              <h3 className="my-3">Dedicated Team</h3>
              <p>Our team is committed to helping you achieve your goals.</p>
            </div>
            <div className="col-md-4">
              <i className="bi bi-award-fill fs-1"></i>
              <h3 className="my-3">Award-Winning</h3>
              <p>
                We have received numerous awards for our outstanding services.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta text-center my-5">
          <h2>Ready to Get Started?</h2>
          <p>Contact us today and let's start your journey to success.</p>
          <a href="#contact" className="btn btn-success btn-lg mt-3">
            Contact Us
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;
