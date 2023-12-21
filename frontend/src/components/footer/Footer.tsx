import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p style={{ fontSize: "18px" }}>
          Build by nish
          <Link
            style={{ textDecoration: "none", color: "#64f3d5" }}
            to={"https://nisham-3d-portfolio.onrender.com/"}
          >
            @
          </Link>
          m
        </p>
      </div>
    </footer>
  );
};

export default Footer;
