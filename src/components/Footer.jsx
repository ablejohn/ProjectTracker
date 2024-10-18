import React from "react";
import "../styling/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} John Ayomide ABE. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
