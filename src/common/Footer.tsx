import React from "react";

const Footer = () => {
  return (
    <footer className="w-full">
      <p className="text-center text-font-color-dark text-sm p-4">
        © {new Date().getFullYear()} Arsa - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
