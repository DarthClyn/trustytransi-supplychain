// pages/ContactUs.js

import React from "react";
import { NavBar, Footer } from "../Components";

const ContactUs = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <h1>Contact Us</h1>
        <p>You can contact us through the following methods:</p>
        <ul>
          <li>Email: example@example.com</li>
          <li>Phone: +1 (123) 456-7890</li>
          <li>Address: 123 Main Street, City, Country</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
