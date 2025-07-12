import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useUser } from "../../util/UserContext";
import { Dropdown } from "react-bootstrap";
import axios from "axios";

// ---------------- UserProfileDropdown ----------------

const UserProfileDropdown = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    try {
      await axios.get("/auth/logout");
      window.location.href = "http://localhost:5173/login";
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        console.error(error.response.data.message);
      }
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        onClick(e);
      }}
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: "10px",
          backgroundColor: "#ccc",
        }}
      >
        <img
          src={user?.picture}
          alt="User Avatar"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {children}
      &#x25bc;
    </div>
  ));

  const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value] = useState("");
    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  });

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item onClick={() => navigate(`/profile/${user.username}`)}>Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

// ---------------- Header ----------------

const Header = () => {
  const [navUser, setNavUser] = useState(null);
  const { user } = useUser();
  const [discover, setDiscover] = useState(false);

  useEffect(() => {
    setNavUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [user]);

  useEffect(() => {
    const handleUrlChange = () => {
      const temp = window.location.href.split("/");
      const url = temp.pop();
      if (url.startsWith("discover")) {
        setDiscover(true);
      } else {
        setDiscover(false);
      }
    };
    window.addEventListener("popstate", handleUrlChange);
    handleUrlChange(); // Initial
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  // Scroll-based background change
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector(".modern-navbar");
      if (nav) {
        nav.style.backgroundColor =
          window.scrollY > 30 ? "rgba(255, 255, 255, 0.9)" : "transparent";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      key="md"
      expand="md"
      className="modern-navbar"
      style={{
        backgroundColor: "transparent",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "none",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        transition: "background-color 0.3s ease-in-out",
      }}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{
            fontFamily: "Josefin Sans, sans-serif",
            color: "#ffffff",
            fontWeight: 500,
            letterSpacing: "0.8px",
          }}
        >
          SKILL SWAP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} style={{ border: "none" }} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
          style={{ backgroundColor: "rgba(255,255,255,0.95)" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id={`offcanvasNavbarLabel-expand-md`}
              style={{ fontFamily: "Josefin Sans, sans-serif", color: "#028477" }}
            >
              SKILL SWAP
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" className="modern-link">
                Home
              </Nav.Link>
              {navUser !== null ? (
                <>
                  <Nav.Link as={Link} to="/discover" className="modern-link">
                    Discover
                  </Nav.Link>
                  <Nav.Link as={Link} to="/chats" className="modern-link">
                    Your Chats
                  </Nav.Link>
                  {discover && (
                    <>
                      <Nav.Link href="#for-you" className="modern-link d-md-none" style={{ marginTop: "2rem" }}>
                        For You
                      </Nav.Link>
                      <Nav.Link href="#popular" className="modern-link d-md-none">
                        Popular
                      </Nav.Link>
                      <Nav.Link href="#web-development" className="modern-link d-md-none">
                        Web Development
                      </Nav.Link>
                      <Nav.Link href="#machine-learning" className="modern-link d-md-none">
                        Machine Learning
                      </Nav.Link>
                      <Nav.Link href="#others" className="modern-link d-md-none">
                        Others
                      </Nav.Link>
                    </>
                  )}
                  <Nav.Link as={Dropdown}>
                    <UserProfileDropdown />
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/about_us" className="modern-link">
                    About Us
                  </Nav.Link>
                  <Nav.Link as={Link} to="/#why-skill-swap" className="modern-link">
                    Why SkillSwap
                  </Nav.Link>
                  <Nav.Link as={Link} to="/login" className="modern-link">
                    Login/Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
