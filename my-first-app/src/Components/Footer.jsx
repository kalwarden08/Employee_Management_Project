// Footer.jsx
function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: #111827;
          color: white;
          text-align: center;
          padding: 25px;
        }

        .footer h2 {
          margin-bottom: 10px;
          font-size: 28px;
        }

        .footer p {
          color: #d1d5db;
          font-size: 16px;
        }

        .social-icons {
          margin-top: 15px;
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .social-icons i {
          font-size: 24px;
          cursor: pointer;
          transition: 0.3s;
        }

        .social-icons i:hover {
          color: #8b5cf6;
          transform: scale(1.2);
        }
      `}</style>

      <footer className="footer">
        <h2>SV Cart</h2>

        <p>© 2026 All Rights Reserved | Designed with React.js</p>

        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
        </div>
      </footer>
    </>
  );
}

export default Footer;