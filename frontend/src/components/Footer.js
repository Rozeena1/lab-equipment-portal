import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#ecf0f1', color: '#7f8c8d', textAlign: 'center', padding: '10px', marginTop: 'auto' }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Nexbuild Web Development Internship. All rights reserved.</p>
    </footer>
  );
};

export default Footer;