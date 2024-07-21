// Contact.js

import React from 'react';

function Contact() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        Please feel free to contact us using the form below or by using the contact details provided.
      </p>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows="4" />
        </div>
        <button type="submit">Send</button>
      </form>
      <p>
        You can also reach us at:
        <br />
        Phone: +1 234 567 890
        <br />
        Email: contact@example.com
      </p>
    </div>
  );
}

export default Contact;
