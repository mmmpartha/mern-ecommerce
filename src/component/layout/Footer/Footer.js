import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div class="footercontainer pb-20 wow fadeIn animated">
        <div class="footerrow">
          <div class="col-lg-12">
            <p class="text-lg-end text-start font-sm text-muted mb-0">
              &copy; 2023 Designed by <a href="http://digitan.org" target="_blank"> digitan.org</a>.All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
