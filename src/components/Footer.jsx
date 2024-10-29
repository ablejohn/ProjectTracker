import React from "react";
import "../styling/Footer.css";

const Footer = ({ sticky, className, author = "John Ayomide ABE" }) => {
  return (
    <footer
      className={`footer ${sticky ? "sticky" : ""} ${className || ""}`}
      role="contentinfo" // Added for accessibility
    >
      <div className="footer-content">
        <p className="copyright">
          &copy; {new Date().getFullYear()} {author}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
