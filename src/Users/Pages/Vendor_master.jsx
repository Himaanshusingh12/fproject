import React, { useState } from "react";
import Bheader from "../Components/Bheader";
import BSlidnav from "../Components/BSlidnav";
import Bfooter from "../Components/Bfooter";
import { toast } from "react-toastify";
import axios from "axios";

function Vendor_master() {
  const [vendorForm, setVendorForm] = useState({
    vendor_name: "",
    operating_as: "",
    address: "",
    address_send: "",
    currency: "",
    email_statement: "",
    email_payment: "",
    gst_no: "",
    credit_terms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const validation = () => {
    let result = true;
    if (vendorForm.vendor_name === "") {
      toast.error("Vendor Name field is required");
      result = false;
    } else if (vendorForm.vendor_name.length < 3) {
      toast.error("Vendor Name must be at least 3 characters long");
      result = false;
    }

    if (vendorForm.operating_as === "") {
      toast.error("Operating As field is required");
      result = false;
    }

    if (vendorForm.address === "") {
      toast.error("Address field is required");
      result = false;
    }

    if (vendorForm.address_send === "") {
      toast.error("Address-send field is required");
      result = false;
    }

    if (vendorForm.currency === "") {
      toast.error("Currency field is required");
      result = false;
    }

    if (vendorForm.email_statement === "") {
      toast.error("Email Address for send a vendor requirement is required");
      result = false;
    } else if (!vendorForm.email_statement.includes("@")) {
      toast.error(
        "Invalid Email Address for vendor requirement. Please include '@' in your email."
      );
      result = false;
    }
    if (vendorForm.email_payment === "") {
      toast.error("Email Address for Send Payment field is required");
      result = false;
    } else if (!vendorForm.email_payment.includes("@")) {
      toast.error(
        "Invalid Email Address for Send payment. Please include '@' in your email."
      );
      result = false;
    }

    if (vendorForm.gst_no === "") {
      toast.error("Customer GST No. field is required");
      result = false;
    }

    if (vendorForm.credit_terms === "") {
      toast.error("Credit Terms field is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validation()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/vendors",
        vendorForm
      );
      toast.success(response.data.message);
      setVendorForm({
        vendor_name: "",
        operating_as: "",
        address: "",
        address_send: "",
        currency: "",
        email_statement: "",
        email_payment: "",
        gst_no: "",
        credit_terms: "",
      });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast("An error occurred");
      }
    }
  };
  return (
    <>
      <Bheader />
      <BSlidnav />
      <div className="wrapper">
        <div className="content-wrapper">
          <section className="content mt-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">ADD VENDOR MASTER</h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="Customer_name">Vendor Name</label>
                              <input
                                type="text"
                                name="vendor_name"
                                id="vendor_name"
                                className="form-control"
                                placeholder="Enter Vendor Name"
                                value={vendorForm.vendor_name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="operating_as">Operating As</label>
                              <input
                                type="text"
                                name="operating_as"
                                id="operating_as"
                                className="form-control"
                                placeholder="Enter Operating As"
                                value={vendorForm.operating_as}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="address">Address</label>
                              <input
                                type="text"
                                name="address"
                                id="address"
                                className="form-control"
                                placeholder="Enter Address"
                                value={vendorForm.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="currency">
                                Address to send a cheque
                              </label>
                              <input
                                type="text"
                                name="address_send"
                                id="address_send"
                                className="form-control"
                                placeholder="Enter Address for send cheque"
                                value={vendorForm.address_send}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="currency">Currency</label>
                              <input
                                type="text"
                                name="currency"
                                id="currency"
                                className="form-control"
                                placeholder="Enter Currency"
                                value={vendorForm.currency}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email_sales">
                                Email Address to send a vendor statement
                              </label>
                              <input
                                type="email"
                                name="email_statement"
                                id="email_statement"
                                className="form-control"
                                placeholder="Enter Email Address for Vendor statement"
                                value={vendorForm.email_statement}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="email_statement">
                                Email Address to send a payment remittance
                              </label>
                              <input
                                type="email"
                                name="email_payment"
                                id="email_payment"
                                className="form-control"
                                placeholder="Enter Email Address for Payment"
                                value={vendorForm.email_payment}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="gst_no">Vendor GST No.</label>
                              <input
                                type="text"
                                name="gst_no"
                                id="gst_no"
                                className="form-control"
                                placeholder="Enter Vendor GST NO."
                                value={vendorForm.gst_no}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="credit_terms">Credit Terms</label>
                              <input
                                type="text"
                                name="credit_terms"
                                id="credit_terms"
                                className="form-control"
                                placeholder="Enter Credit Terms"
                                value={vendorForm.credit_terms}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button type="submit" className="btn btn-primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Bfooter />
    </>
  );
}

export default Vendor_master;
