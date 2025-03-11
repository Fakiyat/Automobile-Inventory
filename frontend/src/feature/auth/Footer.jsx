const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer">© {currentYear} Auto Hub. All Rights Reserved</div>
  );
};

export default Footer;
