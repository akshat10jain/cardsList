import React from 'react';

const Footer = ({children}) => {
  return (
    <footer>
      <div className="footer">
        {children}
      </div>
    </footer>
  )
};

export default Footer;